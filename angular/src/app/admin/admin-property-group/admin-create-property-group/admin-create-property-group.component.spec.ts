import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatePropertyGroupComponent } from './admin-create-property-group.component';

describe('AdminCreatePropertyGroupComponent', () => {
  let component: AdminCreatePropertyGroupComponent;
  let fixture: ComponentFixture<AdminCreatePropertyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreatePropertyGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreatePropertyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
