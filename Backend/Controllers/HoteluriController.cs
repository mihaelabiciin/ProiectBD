using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HoteluriController : ControllerBase
    {
        private readonly ILogger<HoteluriController> _logger;
        private readonly LitoralContext _context;

        public HoteluriController(ILogger<HoteluriController> logger, LitoralContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tblhoteluri>>> Get()
        {
            try
            {
                var hoteluri = await _context.Tblhoteluris.ToListAsync();
                return Ok(hoteluri);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Hoteluri from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tblhoteluri>> GetById(ulong id)
        {
            try
            {
                var hotel = await _context.Tblhoteluris.FirstOrDefaultAsync(x => x.IdHotel == id);
                return Ok(hotel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Hoteluri from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Tblhoteluri>> PostHotel(Tblhoteluri hotel)
        {
            try
            {
                var existingHotel = await _context.Tblhoteluris.FindAsync(hotel.IdHotel);

                if (existingHotel == null)
                {
                    var newHotel = await _context.Tblhoteluris.AddAsync(hotel);
                    await _context.SaveChangesAsync();
                    return Ok(newHotel.Entity);
                }
                else
                {
                    _context.Entry(existingHotel).State = EntityState.Detached;
                    _context.Tblhoteluris.Update(hotel);
                    await _context.SaveChangesAsync();

                    return Ok(hotel);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Hoteluri from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHotel(int id)
        {
            try
            {
                ushort uid = ushort.Parse(id.ToString());
                var hotel = await _context.Tblhoteluris.FindAsync(uid);

                if (hotel == null)
                {
                    return NotFound();
                }

                _context.Tblhoteluris.Remove(hotel);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting Hotel from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
