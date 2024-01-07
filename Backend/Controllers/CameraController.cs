using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CamereController : ControllerBase
    {
        private readonly ILogger<CamereController> _logger;
        private readonly LitoralContext _context;

        public CamereController(ILogger<CamereController> logger, LitoralContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tblcamere>>> Get()
        {
            try
            {
                var camere = await _context.Tblcameres.ToListAsync();
                return Ok(camere);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Camere from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("hotel/{id}")]
        public async Task<ActionResult<List<Tblcamere>>> Get(ulong id)
        {
            try
            {
                var camere = await _context.Tblcameres
                    .Where(camera => camera.IdHotel == id)
                    .ToListAsync();
                return Ok(camere);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Camere from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tblcamere>> GetById(ulong id)
        {
            try
            {
                var camera = await _context.Tblcameres.FirstOrDefaultAsync(x => x.IdCamera == id);
                return Ok(camera);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Camere from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Tblcamere>> PostCamera(Tblcamere camera)
        {
            try
            {
                var existingCamera = await _context.Tblcameres.FindAsync(camera.IdCamera);

                if (existingCamera == null)
                {
                    var newCamera = await _context.Tblcameres.AddAsync(camera);
                    await _context.SaveChangesAsync();
                    return Ok(newCamera.Entity);
                }
                else
                {
                    _context.Entry(existingCamera).State = EntityState.Detached;
                    _context.Tblcameres.Update(camera);
                    await _context.SaveChangesAsync();

                    return Ok(camera);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Camere from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCamera(int id)
        {
            try
            {
                ushort uid = ushort.Parse(id.ToString());
                var camera = await _context.Tblcameres.FindAsync(uid);

                if (camera == null)
                {
                    return NotFound();
                }

                _context.Tblcameres.Remove(camera);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting Camera from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
