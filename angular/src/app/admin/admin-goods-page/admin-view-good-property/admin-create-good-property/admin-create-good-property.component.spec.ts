import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateGoodPropertyComponent } from './admin-create-good-property.component';

describe('AdminCreateGoodPropertyComponent', () => {
  let component: AdminCreateGoodPropertyComponent;
  let fixture: ComponentFixture<AdminCreateGoodPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateGoodPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateGoodPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
