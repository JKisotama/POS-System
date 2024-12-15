import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoodGroupComponent } from './edit-good-group.component';

describe('EditGoodGroupComponent', () => {
  let component: EditGoodGroupComponent;
  let fixture: ComponentFixture<EditGoodGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGoodGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGoodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
