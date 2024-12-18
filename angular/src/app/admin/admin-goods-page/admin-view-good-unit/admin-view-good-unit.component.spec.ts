import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewGoodUnitComponent } from './admin-view-good-unit.component';

describe('AdminViewGoodUnitComponent', () => {
  let component: AdminViewGoodUnitComponent;
  let fixture: ComponentFixture<AdminViewGoodUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewGoodUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminViewGoodUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
