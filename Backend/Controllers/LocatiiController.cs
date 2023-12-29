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
                var newLocatie = await _context.Tbllocatiis.AddAsync(locatie);
                await _context.SaveChangesAsync();
                return Ok(newLocatie.Entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Locatii from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
