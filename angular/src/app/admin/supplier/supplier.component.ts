import { Component , OnInit} from '@angular/core';
import { SupplierDTO } from '../../API/Admin/Supplier/model';
import { SupplierService } from '../../API/Admin/Supplier/supplier.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent implements OnInit {

  supplierData: SupplierDTO[] = [];

  newSupplier: SupplierDTO = {
    supplierId: '',
    supplierName: '',
    supplierType: '',
    supplierAddress: '',
    supplierPhone: '',
    supplierEmail: ''
    
  }

  editSupplier: SupplierDTO = {
    supplierId: '',
    supplierName: '',
    supplierType: '',
    supplierAddress: '',
    supplierPhone: '',
    supplierEmail: ''
  }

  dataSource = new MatTableDataSource<SupplierDTO>();

  displayColumns: string[] = ['supplierId', 'supplierName', 'supplierType', 'supplierAddress', 'supplierPhone', 'supplierEmail', 'action'];

  constructor(
    private supplierService: SupplierService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getAllSupplier();
  }

  getAllSupplier(){
    this.supplierService.GetAllSupplier().subscribe((response) => {
      this.dataSource.data = response;
    },
  (error) => {
    console.error('Error fetching supplier', error);
  });
  }

  deleteSupplier(id: string) {
    if (id) {
      this.supplierService.deleteSupplier(id).subscribe(
        (response) => {
          console.log('Supplier Deleted Successfully');
          this.ngOnInit();
        },
        (error) => {
          console.error('Error deleting supplier', error);
        }
      );
    } else {
      console.error('Cannot delete supplier because id is undefined');
    }
  }

  openAddNewSupplier(){
    const dialogRef = this.dialog.open(AddSupplierComponent, {
      width: '400px',
      data: {newSupplier : this.newSupplier}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New Supplier Saved: ' , result);
        this.getAllSupplier();
      }
    })
  }

  openEditSupplier(supplier: SupplierDTO) {
    this.editSupplier = { ...supplier};
    const dialogRef = this.dialog.open(EditSupplierComponent, {
      width: '400px',
      data: { editSupplier: this.editSupplier}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Supplier Edited', result);
        const index = this.supplierData.findIndex(s => s.supplierId === result.supplierId);
        this.supplierData[index] = result;
        this.ngOnInit();
      }
    })
  }


}
