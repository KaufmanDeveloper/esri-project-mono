using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrailsController : ControllerBase
    {
        private readonly TrailsService _trailsService;

        public TrailsController(TrailsService trailsService)
        {
            _trailsService = trailsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTrailsNearCoordinate([FromQuery] float x, [FromQuery] float y, [FromQuery] int radius = 5000)
        {
            GetTrailsResponseDto response = await _trailsService.GetTrailsNearCoordinate(x, y, radius);

            return Ok(response);
        }
    }
}
