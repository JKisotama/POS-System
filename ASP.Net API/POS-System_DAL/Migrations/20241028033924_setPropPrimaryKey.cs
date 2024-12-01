using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace POS_System_DAL.Migrations
{
    /// <inheritdoc />
    public partial class setPropPrimaryKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        { 
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_customer");

            migrationBuilder.DropTable(
                name: "tbl_goodsproperty");

            migrationBuilder.DropTable(
                name: "tbl_goodssupplied");

            migrationBuilder.DropTable(
                name: "tbl_goodsunit");

            migrationBuilder.DropTable(
                name: "tbl_message_text");

            migrationBuilder.DropTable(
                name: "tbl_posdetail");

            migrationBuilder.DropTable(
                name: "tbl_receiptdetail");

            migrationBuilder.DropTable(
                name: "tbl_screen_text");

            migrationBuilder.DropTable(
                name: "tbl_sellprice");

            migrationBuilder.DropTable(
                name: "tbl_status_text");

            migrationBuilder.DropTable(
                name: "tbl_store");

            migrationBuilder.DropTable(
                name: "tbl_userright");

            migrationBuilder.DropTable(
                name: "tbl_propertygroup");

            migrationBuilder.DropTable(
                name: "tbl_supplier");

            migrationBuilder.DropTable(
                name: "tbl_pos");

            migrationBuilder.DropTable(
                name: "tbl_receipt");

            migrationBuilder.DropTable(
                name: "tbl_goods");

            migrationBuilder.DropTable(
                name: "tbl_user");

            migrationBuilder.DropTable(
                name: "tbl_menu");

            migrationBuilder.DropTable(
                name: "tbl_goodsgroup");
        }
    }
}
