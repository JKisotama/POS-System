import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoodPropertyComponent } from './edit-good-property.component';

describe('EditGoodPropertyComponent', () => {
  let component: EditGoodPropertyComponent;
  let fixture: ComponentFixture<EditGoodPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGoodPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGoodPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
