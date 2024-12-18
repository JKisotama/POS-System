import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateGoodComponent } from './admin-create-good.component';

describe('AdminCreateGoodComponent', () => {
  let component: AdminCreateGoodComponent;
  let fixture: ComponentFixture<AdminCreateGoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateGoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
