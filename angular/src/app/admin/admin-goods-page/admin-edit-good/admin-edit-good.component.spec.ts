import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditGoodComponent } from './admin-edit-good.component';

describe('AdminEditGoodComponent', () => {
  let component: AdminEditGoodComponent;
  let fixture: ComponentFixture<AdminEditGoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditGoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
