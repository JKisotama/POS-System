import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditGoodPropertyComponent } from './admin-edit-good-property.component';

describe('AdminEditGoodPropertyComponent', () => {
  let component: AdminEditGoodPropertyComponent;
  let fixture: ComponentFixture<AdminEditGoodPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditGoodPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditGoodPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
