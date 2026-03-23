namespace Emlak.API.Models
{
    public class AboutInfo
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public int YearsInBusiness { get; set; }
        public string OfficeImages { get; set; } = string.Empty; // Comma separated URLs
    }
}
