using System.Globalization;
using Microsoft.AspNetCore.Localization;

namespace POS_System.Middleware;

public class UserLanguageMiddleware
{
    private readonly RequestDelegate _next;

    public UserLanguageMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var userLanguage = context.Request.Headers["User-Language"].FirstOrDefault();
        if (!string.IsNullOrEmpty(userLanguage))
        {
            var culture = new CultureInfo(userLanguage);
            CultureInfo.CurrentCulture = culture;
            CultureInfo.CurrentUICulture = culture;
            var requestCulture = new RequestCulture(culture);
            context.Features.Set<IRequestCultureFeature>(new RequestCultureFeature(requestCulture, null));
        }

        await _next(context);
    }
}