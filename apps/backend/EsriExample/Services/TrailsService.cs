using Microsoft.AspNetCore.WebUtilities;

namespace MyApp.Namespace
{
    public class TrailsService
    {
        private readonly HttpClient _httpClient;
        private readonly string _esriApiKey;

        public TrailsService(IConfiguration configuration, HttpClient httpClient)
        {
            _httpClient = httpClient;

            _esriApiKey = configuration["EsriApiKey"]
                ?? throw new InvalidOperationException("EsriApiKey is not configured.");
        }

        public async Task<GetTrailsResponseDto> GetTrailsNearCoordinate(float x, float y, int radius = 5000)
        {
            const string hikingTrailsCategoryId = "93b41845becce90cba4937decab13ecc";

            const string esriBaseAddress = "https://places-api.arcgis.com/";
            const string esriNearPointEndpointAddressSuffix = "arcgis/rest/services/places-service/v1/places/near-point";
            const string esriNearPointRequestBaseUrl = esriBaseAddress + esriNearPointEndpointAddressSuffix;

            Dictionary<string, string?> queryParams = new Dictionary<string, string?>
            {
                { "x", x.ToString() },
                { "y", y.ToString() },
                { "radius", radius.ToString() },
                { "categoryId", hikingTrailsCategoryId },
                { "searchText", "trail" },
                { "token", _esriApiKey }
            };

            string esriNearPointRequestUrl = QueryHelpers.AddQueryString(esriNearPointRequestBaseUrl, queryParams);

            EsriNearPointResponseDto? response = await _httpClient.GetFromJsonAsync<EsriNearPointResponseDto>(esriNearPointRequestUrl);

            if (response == null)
            {
                throw new InvalidOperationException("Failed to retrieve trails from Esri API.");
            }

            GetTrailsResponseDto trailsResponse = new GetTrailsResponseDto
            {
                Results = response.Results.Select(r => new GetTrailsResult
                {
                    Name = r.Name,
                    Type = r.Categories.FirstOrDefault()?.Label ?? "Unknown",
                    Location = r.Location is { } location
                        ? new Location
                        {
                            X = location.X,
                            Y = location.Y
                        }
                        : null
                }).ToList(),
                Pagination = response.Pagination
            };

            return trailsResponse;
        }
    }
}
