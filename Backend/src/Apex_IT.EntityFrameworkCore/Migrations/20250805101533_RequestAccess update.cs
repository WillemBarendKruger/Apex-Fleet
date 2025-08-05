using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Apex_IT.Migrations
{
    /// <inheritdoc />
    public partial class RequestAccessupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AccessRequests",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "AccessRequests");
        }
    }
}
