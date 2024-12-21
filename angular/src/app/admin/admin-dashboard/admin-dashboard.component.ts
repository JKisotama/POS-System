import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsSoldReport, SaleReport } from '../../API/Staff/dashboard/model';
import { AuthenticationService } from '../../API/authentication.service';
import { DashboardService } from '../../API/Staff/dashboard/dashboard.service';
import { CustomDatePipe } from '../../../assets/custom-date/custom.date';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{


  form: FormGroup;
  totalPurchase: SaleReport[] = [];
  
    storeId: string | null = null;
    saleReports = new MatTableDataSource<SaleReport>();
    goodsSoldReports = new MatTableDataSource<GoodsSoldReport>();
    saleReportColumns: string[] = ['posNumber', 'posDate', 'customerName', 'posTotal', 'posDiscount', 'posTopay', 'posPaymentmethod'];
    goodsSoldReportColumns: string[] = ['goodsName', 'itemUnit', 'propertyValue', 'itemQuantity', 'lineTotal'];
  
    purchaseHangCount = 0;
    purchaseCancelCount = 0;
    purchaseCheckedOutCount = 0;

    constructor(
      private authenticationService: AuthenticationService,
      private dashboardService: DashboardService,
      private fb: FormBuilder,
      private customDatePipe: CustomDatePipe 
    ){}
  
  
    ngOnInit(): void {
      this.storeId = this.authenticationService.getStoreIdUser();
      this.buildForm();
    }
  
    buildForm(){
      this.form = this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      })
    }
  
    onSubmit(): void {
      if (this.form.valid && this.storeId) {
        // Format the date values before submitting
        const formattedStartDate = this.customDatePipe.transform(this.form.value.startDate);
        const formattedEndDate = this.customDatePipe.transform(this.form.value.endDate);
  
        // this.loadSaleReports(formattedStartDate, formattedEndDate);
        this.loadGoodsSoldReports(formattedStartDate, formattedEndDate);
        this.loadTotalPurchase(formattedStartDate, formattedEndDate)
      }
    }
  
    // loadSaleReports(startDate: string, endDate: string): void {
    //   this.dashboardService.getSaleReport(this.storeId!, startDate, endDate).subscribe((data) => {
    //     this.saleReports.data = data;
    //   });
    // }
  
    loadGoodsSoldReports(startDate: string, endDate: string): void {
      this.dashboardService.getReportByGoodsSold(this.storeId!, startDate, endDate).subscribe((data) => {
        this.goodsSoldReports.data = data;
      });
    }

    loadTotalPurchase(startDate: string, endDate: string) {
      this.dashboardService.getTotalPurchaseOrder(this.storeId!, startDate, endDate).subscribe((response) => {
        this.totalPurchase = response;
        this.calculatePurchaseCounts();
      });
    }

    calculatePurchaseCounts(): void {
      this.purchaseHangCount = this.totalPurchase.filter(p => p.posStatus === 1).length;
      this.purchaseCancelCount = this.totalPurchase.filter(p => p.posStatus === 2).length;
      this.purchaseCheckedOutCount = this.totalPurchase.filter(p => p.posStatus === 3).length;
    }

    
getStatusLabel(status: number): string {
      switch (status) {
        case 1:
          return 'Purchase Hang';
        case 2:
          return 'Purchase Cancel';
        case 3:
          return 'Purchase Checked Out';
        default:
          return 'Unknown Status';
      }
    }
  
    getTotalPurchaseCount(): number {
      return this.totalPurchase.length;
    }
}
