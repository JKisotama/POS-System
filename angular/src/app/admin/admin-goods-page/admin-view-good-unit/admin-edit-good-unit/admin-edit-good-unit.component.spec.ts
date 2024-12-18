import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditGoodUnitComponent } from './admin-edit-good-unit.component';

describe('AdminEditGoodUnitComponent', () => {
  let component: AdminEditGoodUnitComponent;
  let fixture: ComponentFixture<AdminEditGoodUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditGoodUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditGoodUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
