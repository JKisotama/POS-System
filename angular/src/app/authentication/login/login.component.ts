import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../API/authentication.service';
import { UserService } from '../../API/Staff/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;

  loading: boolean = false;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private authservice: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ){
    this.form = this.fb.group({
      storeId: ['', [Validators.required]],
      loginName: ['', [Validators.required]],
      passWord: ['', Validators.required]
    });
  }

  login(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.loginError = null; 
    const storeId = this.form.get('storeId')?.value;
    const loginName = this.form.get('loginName')?.value;
    const passWord = this.form.get('passWord')?.value;
  
    // Call login service
    this.userService.LoginUser(storeId, loginName, passWord).subscribe(
      (response) => {
        const userLevel = response.user.userLevel; 
        const userType = response.user.userType;
        const fullName = response.user.fullName;
        const userLanguage = response.user.userLanguage;
  
        this.authservice.setLoggedIn(true, loginName, storeId, userLevel, fullName, userLanguage, userType);
        this.snackBar.open('Logged in successfully!', '', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.loginSuccess.emit();
        this.loading = false;
  
        if (userLevel === 1 && userType === 0) {
          this.router.navigate(['Staff']);
        } else if (userLevel === 0 && userType === 0) {
          this.router.navigate(['Admin']);
        } else if (userLevel === 1 && userType === 1) {
          this.router.navigate(['POS']);
        } else {
          this.snackBar.open('Invalid user status.', '', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      },
      (error) => {
        this.snackBar.open('Login Failed. Please try again.', '', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.loading = false;
      }
    );
  }

}
