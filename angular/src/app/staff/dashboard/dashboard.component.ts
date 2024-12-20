import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../API/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsSoldReport, SaleReport } from '../../API/Staff/dashboard/model';
import { DashboardService } from '../../API/Staff/dashboard/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomDatePipe } from '../../../assets/custom-date/custom.date';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  form: FormGroup;

  storeId: string | null = null;
  saleReports = new MatTableDataSource<SaleReport>();
  goodsSoldReports = new MatTableDataSource<GoodsSoldReport>();
  saleReportColumns: string[] = ['posNumber', 'posDate', 'customerName', 'posTotal', 'posDiscount', 'posTopay', 'posPaymentmethod'];
  goodsSoldReportColumns: string[] = ['goodsName', 'itemUnit', 'propertyValue', 'itemQuantity', 'lineTotal'];

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

      this.loadSaleReports(formattedStartDate, formattedEndDate);
      this.loadGoodsSoldReports(formattedStartDate, formattedEndDate);
    }
  }

  loadSaleReports(startDate: string, endDate: string): void {
    this.dashboardService.getSaleReport(this.storeId!, startDate, endDate).subscribe((data) => {
      this.saleReports.data = data;
    });
  }

  loadGoodsSoldReports(startDate: string, endDate: string): void {
    this.dashboardService.getReportByGoodsSold(this.storeId!, startDate, endDate).subscribe((data) => {
      this.goodsSoldReports.data = data;
    });
  }

}
