import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateGoodGroupComponent } from './admin-create-good-group.component';

describe('AdminCreateGoodGroupComponent', () => {
  let component: AdminCreateGoodGroupComponent;
  let fixture: ComponentFixture<AdminCreateGoodGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateGoodGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateGoodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
