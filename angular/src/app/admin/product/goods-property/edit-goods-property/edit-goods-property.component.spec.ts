import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoodsPropertyComponent } from './edit-goods-property.component';

describe('EditGoodsPropertyComponent', () => {
  let component: EditGoodsPropertyComponent;
  let fixture: ComponentFixture<EditGoodsPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGoodsPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGoodsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
