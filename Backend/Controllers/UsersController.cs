using Backend.HelperModels;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {

        private readonly ILogger<UsersController> _logger;
        private readonly LitoralContext _context; // Inject your database context

        public UsersController(ILogger<UsersController> logger, LitoralContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tbluser>>> Get()
        {
            try
            {
                var locatii = await _context.Tblusers.ToListAsync();
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
        public async Task<ActionResult<Tbluser>> Register(Tbluser user)
        {
            try
            {
                byte[] encodedPassword = Encoding.ASCII.GetBytes(user.Password);
                encodedPassword = new System.Security.Cryptography.SHA256Managed().ComputeHash(encodedPassword);
                string hash = Encoding.ASCII.GetString(encodedPassword);
                user.Password = hash;

                var newUser = await _context.Tblusers.AddAsync(user);
                await _context.SaveChangesAsync();
                return Ok(newUser.Entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching Locatii from the database.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("Login")]
        public async Task<ActionResult<Tbluser>> Login(LoginModel loginModel)
        {
            try
            {
                var user = await _context.Tblusers.FirstOrDefaultAsync(u => u.Email == loginModel.Email);

                if (user == null)
                {
                    // User not found
                    return NotFound("User not found");
                }

                // Hash the provided password and compare it with the stored hash
                byte[] encodedPassword = Encoding.ASCII.GetBytes(loginModel.Password);
                encodedPassword = new System.Security.Cryptography.SHA256Managed().ComputeHash(encodedPassword);
                string hash = Encoding.ASCII.GetString(encodedPassword);

                if (hash != user.Password)
                {
                    // Incorrect password
                    return BadRequest("Incorrect password");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while processing login request.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
