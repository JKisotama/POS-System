import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropertyGroupComponent } from './admin-property-group.component';

describe('AdminPropertyGroupComponent', () => {
  let component: AdminPropertyGroupComponent;
  let fixture: ComponentFixture<AdminPropertyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPropertyGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPropertyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
