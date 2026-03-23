using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Emlak.API.Migrations
{
    /// <inheritdoc />
    public partial class AddArsaFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AuthorizedOffice",
                table: "Listings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Listings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeedStatus",
                table: "Listings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LandType",
                table: "Listings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ListingStatus",
                table: "Listings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Municipality",
                table: "Listings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Trade",
                table: "Listings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "UnitPrice",
                table: "Listings",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AuthorizedOffice", "Category", "DeedStatus", "LandType", "ListingStatus", "Municipality", "Trade", "UnitPrice" },
                values: new object[] { "", "Ev", "", "", "", "", "", 0m });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorizedOffice",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "DeedStatus",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "LandType",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "ListingStatus",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Municipality",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Trade",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "UnitPrice",
                table: "Listings");
        }
    }
}
