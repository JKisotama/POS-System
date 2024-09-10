using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Data;
using POS_System_DAL.Models;


namespace POS_Final_Year.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoSController : ControllerBase
    {
        private readonly OnlinePosContext _context;

        public PoSController(OnlinePosContext context)
        {
            _context = context;
        }

        // GET: api/PoS
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblPo>>> GetTblPos()
        {
            return await _context.TblPos.ToListAsync();
        }

        // GET: api/PoS/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblPo>> GetTblPo(string id)
        {
            var tblPo = await _context.TblPos.FindAsync(id);

            if (tblPo == null)
            {
                return NotFound();
            }

            return tblPo;
        }

        // PUT: api/PoS/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblPo(string id, TblPo tblPo)
        {
            if (id != tblPo.PosNumber)
            {
                return BadRequest();
            }

            _context.Entry(tblPo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblPoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PoS
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblPo>> PostTblPo(TblPo tblPo)
        {
            _context.TblPos.Add(tblPo);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TblPoExists(tblPo.PosNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTblPo", new { id = tblPo.PosNumber }, tblPo);
        }

        // DELETE: api/PoS/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblPo(string id)
        {
            var tblPo = await _context.TblPos.FindAsync(id);
            if (tblPo == null)
            {
                return NotFound();
            }

            _context.TblPos.Remove(tblPo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblPoExists(string id)
        {
            return _context.TblPos.Any(e => e.PosNumber == id);
        }
    }
}
