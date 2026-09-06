using System.Text.Json.Serialization;

namespace MyApp.Namespace
{
    public class GetTrailsResponseDto
    {
        /// <summary>
        /// A collection of places returned by the search.
        /// </summary>
        [JsonPropertyName("results")]
        public List<GetTrailsResult> Results { get; set; } = new();

        /// <summary>
        /// Provides pagination links for accessing more results, if applicable.
        /// </summary>
        [JsonPropertyName("pagination")]
        public Pagination? Pagination { get; set; }

    }

    public class GetTrailsResult
    {
        /// <summary>
        /// The name of the place.
        /// </summary>
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// The category's label for the place with a friendlier name.
        /// </summary>
        [JsonPropertyName("type")]
        public string Type { get; set; } = string.Empty;

        /// <summary>
        /// The location coordinate (longitude and latitude).
        /// </summary>
        [JsonPropertyName("location")]
        public Location? Location { get; set; }
    }
}