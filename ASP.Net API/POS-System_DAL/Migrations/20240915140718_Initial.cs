using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace POS_System_DAL.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_customer",
                columns: table => new
                {
                    customer_id = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: false),
                    customer_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    customer_address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    customer_phone = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    customer_email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    allowdebt = table.Column<int>(type: "int", nullable: true),
                    customer_counter = table.Column<int>(type: "int", nullable: true),
                    company_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tbl_cust__CD65CB854BC2BCF1", x => x.customer_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_goodsgroup",
                columns: table => new
                {
                    group_id = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: false),
                    group_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    group_status = table.Column<int>(type: "int", nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true),
                    group_counter = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tbl_good__D57795A06351FF69", x => x.group_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_menu",
                columns: table => new
                {
                    menu_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    english_text = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    local_text = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    invest_text = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    linked_view = table.Column<string>(type: "varchar(45)", unicode: false, maxLength: 45, nullable: true),
                    menu_order = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_menu", x => x.menu_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_message_text",
                columns: table => new
                {
                    message_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: false),
                    english_message = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    local_message = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    invest_message = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_message_text", x => x.message_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_pos",
                columns: table => new
                {
                    pos_number = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    pos_date = table.Column<DateTime>(type: "datetime", nullable: true),
                    cashier_id = table.Column<string>(type: "varchar(1)", unicode: false, maxLength: 1, nullable: true),
                    customer_id = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: true),
                    customer_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    pos_status = table.Column<int>(type: "int", nullable: true),
                    pos_total = table.Column<double>(type: "float", nullable: true),
                    pos_discount = table.Column<double>(type: "float", nullable: true),
                    pos_topay = table.Column<double>(type: "float", nullable: true),
                    pos_customerpay = table.Column<double>(type: "float", nullable: true),
                    pos_exchange = table.Column<double>(type: "float", nullable: true),
                    pos_paymenttype = table.Column<int>(type: "int", nullable: true),
                    pos_paymentmethod = table.Column<int>(type: "int", nullable: true),
                    pos_counter = table.Column<int>(type: "int", nullable: true),
                    pos_creator = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    paymentdate = table.Column<DateTime>(type: "datetime", nullable: true),
                    payer = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    cancel_date = table.Column<DateTime>(type: "datetime", nullable: true),
                    cancel_person = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tbl_pos__60F6E28FA0CDCCE5", x => x.pos_number);
                });

            migrationBuilder.CreateTable(
                name: "tbl_propertygroup",
                columns: table => new
                {
                    property_id = table.Column<string>(type: "varchar(6)", unicode: false, maxLength: 3, nullable: false),
                    property_name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true),
                    property_counter = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tbl_prop__735BA463E3BE5D3A", x => x.property_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_receipt",
                columns: table => new
                {
                    receipt_number = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    receipt_date = table.Column<DateTime>(type: "datetime", nullable: true),
                    supplier_id = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: true),
                    supplier_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    receipt_status = table.Column<int>(type: "int", nullable: true),
                    receipt_total = table.Column<double>(type: "float", nullable: true),
                    receipt_discount = table.Column<double>(type: "float", nullable: true),
                    receipt_topay = table.Column<double>(type: "float", nullable: true),
                    supplier_topay = table.Column<double>(type: "float", nullable: true),
                    payment_type = table.Column<int>(type: "int", nullable: true),
                    payment_method = table.Column<int>(type: "int", nullable: true),
                    receipt_counter = table.Column<int>(type: "int", nullable: true),
                    receipt_creator = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    payment_date = table.Column<DateTime>(type: "datetime", nullable: true),
                    payment_person = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    cancel_date = table.Column<DateTime>(type: "datetime", nullable: true),
                    cancel_person = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    update_date = table.Column<DateTime>(type: "datetime", nullable: true),
                    update_person = table.Column<string>(type: "varchar(45)", unicode: false, maxLength: 45, nullable: true),
                    paymeny_status = table.Column<int>(type: "int", nullable: true),
                    received_date = table.Column<DateTime>(type: "datetime", nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tbl_rece__89FE4B74FBD48252", x => x.receipt_number);
                });

            migrationBuilder.CreateTable(
                name: "tbl_screen_text",
                columns: table => new
                {
                    company_id = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    store_id = table.Column<string>(type: "varchar(4)", unicode: false, maxLength: 4, nullable: false),
                    screen_name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    item_name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    english_text = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    local_text = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    invest_text = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_screen_text", x => new { x.company_id, x.store_id, x.screen_name, x.item_name });
                });

            migrationBuilder.CreateTable(
                name: "tbl_status_text",
                columns: table => new
                {
                    status_id = table.Column<int>(type: "int", nullable: false),
                    english_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    local_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    invest_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_status_text", x => x.status_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_store",
                columns: table => new
                {
                    store_id = table.Column<string>(type: "varchar(4)", unicode: false, maxLength: 4, nullable: false),
                    company_id = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    store_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    store_address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    store_status = table.Column<int>(type: "int", nullable: true),
                    store_phone = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    store_logo = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    inv_language = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: true),
                    local_language = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_store", x => x.store_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_supplier",
                columns: table => new
                {
                    supplier_id = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: false),
                    supplier_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    supllier_type = table.Column<int>(type: "int", nullable: true),
                    supllier_address = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    supllier_phone = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    supllier_email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    allow_debt = table.Column<int>(type: "int", nullable: true),
                    supplier_counter = table.Column<int>(type: "int", nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tbl_supp__6EE594E835736B89", x => x.supplier_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_user",
                columns: table => new
                {
                    login_name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    store_id = table.Column<string>(type: "varchar(4)", unicode: false, maxLength: 4, nullable: false),
                    full_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    pass_word = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true),
                    identify_string = table.Column<string>(type: "varchar(45)", unicode: false, maxLength: 45, nullable: true),
                    user_language = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: true),
                    user_type = table.Column<int>(type: "int", nullable: true),
                    user_level = table.Column<int>(type: "int", nullable: true),
                    user_status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_user", x => x.login_name);
                });

            migrationBuilder.CreateTable(
                name: "tbl_goods",
                columns: table => new
                {
                    goods_id = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: false),
                    group_id = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: true),
                    goods_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    goods_brand = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    goods_status = table.Column<int>(type: "int", nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true),
                    goods_counter = table.Column<int>(type: "int", nullable: true),
                    picture = table.Column<byte[]>(type: "varbinary(8000)", maxLength: 8000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tbl_good__40BA2239710FBC6A", x => x.goods_id);
                    table.ForeignKey(
                        name: "FK__tbl_goods__group__693CA210",
                        column: x => x.group_id,
                        principalTable: "tbl_goodsgroup",
                        principalColumn: "group_id");
                });

            migrationBuilder.CreateTable(
                name: "tbl_posdetail",
                columns: table => new
                {
                    pos_number = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    item_order = table.Column<int>(type: "int", nullable: true),
                    goods_id = table.Column<string>(type: "varchar(7)", unicode: false, maxLength: 7, nullable: true),
                    barcode = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    goods_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    item_unit = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: true),
                    property = table.Column<string>(type: "varchar(3)", unicode: false, maxLength: 3, nullable: true),
                    property_value = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: true),
                    item_quantity = table.Column<double>(type: "float", nullable: true),
                    item_price = table.Column<double>(type: "float", nullable: true),
                    sub_total = table.Column<double>(type: "float", nullable: true),
                    line_discount = table.Column<double>(type: "float", nullable: true),
                    line_total = table.Column<double>(type: "float", nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK__tbl_posde__pos_n__6E01572D",
                        column: x => x.pos_number,
                        principalTable: "tbl_pos",
                        principalColumn: "pos_number");
                });

            migrationBuilder.CreateTable(
                name: "tbl_receiptdetail",
                columns: table => new
                {
                    receipt_number = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    item_order = table.Column<int>(type: "int", nullable: true),
                    goods_id = table.Column<string>(type: "varchar(7)", unicode: false, maxLength: 7, nullable: true),
                    barcode = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    goods_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    property = table.Column<string>(type: "varchar(3)", unicode: false, maxLength: 3, nullable: true),
                    property_value = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: true),
                    item_quantity = table.Column<double>(type: "float", nullable: true),
                    item_price = table.Column<double>(type: "float", nullable: true),
                    sub_total = table.Column<double>(type: "float", nullable: true),
                    line_discount = table.Column<double>(type: "float", nullable: true),
                    line_total = table.Column<double>(type: "float", nullable: true),
                    item_unit = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK__tbl_recei__recei__6EF57B66",
                        column: x => x.receipt_number,
                        principalTable: "tbl_receipt",
                        principalColumn: "receipt_number");
                });

            migrationBuilder.CreateTable(
                name: "tbl_goodssupplied",
                columns: table => new
                {
                    goods_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    supplier_id = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: true),
                    goods_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_goodssupplied", x => x.goods_id);
                    table.ForeignKey(
                        name: "FK__tbl_goods__suppl__6C190EBB",
                        column: x => x.supplier_id,
                        principalTable: "tbl_supplier",
                        principalColumn: "supplier_id");
                });

            migrationBuilder.CreateTable(
                name: "tbl_userright",
                columns: table => new
                {
                    right_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    login_name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    menu_id = table.Column<int>(type: "int", nullable: true),
                    assigned = table.Column<int>(type: "int", nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK__tbl_userr__login__71D1E811",
                        column: x => x.login_name,
                        principalTable: "tbl_user",
                        principalColumn: "login_name");
                    table.ForeignKey(
                        name: "FK__tbl_userr__menu___70DDC3D8",
                        column: x => x.menu_id,
                        principalTable: "tbl_menu",
                        principalColumn: "menu_id");
                });

            migrationBuilder.CreateTable(
                name: "tbl_goodsproperty",
                columns: table => new
                {
                    goods_id = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true),
                    property_id = table.Column<string>(type: "varchar(3)", unicode: false, maxLength: 3, nullable: true),
                    property_name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    english_value = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    local_value = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    invest_value = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK__tbl_goods__prope__6A30C649",
                        column: x => x.property_id,
                        principalTable: "tbl_propertygroup",
                        principalColumn: "property_id");
                    table.ForeignKey(
                        name: "FK_tbl_goodsproperty_tbl_goods",
                        column: x => x.goods_id,
                        principalTable: "tbl_goods",
                        principalColumn: "goods_id");
                });

            migrationBuilder.CreateTable(
                name: "tbl_goodsunit",
                columns: table => new
                {
                    goods_unit = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    goods_id = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true),
                    barcode = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    unit_size = table.Column<int>(type: "int", nullable: true),
                    unit_status = table.Column<int>(type: "int", nullable: true),
                    unit_stock = table.Column<int>(type: "int", nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_goodsunit", x => x.goods_unit);
                    table.ForeignKey(
                        name: "FK__tbl_goods__goods__6D0D32F4",
                        column: x => x.goods_id,
                        principalTable: "tbl_goods",
                        principalColumn: "goods_id");
                });

            migrationBuilder.CreateTable(
                name: "tbl_sellprice",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    goods_id = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true),
                    barcode = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    goods_unit = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    sell_number = table.Column<int>(type: "int", nullable: true),
                    sell_price = table.Column<int>(type: "int", nullable: true),
                    store_id = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tbl_sell__3213E83FB1CF1D26", x => x.id);
                    table.ForeignKey(
                        name: "FK__tbl_sellp__goods__6FE99F9F",
                        column: x => x.goods_id,
                        principalTable: "tbl_goods",
                        principalColumn: "goods_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_goods_group_id",
                table: "tbl_goods",
                column: "group_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_goodsproperty_goods_id",
                table: "tbl_goodsproperty",
                column: "goods_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_goodsproperty_property_id",
                table: "tbl_goodsproperty",
                column: "property_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_goodssupplied_supplier_id",
                table: "tbl_goodssupplied",
                column: "supplier_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_goodsunit_goods_id",
                table: "tbl_goodsunit",
                column: "goods_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_posdetail_pos_number",
                table: "tbl_posdetail",
                column: "pos_number");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_receiptdetail_receipt_number",
                table: "tbl_receiptdetail",
                column: "receipt_number");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_sellprice_goods_id",
                table: "tbl_sellprice",
                column: "goods_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_userright_login_name",
                table: "tbl_userright",
                column: "login_name");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_userright_menu_id",
                table: "tbl_userright",
                column: "menu_id");
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
