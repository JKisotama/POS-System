using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Models;

namespace POS_System_DAL.Data;

public partial class OnlinePosContext : DbContext
{
    public OnlinePosContext()
    {
    }

    public OnlinePosContext(DbContextOptions<OnlinePosContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblCustomer> TblCustomers { get; set; }

    public virtual DbSet<TblGood> TblGoods { get; set; }

    public virtual DbSet<TblGoodsgroup> TblGoodsgroups { get; set; }

    public virtual DbSet<TblGoodsproperty> TblGoodsproperties { get; set; }

    public virtual DbSet<TblGoodssupplied> TblGoodssupplieds { get; set; }

    public virtual DbSet<TblGoodsunit> TblGoodsunits { get; set; }

    public virtual DbSet<TblMenu> TblMenus { get; set; }

    public virtual DbSet<TblMessageText> TblMessageTexts { get; set; }

    public virtual DbSet<TblPo> TblPos { get; set; }

    public virtual DbSet<TblPosdetail> TblPosdetails { get; set; }

    public virtual DbSet<TblPropertygroup> TblPropertygroups { get; set; }

    public virtual DbSet<TblReceipt> TblReceipts { get; set; }

    public virtual DbSet<TblReceiptdetail> TblReceiptdetails { get; set; }

    public virtual DbSet<TblScreenText> TblScreenTexts { get; set; }

    public virtual DbSet<TblSellprice> TblSellprices { get; set; }

    public virtual DbSet<TblStatusText> TblStatusTexts { get; set; }

    public virtual DbSet<TblStore> TblStores { get; set; }

    public virtual DbSet<TblSupplier> TblSuppliers { get; set; }

    public virtual DbSet<TblUser> TblUsers { get; set; }

    public virtual DbSet<TblUserright> TblUserrights { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //optionsBuilder.UseSqlServer("Server=16ACH-LEGION;Initial Catalog=POS-Web;Persist Security Info=True;Encrypt=True;TrustServerCertificate=True;Trusted_Connection=true");
        //optionsBuilder.UseSqlServer("Server=THINKPAD-X395\\SQLEXPRESS;Database=POS-Web;TrustServerCertificate=True;Trusted_Connection=True;");
        optionsBuilder.UseSqlServer("Server=DESKTOP-6J6JQBK\\SQLEXPRESS;Database=POS-Web;TrustServerCertificate=True;Trusted_Connection=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblCustomer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__tbl_cust__CD65CB854BC2BCF1");

            entity.ToTable("tbl_customer");

            entity.Property(e => e.CustomerId)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("customer_id");
            entity.Property(e => e.Allowdebt).HasColumnName("allowdebt");
            entity.Property(e => e.CompanyId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("company_id");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("created_date");
            entity.Property(e => e.CustomerAddress)
                .HasMaxLength(500)
                .HasColumnName("customer_address");
            entity.Property(e => e.CustomerCounter).HasColumnName("customer_counter");
            entity.Property(e => e.CustomerEmail)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("customer_email");
            entity.Property(e => e.CustomerName)
                .HasMaxLength(200)
                .HasColumnName("customer_name");
            entity.Property(e => e.CustomerPhone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("customer_phone");
        });

        modelBuilder.Entity<TblGood>(entity =>
        {
            entity.HasKey(e => e.GoodsId).HasName("PK__tbl_good__40BA2239710FBC6A");

            entity.ToTable("tbl_goods");

            entity.Property(e => e.GoodsId)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("goods_id");
            entity.Property(e => e.GoodsBrand)
                .HasMaxLength(100)
                .HasColumnName("goods_brand");
            entity.Property(e => e.GoodsCounter).HasColumnName("goods_counter");
            entity.Property(e => e.GoodsName)
                .HasMaxLength(200)
                .HasColumnName("goods_name");
            entity.Property(e => e.GoodsStatus).HasColumnName("goods_status");
            entity.Property(e => e.GroupId)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("group_id");
            entity.Property(e => e.Picture)
                .HasMaxLength(1)
                .HasColumnName("picture");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");

            entity.HasOne(d => d.Group).WithMany(p => p.TblGoods)
                .HasForeignKey(d => d.GroupId)
                .HasConstraintName("FK__tbl_goods__group__693CA210");
        });

        modelBuilder.Entity<TblGoodsgroup>(entity =>
        {
            entity.HasKey(e => e.GroupId).HasName("PK__tbl_good__ D57795A06351FF69");

            entity.ToTable("tbl_goodsgroup");

            entity.Property(e => e.GroupId)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("group_id");
            entity.Property(e => e.GroupCounter).HasColumnName("group_counter");
            entity.Property(e => e.GroupName)
                .HasMaxLength(200)
                .HasColumnName("group_name");
            entity.Property(e => e.GroupStatus).HasColumnName("group_status");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");
        });

        modelBuilder.Entity<TblGoodsproperty>(entity =>
        {
            entity
                .HasKey(e => e.PropertyGoodsId);
            entity
                .ToTable("tbl_goodsproperty");
            entity.Property(e => e.PropertyGoodsId)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("goodsproperty_id");
            entity.Property(e => e.PropertyId)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("property_id");
            entity.Property(e => e.PropertyName)
                .HasMaxLength(20)
                .HasColumnName("property_name");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");
            entity.Property(e => e.GoodsId)
                .HasColumnName("goods_id");
            entity.Property(e => e.PropertyCounter)
                .HasColumnName("property_counter");

            entity.HasOne(d => d.Goods).WithMany()
                .HasForeignKey(d => d.GoodsId)
                .HasConstraintName("FK_tbl_goodsproperty_tbl_goods");

            entity.HasOne(d => d.Property).WithMany()
                .HasForeignKey(d => d.PropertyId)
                .HasConstraintName("FK__tbl_goods__prope__6A30C649");
        });

        modelBuilder.Entity<TblGoodssupplied>(entity =>
        {
            entity.HasKey(e => e.GoodsId);

            entity.ToTable("tbl_goodssupplied");

            entity.Property(e => e.GoodsId).HasColumnName("goods_id");
            entity.Property(e => e.GoodsName)
                .HasMaxLength(200)
                .HasColumnName("goods_name");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");
            entity.Property(e => e.SupplierId)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("supplier_id");

            entity.HasOne(d => d.Supplier).WithMany(p => p.TblGoodssupplieds)
                .HasForeignKey(d => d.SupplierId)
                .HasConstraintName("FK__tbl_goods__suppl__6C190EBB");
        });

        modelBuilder.Entity<TblGoodsunit>(entity =>
        {

            entity
                .HasKey(e => e.GoodsUnit);
            entity
                .ToTable("tbl_goodsunit");

            entity.Property(e => e.Barcode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("barcode");
            entity.Property(e => e.GoodsId)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("goods_id");
            entity.Property(e => e.GoodsUnit)
                .HasMaxLength(30)
                .HasColumnName("goods_unit");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");
            entity.Property(e => e.UnitSize).HasColumnName("unit_size");
            entity.Property(e => e.UnitStatus).HasColumnName("unit_status");
            entity.Property(e => e.UnitStock).HasColumnName("unit_stock");

            entity.HasOne(d => d.Goods).WithMany()
                .HasForeignKey(d => d.GoodsId)
                .HasConstraintName("FK__tbl_goods__goods__6D0D32F4");
        });

        modelBuilder.Entity<TblMenu>(entity =>
        {
            entity.HasKey(e => e.MenuId);

            entity.ToTable("tbl_menu");

            entity.Property(e => e.MenuId).HasColumnName("menu_id");
            entity.Property(e => e.EnglishText)
                .HasMaxLength(100)
                .HasColumnName("english_text");
            entity.Property(e => e.InvestText)
                .HasMaxLength(100)
                .HasColumnName("invest_text");
            entity.Property(e => e.LinkedView)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("linked_view");
            entity.Property(e => e.LocalText)
                .HasMaxLength(100)
                .HasColumnName("local_text");
            entity.Property(e => e.MenuOrder).HasColumnName("menu_order");
        });

        modelBuilder.Entity<TblMessageText>(entity =>
        {
            entity.HasKey(e => e.MessageId).HasName("PK_message_text");

            entity.ToTable("tbl_message_text");

            entity.Property(e => e.MessageId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("message_id");
            entity.Property(e => e.EnglishMessage)
                .HasMaxLength(150)
                .HasColumnName("english_message");
            entity.Property(e => e.InvestMessage)
                .HasMaxLength(150)
                .HasColumnName("invest_message");
            entity.Property(e => e.LocalMessage)
                .HasMaxLength(150)
                .HasColumnName("local_message");
        });

        modelBuilder.Entity<TblPo>(entity =>
        {
            entity.HasKey(e => e.PosNumber).HasName("PK__tbl_pos__60F6E28FA0CDCCE5");

            entity.ToTable("tbl_pos");

            entity.Property(e => e.PosNumber)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("pos_number");
            entity.Property(e => e.CancelDate)
                .HasColumnType("datetime")
                .HasColumnName("cancel_date");
            entity.Property(e => e.CancelPerson)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cancel_person");
            entity.Property(e => e.CashierId)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("cashier_id");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("customer_id");
            entity.Property(e => e.CustomerName)
                .HasMaxLength(200)
                .HasColumnName("customer_name");
            entity.Property(e => e.Payer)
                .HasMaxLength(50)
                .HasColumnName("payer");
            entity.Property(e => e.Paymentdate)
                .HasColumnType("datetime")
                .HasColumnName("paymentdate");
            entity.Property(e => e.PosCounter).HasColumnName("pos_counter");
            entity.Property(e => e.PosCreator)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("pos_creator");
            entity.Property(e => e.PosCustomerpay).HasColumnName("pos_customerpay");
            entity.Property(e => e.PosDate)
                .HasColumnType("datetime")
                .HasColumnName("pos_date");
            entity.Property(e => e.PosDiscount).HasColumnName("pos_discount");
            entity.Property(e => e.PosExchange).HasColumnName("pos_exchange");
            entity.Property(e => e.PosPaymentmethod).HasColumnName("pos_paymentmethod");
            entity.Property(e => e.PosPaymenttype).HasColumnName("pos_paymenttype");
            entity.Property(e => e.PosStatus).HasColumnName("pos_status");
            entity.Property(e => e.PosTopay).HasColumnName("pos_topay");
            entity.Property(e => e.PosTotal).HasColumnName("pos_total");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");
        });

        modelBuilder.Entity<TblPosdetail>(entity =>
        {
            entity
                .ToTable("tbl_posdetail");
            entity
                .HasKey(e =>e.id);

            entity.Property(e => e.Barcode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("barcode");
            entity.Property(e => e.GoodsId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("goods_id");
            entity.Property(e => e.GoodsName)
                .HasMaxLength(200)
                .HasColumnName("goods_name");
            entity.Property(e => e.ItemOrder).HasColumnName("item_order");
            entity.Property(e => e.ItemPrice).HasColumnName("item_price");
            entity.Property(e => e.ItemQuantity).HasColumnName("item_quantity");
            entity.Property(e => e.ItemUnit)
                .HasMaxLength(45)
                .HasColumnName("item_unit");
            entity.Property(e => e.LineDiscount).HasColumnName("line_discount");
            entity.Property(e => e.LineTotal).HasColumnName("line_total");
            entity.Property(e => e.PosNumber)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("pos_number");
            entity.Property(e => e.Property)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("property");
            entity.Property(e => e.PropertyValue)
                .HasMaxLength(45)
                .HasColumnName("property_value");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");
            entity.Property(e => e.SubTotal).HasColumnName("sub_total");

            entity.HasOne(d => d.PosNumberNavigation).WithMany()
                .HasForeignKey(d => d.PosNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tbl_posde__pos_n__6E01572D");
        });

        modelBuilder.Entity<TblPropertygroup>(entity =>
        {
            entity.HasKey(e => e.PropertyId).HasName("PK__tbl_prop__735BA463E3BE5D3A");

            entity.ToTable("tbl_propertygroup");

            entity.Property(e => e.PropertyId)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("property_id");
            entity.Property(e => e.PropertyCounter).HasColumnName("property_counter");
            entity.Property(e => e.PropertyName)
                .HasMaxLength(20)
                .HasColumnName("property_name");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");
        });

        modelBuilder.Entity<TblReceipt>(entity =>
        {
            entity.HasKey(e => e.ReceiptNumber).HasName("PK__tbl_rece__89FE4B74FBD48252");

            entity.ToTable("tbl_receipt");

            entity.Property(e => e.ReceiptNumber)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("receipt_number");
            entity.Property(e => e.CancelDate)
                .HasColumnType("datetime")
                .HasColumnName("cancel_date");
            entity.Property(e => e.CancelPerson)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cancel_person");
            entity.Property(e => e.PaymentDate)
                .HasColumnType("datetime")
                .HasColumnName("payment_date");
            entity.Property(e => e.PaymentMethod).HasColumnName("payment_method");
            entity.Property(e => e.PaymentPerson)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("payment_person");
            entity.Property(e => e.PaymentType).HasColumnName("payment_type");
            entity.Property(e => e.PaymenyStatus).HasColumnName("paymeny_status");
            entity.Property(e => e.ReceiptCounter).HasColumnName("receipt_counter");
            entity.Property(e => e.ReceiptCreator)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("receipt_creator");
            entity.Property(e => e.ReceiptDate)
                .HasColumnType("datetime")
                .HasColumnName("receipt_date");
            entity.Property(e => e.ReceiptDiscount).HasColumnName("receipt_discount");
            entity.Property(e => e.ReceiptStatus).HasColumnName("receipt_status");
            entity.Property(e => e.ReceiptTopay).HasColumnName("receipt_topay");
            entity.Property(e => e.ReceiptTotal).HasColumnName("receipt_total");
            entity.Property(e => e.ReceivedDate)
                .HasColumnType("datetime")
                .HasColumnName("received_date");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");
            entity.Property(e => e.SupplierId)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("supplier_id");
            entity.Property(e => e.SupplierName)
                .HasMaxLength(200)
                .HasColumnName("supplier_name");
            entity.Property(e => e.SupplierTopay).HasColumnName("supplier_topay");
            entity.Property(e => e.UpdateDate)
                .HasColumnType("datetime")
                .HasColumnName("update_date");
            entity.Property(e => e.UpdatePerson)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("update_person");
        });

        modelBuilder.Entity<TblReceiptdetail>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tbl_receiptdetail");

            entity.Property(e => e.Barcode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("barcode");
            entity.Property(e => e.GoodsId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("goods_id");
            entity.Property(e => e.GoodsName)
                .HasMaxLength(200)
                .HasColumnName("goods_name");
            entity.Property(e => e.ItemOrder).HasColumnName("item_order");
            entity.Property(e => e.ItemPrice).HasColumnName("item_price");
            entity.Property(e => e.ItemQuantity).HasColumnName("item_quantity");
            entity.Property(e => e.ItemUnit)
                .HasMaxLength(45)
                .HasColumnName("item_unit");
            entity.Property(e => e.LineDiscount).HasColumnName("line_discount");
            entity.Property(e => e.LineTotal).HasColumnName("line_total");
            entity.Property(e => e.Property)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("property");
            entity.Property(e => e.PropertyValue)
                .HasMaxLength(45)
                .HasColumnName("property_value");
            entity.Property(e => e.ReceiptNumber)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("receipt_number");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");
            entity.Property(e => e.SubTotal).HasColumnName("sub_total");

            entity.HasOne(d => d.ReceiptNumberNavigation).WithMany()
                .HasForeignKey(d => d.ReceiptNumber)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tbl_recei__recei__6EF57B66");
        });

        modelBuilder.Entity<TblScreenText>(entity =>
        {
            entity.HasKey(e => new { e.CompanyId, e.StoreId, e.ScreenName, e.ItemName }).HasName("PK_screen_text");

            entity.ToTable("tbl_screen_text");

            entity.Property(e => e.CompanyId)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("company_id");
            entity.Property(e => e.StoreId)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("store_id");
            entity.Property(e => e.ScreenName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("screen_name");
            entity.Property(e => e.ItemName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("item_name");
            entity.Property(e => e.EnglishText)
                .HasMaxLength(200)
                .HasColumnName("english_text");
            entity.Property(e => e.InvestText)
                .HasMaxLength(200)
                .HasColumnName("invest_text");
            entity.Property(e => e.LocalText)
                .HasMaxLength(200)
                .HasColumnName("local_text");
        });

        modelBuilder.Entity<TblSellprice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tbl_sell__3213E83FB1CF1D26");

            entity.ToTable("tbl_sellprice");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Barcode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("barcode");
            entity.Property(e => e.GoodsId)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("goods_id");
            entity.Property(e => e.GoodsUnit)
                .HasMaxLength(30)
                .HasColumnName("goods_unit");
            entity.Property(e => e.SellNumber).HasColumnName("sell_number");
            entity.Property(e => e.SellPrice).HasColumnName("sell_price");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");

            entity.HasOne(d => d.Goods).WithMany(p => p.TblSellprices)
                .HasForeignKey(d => d.GoodsId)
                .HasConstraintName("FK__tbl_sellp__goods__6FE99F9F");
        });

        modelBuilder.Entity<TblStatusText>(entity =>
        {
            entity.HasKey(e => e.StatusId).HasName("PK_status_text");

            entity.ToTable("tbl_status_text");

            entity.Property(e => e.StatusId)
                .ValueGeneratedNever()
                .HasColumnName("status_id");
            entity.Property(e => e.EnglishName)
                .HasMaxLength(100)
                .HasColumnName("english_name");
            entity.Property(e => e.InvestName)
                .HasMaxLength(100)
                .HasColumnName("invest_name");
            entity.Property(e => e.LocalName)
                .HasMaxLength(100)
                .HasColumnName("local_name");
        });

        modelBuilder.Entity<TblStore>(entity =>
        {
            entity.HasKey(e => e.StoreId);

            entity.ToTable("tbl_store");

            entity.Property(e => e.StoreId)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("store_id");
            entity.Property(e => e.CompanyId)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("company_id");
            entity.Property(e => e.InvLanguage)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("inv_language");
            entity.Property(e => e.LocalLanguage)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("local_language");
            entity.Property(e => e.StoreAddress)
                .HasMaxLength(200)
                .HasColumnName("store_address");
            entity.Property(e => e.StoreLogo)
                .HasMaxLength(200)
                .HasColumnName("store_logo");
            entity.Property(e => e.StoreName)
                .HasMaxLength(100)
                .HasColumnName("store_name");
            entity.Property(e => e.StorePhone)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("store_phone");
            entity.Property(e => e.StoreStatus).HasColumnName("store_status");
        });

        modelBuilder.Entity<TblSupplier>(entity =>
        {
            entity.HasKey(e => e.SupplierId).HasName("PK__tbl_supp__6EE594E835736B89");

            entity.ToTable("tbl_supplier");

            entity.Property(e => e.SupplierId)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("supplier_id");
            entity.Property(e => e.AllowDebt).HasColumnName("allow_debt");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("created_date");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");
            entity.Property(e => e.SupplierAddress)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("supplier_address");
            entity.Property(e => e.SupplierEmail)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("supplier_email");
            entity.Property(e => e.SupplierPhone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("supplier_phone");
            entity.Property(e => e.SupplierType).HasColumnName("supplier_type");
            entity.Property(e => e.SupplierCounter).HasColumnName("supplier_counter");
            entity.Property(e => e.SupplierName)
                .HasMaxLength(200)
                .HasColumnName("supplier_name");
            entity.Property(e => e.SupplierType)
                .HasColumnName("supplier_type");
        });

        modelBuilder.Entity<TblUser>(entity =>
        {
            entity.HasKey(e => e.LoginName);

            entity.ToTable("tbl_user");

            entity.Property(e => e.LoginName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("login_name");
            entity.Property(e => e.FullName)
                .HasMaxLength(200)
                .HasColumnName("full_name");
            entity.Property(e => e.IdentifyString)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("identify_string");
            entity.Property(e => e.PassWord)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("pass_word");
            entity.Property(e => e.StoreId)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("store_id");
            entity.Property(e => e.UserLanguage)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("user_language");
            entity.Property(e => e.UserLevel).HasColumnName("user_level");
            entity.Property(e => e.UserStatus).HasColumnName("user_status");
            entity.Property(e => e.UserType).HasColumnName("user_type");
        });

        modelBuilder.Entity<TblUserright>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tbl_userright");

            entity.Property(e => e.Assigned).HasColumnName("assigned");
            entity.Property(e => e.LoginName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("login_name");
            entity.Property(e => e.MenuId).HasColumnName("menu_id");
            entity.Property(e => e.RightId)
                .ValueGeneratedOnAdd()
                .HasColumnName("right_id");
            entity.Property(e => e.StoreId)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("store_id");

            entity.HasOne(d => d.LoginNameNavigation).WithMany()
                .HasForeignKey(d => d.LoginName)
                .HasConstraintName("FK__tbl_userr__login__71D1E811");

            entity.HasOne(d => d.Menu).WithMany()
                .HasForeignKey(d => d.MenuId)
                .HasConstraintName("FK__tbl_userr__menu___70DDC3D8");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
