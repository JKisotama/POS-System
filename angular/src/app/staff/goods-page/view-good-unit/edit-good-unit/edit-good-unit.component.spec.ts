import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoodUnitComponent } from './edit-good-unit.component';

describe('EditGoodUnitComponent', () => {
  let component: EditGoodUnitComponent;
  let fixture: ComponentFixture<EditGoodUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGoodUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGoodUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
