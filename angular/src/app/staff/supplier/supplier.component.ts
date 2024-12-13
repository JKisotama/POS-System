import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierDTO } from '../../API/Admin/Supplier/model';
import { SupplierService } from '../../API/Admin/Supplier/supplier.service';
import { AuthenticationService } from '../../API/Admin/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent implements OnInit {

  dataSource = new MatTableDataSource<SupplierDTO>();

  displayedColumns: string[] = ['action', 'supplierId', 'supplierName', 'supplierType', 'supplierAddress', 'supplierPhone', 'supplierEmail', 'storeId'];

  storeId: string | null = null;


  constructor(
    private supplierService: SupplierService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.getSupplier();
  }


  getSupplier() {
    if (this.storeId) {
      this.supplierService.GetAllSupplier(this.storeId).subscribe((response) => {
        this.dataSource.data = response;
      })
    }
  }

  openCreateSupplier() {
    const dialogRef = this.dialog.open(CreateSupplierComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSupplier();
      }
    })
  }

}
