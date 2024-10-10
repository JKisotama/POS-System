import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/POS/pos-main/pos-main.component.spec.ts
import { PosMainComponent } from './pos-main.component';

describe('PosMainComponent', () => {
  let component: PosMainComponent;
  let fixture: ComponentFixture<PosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosMainComponent);
========
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
>>>>>>>> origin/Thinh-branch:src/app/authentication/login/login.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
