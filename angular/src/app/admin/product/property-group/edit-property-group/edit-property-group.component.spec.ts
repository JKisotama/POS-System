import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropertyGroupComponent } from './edit-property-group.component';

describe('EditPropertyGroupComponent', () => {
  let component: EditPropertyGroupComponent;
  let fixture: ComponentFixture<EditPropertyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPropertyGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPropertyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
