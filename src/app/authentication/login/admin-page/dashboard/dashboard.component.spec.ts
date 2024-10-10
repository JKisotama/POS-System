import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/POS/pos-header/pos-header.component.spec.ts
import { PosHeaderComponent } from './pos-header.component';

describe('PosHeaderComponent', () => {
  let component: PosHeaderComponent;
  let fixture: ComponentFixture<PosHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosHeaderComponent);
========
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
>>>>>>>> origin/Thinh-branch:src/app/authentication/login/admin-page/dashboard/dashboard.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
