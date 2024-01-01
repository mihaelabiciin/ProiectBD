using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitatiController : ControllerBase
    {
        private readonly ILogger<ActivitatiController> _logger;
        private readonly LitoralContext _context;

        public ActivitatiController(ILogger<ActivitatiController> logger, LitoralContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tblactivitati>>> Get()
        {
            try
            {
                var activitati = await _context.Tblactivitatis.ToListAsync();
                return Ok(activitati);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Activitati from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tblactivitati>> GetById(ulong id)
        {
            try
            {
                var activitate = await _context.Tblactivitatis.FirstOrDefaultAsync(x => x.IdActivitate == id);
                return Ok(activitate);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Activitati from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Tblactivitati>> PostActivitate(Tblactivitati activitate)
        {
            try
            {
                var existingActivitate = await _context.Tblactivitatis.FindAsync(activitate.IdActivitate);

                if (existingActivitate == null)
                {
                    var newActivitate = await _context.Tblactivitatis.AddAsync(activitate);
                    await _context.SaveChangesAsync();
                    return Ok(newActivitate.Entity);
                }
                else
                {
                    _context.Entry(existingActivitate).State = EntityState.Detached;
                    _context.Tblactivitatis.Update(activitate);
                    await _context.SaveChangesAsync();

                    return Ok(activitate);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Activitati from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivitate(int id)
        {
            try
            {
                ushort uid = ushort.Parse(id.ToString());
                var activitate = await _context.Tblactivitatis.FindAsync(uid);

                if (activitate == null)
                {
                    return NotFound();
                }

                _context.Tblactivitatis.Remove(activitate);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting Activitate from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
