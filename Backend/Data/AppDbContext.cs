using Emlak.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Emlak.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Listing> Listings { get; set; }
        public DbSet<AboutInfo> AboutInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Seed AboutInfo
            modelBuilder.Entity<AboutInfo>().HasData(new AboutInfo
            {
                Id = 1,
                Description = "Modern Emlak olarak 20 yılı aşkın tecrübemizle hayalinizdeki evi bulmanıza yardımcı oluyoruz.",
                YearsInBusiness = 20,
                OfficeImages = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            });
            
            // Seed a sample Listing
            modelBuilder.Entity<Listing>().HasData(new Listing
            {
                Id = 1,
                Title = "Deniz Manzaralı Lüks Daire",
                Description = "Şehrin merkezinde, ulaşım noktalarına yakın harika deniz manzaralı geniş daire.",
                Price = 3500000,
                SquareMeters = 120,
                RoomCount = "3+1",
                BuildingAge = 5,
                Floor = 4,
                ImageUrls = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80,https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                MapCoordinates = "41.0082,28.9784",
                ContactInfo = "Ahmet Yılmaz - 0555 123 45 67",
                Properties = "Kombi,Asansör,Kapalı Otopark,Balkon"
            });
        }
    }
}
