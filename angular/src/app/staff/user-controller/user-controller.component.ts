import { Component, OnInit , ViewChild} from '@angular/core';
import { StaffService } from '../../API/Admin/Staff/staff.service';
import { StaffDTO } from '../../API/Admin/Staff/model';
import { NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateStaffComponent } from './create-staff/create-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../../API/Admin/authentication.service';
import { GoodsDTO } from '../../API/Admin/goods/model';
import { UserService } from '../../API/Admin/user/user.service';



@Component({
  selector: 'app-user-controller',
  templateUrl: './user-controller.component.html',
  styleUrl: './user-controller.component.scss'
})
export class UserControllerComponent implements OnInit {


  staffData: StaffDTO[] = [];
  newStaff: StaffDTO = {
    code: '',
    name: '',
    age: '',
    role: '',
    department: ''
  };
  editStaff: StaffDTO = {
    code: '',
    name: '',
    age: '',
    role: '',
    department: ''
  };
  displayedColumns: string[] = ['action','storeId', 'loginName', 'fullName', 'passWord'];
  
  dataSource = new MatTableDataSource<GoodsDTO>();
  storeId: string | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  constructor(
    private userService : UserService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,

  ){}

  ngOnInit() {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.GetAllUser();
  }
  ngAfterViewInit() {
    // Set the paginators for the main table and nested table
    this.dataSource.paginator = this.paginator;
  }

  GetAllUser(){
    if(this.storeId){
      this.userService.GetAllUser(this.storeId).subscribe((response) => {
        this.dataSource.data = response;
      })
    }
  }
  openCreateStaffDialog() {
    const dialogRef = this.dialog.open(CreateStaffComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: { newStaff: this.newStaff }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the saved staff data
        console.log('New staff saved:', result);
      }
    });
  }
  openEditStaff(staff: StaffDTO) {
    this.editStaff = { ...staff };
    const dialogRef = this.dialog.open(EditStaffComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: { editStaff: this.editStaff }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the edited staff data
        console.log('Staff updated:', result);
        // Update the staff data in the staffData array
        const index = this.staffData.findIndex(s => s.code === result.code);
        this.staffData[index] = result;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Handle the form submission
      console.log('Submitted form:', this.newStaff);
      this.dialog.closeAll();
    }
  }

  onCancel() {
    this.dialog.closeAll();
  }
  
}
