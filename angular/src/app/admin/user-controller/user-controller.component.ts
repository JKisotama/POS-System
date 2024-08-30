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
  displayedColumns: string[] = ['code', 'name', 'age', 'role', 'department', 'action'];
  
  dataSource = new MatTableDataSource<StaffDTO>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  constructor(
    private staffService : StaffService,
    private dialog: MatDialog

  ){}

  ngOnInit() {
    this.getAllStaff();

  }
  ngAfterViewInit() {
    // Set the paginators for the main table and nested table
    this.dataSource.paginator = this.paginator;
  }

  getAllStaff() {
    this.staffService.GetAllStaff().subscribe(
      (response) => {
        this.dataSource.data = response;
      },
      (error) => {
        console.error('Error fetching staff data:', error);
      }
    );
  }
  openCreateStaffDialog() {
    const dialogRef = this.dialog.open(CreateStaffComponent, {
      width: '400px',
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
