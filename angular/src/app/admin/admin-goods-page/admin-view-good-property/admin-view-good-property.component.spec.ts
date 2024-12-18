import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewGoodPropertyComponent } from './admin-view-good-property.component';

describe('AdminViewGoodPropertyComponent', () => {
  let component: AdminViewGoodPropertyComponent;
  let fixture: ComponentFixture<AdminViewGoodPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewGoodPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminViewGoodPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
