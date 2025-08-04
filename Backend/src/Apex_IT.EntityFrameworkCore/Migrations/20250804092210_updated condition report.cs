using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Apex_IT.Migrations
{
    /// <inheritdoc />
    public partial class updatedconditionreport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Priority",
                table: "ConditionReports",
                newName: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "ConditionReports",
                newName: "Priority");
        }
    }
}
