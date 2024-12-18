import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateCustomerComponent } from './admin-create-customer.component';

describe('AdminCreateCustomerComponent', () => {
  let component: AdminCreateCustomerComponent;
  let fixture: ComponentFixture<AdminCreateCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
