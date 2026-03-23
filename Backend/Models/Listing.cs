namespace Emlak.API.Models
{
    public class Listing
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int SquareMeters { get; set; }
        public string Location { get; set; } = string.Empty; // "Gönen / Balıkesir" etc.
        public string Category { get; set; } = "Ev"; // "Ev" or "Arsa"
        
        // Ev specific
        public string RoomCount { get; set; } = string.Empty;
        public int BuildingAge { get; set; }
        public int Floor { get; set; }
        
        // Arsa specific
        public string ListingStatus { get; set; } = string.Empty; // İlan Durumu
        public string LandType { get; set; } = string.Empty;    // Arsa Tipi
        public decimal UnitPrice { get; set; }                   // Metrekare Birim Fiyatı
        public string DeedStatus { get; set; } = string.Empty;  // Tapu Durumu
        public string Municipality { get; set; } = string.Empty; // İlgili Belediye
        public string Trade { get; set; } = string.Empty;        // Takas
        public string AuthorizedOffice { get; set; } = string.Empty; // Yetkili Ofis

        public string ImageUrls { get; set; } = string.Empty; // Comma separated URLs
        public string MapCoordinates { get; set; } = string.Empty; // "lat,lng"
        public string ContactInfo { get; set; } = string.Empty;
        public string Properties { get; set; } = string.Empty; // Comma separated features
    }
}
