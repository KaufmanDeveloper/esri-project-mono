using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MyApp.Namespace
{
    public class EsriNearPointResponseDto
    {
        /// <summary>
        /// A collection of places returned by the search.
        /// </summary>
        [JsonPropertyName("results")]
        public List<NearPointResult> Results { get; set; } = new();

        /// <summary>
        /// Provides pagination links for accessing more results, if applicable.
        /// </summary>
        [JsonPropertyName("pagination")]
        public Pagination? Pagination { get; set; }
    }

    /// <summary>
    /// Represents an individual place result from the near-point search.
    /// </summary>
    public class NearPointResult
    {
        /// <summary>
        /// The unique identifier for the place.
        /// </summary>
        [JsonPropertyName("placeId")]
        public string PlaceId { get; set; } = string.Empty;

        /// <summary>
        /// The name of the place.
        /// </summary>
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// The distance in meters from the searched center point.
        /// </summary>
        [JsonPropertyName("distance")]
        public double Distance { get; set; }

        /// <summary>
        /// The location coordinate (longitude and latitude).
        /// </summary>
        [JsonPropertyName("location")]
        public Location? Location { get; set; }

        /// <summary>
        /// The categories associated with the place.
        /// </summary>
        [JsonPropertyName("categories")]
        public List<Category> Categories { get; set; } = new();

        /// <summary>
        /// The icon for the place. Included only if the 'icon' query parameter was provided.
        /// </summary>
        [JsonPropertyName("icon")]
        public Icon? Icon { get; set; }
    }

    /// <summary>
    /// Represents the location coordinates of a place.
    /// </summary>
    public class Location
    {
        /// <summary>
        /// The x coordinate (longitude) in WGS84 decimal degrees.
        /// </summary>
        [JsonPropertyName("x")]
        public double X { get; set; }

        /// <summary>
        /// The y coordinate (latitude) in WGS84 decimal degrees.
        /// </summary>
        [JsonPropertyName("y")]
        public double Y { get; set; }
    }

    /// <summary>
    /// Represents a category associated with a place.
    /// </summary>
    public class Category
    {
        /// <summary>
        /// The unique identifier for the category.
        /// </summary>
        [JsonPropertyName("categoryId")]
        public string CategoryId { get; set; } = string.Empty;

        /// <summary>
        /// The display label for the category.
        /// </summary>
        [JsonPropertyName("label")]
        public string Label { get; set; } = string.Empty;
    }

    /// <summary>
    /// Represents the icon URL for the place or category.
    /// </summary>
    public class Icon
    {
        /// <summary>
        /// The URL linking to the requested SVG or PNG icon.
        /// </summary>
        [JsonPropertyName("url")]
        public string Url { get; set; } = string.Empty;
    }

    /// <summary>
    /// Contains data necessary to fetch subsequent pages of search results.
    /// </summary>
    public class Pagination
    {
        /// <summary>
        /// The URL to request the next page of places. Null if there are no more results.
        /// </summary>
        [JsonPropertyName("nextUrl")]
        public string? NextUrl { get; set; }
    }
}