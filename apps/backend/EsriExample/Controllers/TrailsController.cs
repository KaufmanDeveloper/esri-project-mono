using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrailsController : ControllerBase
    {
        private readonly string _esriApiKey;

        public TrailsController(IConfiguration configuration)
        {
            _esriApiKey = configuration["EsriApiKey"]
                ?? throw new InvalidOperationException("EsriApiKey is not configured.");
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { configured = !string.IsNullOrWhiteSpace(_esriApiKey) });
        }
    }
}
