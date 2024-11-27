import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../API/Admin/authentication.service';
import { UserService } from '../../API/Admin/user/user.service';
import { Router } from '@angular/router';

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
    private userService: UserService
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
  
    const storeId = this.form.get('storeId')?.value;
    const loginName = this.form.get('loginName')?.value;
    const passWord = this.form.get('passWord')?.value;
  
    // Call login service
    this.userService.LoginUser(storeId, loginName, passWord).subscribe(
      (response) => {
        // Extract userLevel from the response (indicating the role of the user)
        const userLevel = response.userLevel; // Assuming userLevel is provided in the response
  
        // Set the logged-in state and store userLevel
        this.authservice.setLoggedIn(true, loginName, storeId, userLevel);
  
        // Emit login success and stop loading
        this.loginSuccess.emit();
        this.loading = false;
  
        // Redirect to 'goods-page' or any other page after successful login
        this.router.navigate(['Admin']);
      },
      (error) => {
        // Handle login error
        this.loginError = 'Login Failed. Please try again.';
        this.loading = false;
      }
    );
  }

}
