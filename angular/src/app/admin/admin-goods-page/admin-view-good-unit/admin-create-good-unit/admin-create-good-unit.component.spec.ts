import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateGoodUnitComponent } from './admin-create-good-unit.component';

describe('AdminCreateGoodUnitComponent', () => {
  let component: AdminCreateGoodUnitComponent;
  let fixture: ComponentFixture<AdminCreateGoodUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateGoodUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateGoodUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
