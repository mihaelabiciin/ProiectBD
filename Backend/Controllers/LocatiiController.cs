using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocatiiController : ControllerBase
    {

        private readonly ILogger<LocatiiController> _logger;
        private readonly LitoralContext _context; // Inject your database context

        public LocatiiController(ILogger<LocatiiController> logger, LitoralContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tbllocatii>>> Get()
        {
            try
            {
                var locatii = await _context.Tbllocatiis.ToListAsync();
                return Ok(locatii);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Locatii from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tbllocatii>> GetById(ulong id)
        {
            try
            {
                var locatii = await _context.Tbllocatiis.FirstOrDefaultAsync(x => x.IdLocatie == id);
                return Ok(locatii);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Locatii from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Tbllocatii>> PostLocatie(Tbllocatii locatie)
        {
            try
            {
                var existingLocatie = await _context.Tbllocatiis.FindAsync(locatie.IdLocatie);

                if (existingLocatie == null)
                {
                    var newLocatie = await _context.Tbllocatiis.AddAsync(locatie);
                    await _context.SaveChangesAsync();
                    return Ok(newLocatie.Entity);
                }
                else
                {
                    _context.Entry(existingLocatie).State = EntityState.Detached; // Detach the existing entity
                    _context.Tbllocatiis.Update(locatie);
                    await _context.SaveChangesAsync();

                    return Ok(locatie);
                }

                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Locatii from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLocatie(int id)
        {
            try
            {
                ushort uid = ushort.Parse(id.ToString());
                var locatie = await _context.Tbllocatiis.FindAsync(uid);

                if (locatie == null)
                {
                    return NotFound(); // Return 404 Not Found if the entity with the specified ID is not found
                }

                _context.Tbllocatiis.Remove(locatie);
                await _context.SaveChangesAsync();

                return NoContent(); // Return 204 No Content if the entity is successfully deleted
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting Locatie from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Tbllocatii>> PutLocatie(int id, Tbllocatii locatie)
        {
            try
            {
                var existingLocatie = await _context.Tbllocatiis.FindAsync(id);

                if (existingLocatie == null)
                {
                    return NotFound(); // Return 404 Not Found if the entity with the specified ID is not found
                }

                _context.Tbllocatiis.Update(locatie);
                await _context.SaveChangesAsync();

                return Ok(locatie); // Return the updated locatie
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating Locatie in the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
