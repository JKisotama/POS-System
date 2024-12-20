import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierDTO } from '../../API/Staff/Supplier/model';
import { AdminSupplierService } from '../../API/Admin/suppliers/supplier.service';
import { SupplierService } from '../../API/Staff/Supplier/supplier.service';
import { AuthenticationService } from '../../API/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminCreateSupplierComponent } from './admin-create-supplier/admin-create-supplier.component';
import { AdminEditSupplierComponent } from './admin-edit-supplier/admin-edit-supplier.component';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';

@Component({
  selector: 'app-admin-supplier',
  templateUrl: './admin-supplier.component.html',
  styleUrl: './admin-supplier.component.scss'
})
export class AdminSupplierComponent implements OnInit {

  dataSource = new MatTableDataSource<SupplierDTO>();
  
    displayedColumns: string[] = ['action', 'supplierName', 'supplierType', 'supplierAddress', 'supplierPhone', 'supplierEmail'];
  
    storeId: string | null = null;
  
  
    constructor(
      private adminSupplierService: AdminSupplierService,
      private supplierService: SupplierService,
      private authenticationService: AuthenticationService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
    ) { }
  
  
    ngOnInit(): void {
      this.storeId = this.authenticationService.getStoreIdUser();
      this.getSupplier();
    }
  
  
    getSupplier() {
      if (this.storeId) {
        this.adminSupplierService.GetAllSupplier(this.storeId).subscribe((response) => {
          this.dataSource.data = response;
        })
      }
    }
  
    openCreateSupplier() {
      const dialogRef = this.dialog.open(AdminCreateSupplierComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.snackBar.open('Created new Supplier successfully!', 'Close', {
            duration: 3000, 
            panelClass: ['snackbar-success'], 
          });
          this.getSupplier();
        }
      })
    }
  
    openEditSupplier(supplier: SupplierDTO){
      const dialogRef = this.dialog.open(AdminEditSupplierComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container',
        data: { supplier }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.snackBar.open('Update Supplier successfully!', 'Close', {
            duration: 3000, 
            panelClass: ['snackbar-success'], 
          });
          this.getSupplier();
        }
      })
    }
  
    confirmDelete(supplier: SupplierDTO): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        panelClass: 'custom-dialog-container',
        data: {
          message: 'Are you sure you want to delete this item?'
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.deleteSupplier(supplier);
  
        } else {
          this.snackBar.open('Delete operation canceled', '', {
            duration: 2000,
            panelClass: ['snackbar-error'],
          });
        }
      })
    }
  
    deleteSupplier(supplier: SupplierDTO): void {
      if(this.storeId && supplier.supplierId){
        this.supplierService.deleteSupplier(this.storeId, supplier.supplierId).subscribe({
          next: () => {
            this.snackBar.open('Supplier deleted successfully', '', {
              duration: 2000,
              panelClass: ['snackbar-success'],
            });
            this.getSupplier(); 
          },
          error: () => {
            this.snackBar.open('Error while deleting Supplier', '', {
              duration: 2000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    }
}
