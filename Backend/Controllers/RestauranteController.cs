using Backend.HelperModels;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestauranteController : ControllerBase
    {
        private readonly ILogger<RestauranteController> _logger;
        private readonly LitoralContext _context;

        public RestauranteController(ILogger<RestauranteController> logger, LitoralContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tblrestaurante>>> Get()
        {
            try
            {
                var restaurante = await _context.Tblrestaurantes.ToListAsync();
                return Ok(restaurante);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Restaurante from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tblrestaurante>> GetById(ulong id)
        {
            try
            {
                var restaurant = await _context.Tblrestaurantes.FirstOrDefaultAsync(x => x.IdRestaurant == id);
                return Ok(restaurant);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Restaurante from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Tblrestaurante>> PostRestaurante(Tblrestaurante restaurante)
        {
            try
            {
                var existingRestaurante = await _context.Tblrestaurantes.FindAsync(restaurante.IdRestaurant);

                if (existingRestaurante == null)
                {
                    var newRestaurante = await _context.Tblrestaurantes.AddAsync(restaurante);
                    await _context.SaveChangesAsync();
                    return Ok(newRestaurante.Entity);
                }
                else
                {
                    _context.Entry(existingRestaurante).State = EntityState.Detached;
                    _context.Tblrestaurantes.Update(restaurante);
                    await _context.SaveChangesAsync();

                    return Ok(restaurante);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Restaurante from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("saveImage")]
        public IActionResult SaveImage([FromBody] SaveImageRequest request)
        {
            // Validate and process the request
            // Save the image data to the specified folder

            var locationName = request.LocationName;
            var hotelName = request.HotelName;
            var roomName = request.RoomName;

            // Constructing the custom path
            var customPath = Path.Combine("wwwroot", "images", locationName, hotelName, roomName);

            // Ensure the directory exists
            try
            {
                Directory.CreateDirectory(customPath);
            }
            catch( Exception ex)
            {
                var message = ex.Message;
            }

            // Save the image data to a file (assuming request.ImageData is the base64-encoded image data)
            var fileName = Path.Combine(customPath, "image.jpg");
            System.IO.File.WriteAllBytes(fileName, Convert.FromBase64String(request.ImageData));

            return Ok(new { CustomPath = customPath });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRestaurante(int id)
        {
            try
            {
                ushort uid = ushort.Parse(id.ToString());
                var restaurante = await _context.Tblrestaurantes.FindAsync(uid);

                if (restaurante == null)
                {
                    return NotFound();
                }

                _context.Tblrestaurantes.Remove(restaurante);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting Restaurante from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
