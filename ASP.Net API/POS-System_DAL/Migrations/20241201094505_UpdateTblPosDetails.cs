using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace POS_System_DAL.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTblPosDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "tbl_posdetail",
                type: "int",
                nullable: false,
                defaultValue: 0);
           

            migrationBuilder.AlterColumn<string>(
                name: "store_id",
                table: "tbl_pos",
                type: "varchar(5)",
                unicode: false,
                maxLength: 5,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(5)",
                oldUnicode: false,
                oldMaxLength: 5,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "pos_date",
                table: "tbl_pos",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "pos_counter",
                table: "tbl_pos",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_posdetail",
                table: "tbl_posdetail",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_posdetail",
                table: "tbl_posdetail");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "tbl_posdetail");

            migrationBuilder.AlterColumn<string>(
                name: "store_id",
                table: "tbl_pos",
                type: "varchar(5)",
                unicode: false,
                maxLength: 5,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(5)",
                oldUnicode: false,
                oldMaxLength: 5);

            migrationBuilder.AlterColumn<DateTime>(
                name: "pos_date",
                table: "tbl_pos",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<int>(
                name: "pos_counter",
                table: "tbl_pos",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
