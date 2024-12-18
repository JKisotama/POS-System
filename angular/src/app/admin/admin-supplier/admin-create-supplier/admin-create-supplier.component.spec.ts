import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateSupplierComponent } from './admin-create-supplier.component';

describe('AdminCreateSupplierComponent', () => {
  let component: AdminCreateSupplierComponent;
  let fixture: ComponentFixture<AdminCreateSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
