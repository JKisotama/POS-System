import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPropertyGroupComponent } from './admin-edit-property-group.component';

describe('AdminEditPropertyGroupComponent', () => {
  let component: AdminEditPropertyGroupComponent;
  let fixture: ComponentFixture<AdminEditPropertyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditPropertyGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditPropertyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
