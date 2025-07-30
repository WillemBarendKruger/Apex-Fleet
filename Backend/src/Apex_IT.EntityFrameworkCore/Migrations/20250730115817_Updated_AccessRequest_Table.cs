using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Apex_IT.Migrations
{
    /// <inheritdoc />
    public partial class Updated_AccessRequest_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessRequests_AbpUsers_EmployeeId",
                table: "AccessRequests");

            migrationBuilder.DropIndex(
                name: "IX_AccessRequests_EmployeeId",
                table: "AccessRequests");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "AccessRequests");

            migrationBuilder.CreateIndex(
                name: "IX_AccessRequests_RequestingEmployeeId",
                table: "AccessRequests",
                column: "RequestingEmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccessRequests_AbpUsers_RequestingEmployeeId",
                table: "AccessRequests",
                column: "RequestingEmployeeId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessRequests_AbpUsers_RequestingEmployeeId",
                table: "AccessRequests");

            migrationBuilder.DropIndex(
                name: "IX_AccessRequests_RequestingEmployeeId",
                table: "AccessRequests");

            migrationBuilder.AddColumn<long>(
                name: "EmployeeId",
                table: "AccessRequests",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AccessRequests_EmployeeId",
                table: "AccessRequests",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccessRequests_AbpUsers_EmployeeId",
                table: "AccessRequests",
                column: "EmployeeId",
                principalTable: "AbpUsers",
                principalColumn: "Id");
        }
    }
}
