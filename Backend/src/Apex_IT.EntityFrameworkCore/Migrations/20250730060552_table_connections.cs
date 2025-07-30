using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Apex_IT.Migrations
{
    /// <inheritdoc />
    public partial class table_connections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EquipmentSet_Category_categoryId",
                table: "EquipmentSet");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AbpUsers");

            migrationBuilder.RenameColumn(
                name: "categoryId",
                table: "EquipmentSet",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_EquipmentSet_categoryId",
                table: "EquipmentSet",
                newName: "IX_EquipmentSet_CategoryId");

            migrationBuilder.AlterColumn<Guid>(
                name: "CategoryId",
                table: "EquipmentSet",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_EquipmentSet_Category_CategoryId",
                table: "EquipmentSet",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EquipmentSet_Category_CategoryId",
                table: "EquipmentSet");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "EquipmentSet",
                newName: "categoryId");

            migrationBuilder.RenameIndex(
                name: "IX_EquipmentSet_CategoryId",
                table: "EquipmentSet",
                newName: "IX_EquipmentSet_categoryId");

            migrationBuilder.AlterColumn<Guid>(
                name: "categoryId",
                table: "EquipmentSet",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AbpUsers",
                type: "character varying(8)",
                maxLength: 8,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_EquipmentSet_Category_categoryId",
                table: "EquipmentSet",
                column: "categoryId",
                principalTable: "Category",
                principalColumn: "Id");
        }
    }
}
