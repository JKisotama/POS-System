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
    if (this.form.invalid){
      return;
    }

    const storeId = this.form.get('storeId')?.value;
    const loginName = this.form.get('loginName')?.value;
    const passWord = this.form.get('passWord')?.value;

    this.userService.LoginUser(storeId, loginName, passWord).subscribe((response) => {
      this.authservice.setLoggedIn(true, loginName, storeId );
      this.loginSuccess.emit();

      this.router.navigate(['goods-page']);
    })
  }

}
