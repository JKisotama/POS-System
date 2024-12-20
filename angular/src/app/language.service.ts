import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './API/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr']);
  }

  initializeLanguage() {
    const userLang = sessionStorage.getItem('userLanguage') || 'en';
    this.translate.use(userLang.match(/en|fr/) ? userLang : 'en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    sessionStorage.setItem('userLanguage', lang); // Update session storage when language is changed
  }
}