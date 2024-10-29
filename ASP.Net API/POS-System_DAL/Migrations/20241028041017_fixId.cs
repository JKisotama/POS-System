using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace POS_System_DAL.Migrations
{
    /// <inheritdoc />
    public partial class fixId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GoodsId",
                table: "tbl_goodsproperty",
                newName: "goods_id");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_goodsproperty_GoodsId",
                table: "tbl_goodsproperty",
                newName: "IX_tbl_goodsproperty_goods_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "goods_id",
                table: "tbl_goodsproperty",
                newName: "GoodsId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_goodsproperty_goods_id",
                table: "tbl_goodsproperty",
                newName: "IX_tbl_goodsproperty_GoodsId");
        }
    }
}
