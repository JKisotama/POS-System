import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodGroupComponent } from './admin-good-group.component';

describe('AdminGoodGroupComponent', () => {
  let component: AdminGoodGroupComponent;
  let fixture: ComponentFixture<AdminGoodGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGoodGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminGoodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
