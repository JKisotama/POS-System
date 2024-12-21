import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrantRightComponent } from './admin-grant-right.component';

describe('AdminGrantRightComponent', () => {
  let component: AdminGrantRightComponent;
  let fixture: ComponentFixture<AdminGrantRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGrantRightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminGrantRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
