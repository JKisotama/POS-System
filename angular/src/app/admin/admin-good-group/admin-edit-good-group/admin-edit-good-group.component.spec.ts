import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditGoodGroupComponent } from './admin-edit-good-group.component';

describe('AdminEditGoodGroupComponent', () => {
  let component: AdminEditGoodGroupComponent;
  let fixture: ComponentFixture<AdminEditGoodGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditGoodGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditGoodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
