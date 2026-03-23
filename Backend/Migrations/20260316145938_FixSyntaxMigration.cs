using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Emlak.API.Migrations
{
    /// <inheritdoc />
    public partial class FixSyntaxMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AboutInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    YearsInBusiness = table.Column<int>(type: "INTEGER", nullable: false),
                    OfficeImages = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AboutInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Listings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    SquareMeters = table.Column<int>(type: "INTEGER", nullable: false),
                    RoomCount = table.Column<string>(type: "TEXT", nullable: false),
                    BuildingAge = table.Column<int>(type: "INTEGER", nullable: false),
                    Floor = table.Column<int>(type: "INTEGER", nullable: false),
                    ImageUrls = table.Column<string>(type: "TEXT", nullable: false),
                    MapCoordinates = table.Column<string>(type: "TEXT", nullable: false),
                    ContactInfo = table.Column<string>(type: "TEXT", nullable: false),
                    Properties = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Listings", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AboutInfos",
                columns: new[] { "Id", "Description", "OfficeImages", "YearsInBusiness" },
                values: new object[] { 1, "Modern Emlak olarak 20 yılı aşkın tecrübemizle hayalinizdeki evi bulmanıza yardımcı oluyoruz.", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 20 });

            migrationBuilder.InsertData(
                table: "Listings",
                columns: new[] { "Id", "BuildingAge", "ContactInfo", "Description", "Floor", "ImageUrls", "MapCoordinates", "Price", "Properties", "RoomCount", "SquareMeters", "Title" },
                values: new object[] { 1, 5, "Ahmet Yılmaz - 0555 123 45 67", "Şehrin merkezinde, ulaşım noktalarına yakın harika deniz manzaralı geniş daire.", 4, "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80,https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", "41.0082,28.9784", 3500000m, "Kombi,Asansör,Kapalı Otopark,Balkon", "3+1", 120, "Deniz Manzaralı Lüks Daire" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AboutInfos");

            migrationBuilder.DropTable(
                name: "Listings");
        }
    }
}
