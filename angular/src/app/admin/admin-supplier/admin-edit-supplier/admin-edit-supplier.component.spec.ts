import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditSupplierComponent } from './admin-edit-supplier.component';

describe('AdminEditSupplierComponent', () => {
  let component: AdminEditSupplierComponent;
  let fixture: ComponentFixture<AdminEditSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
