import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoodsGroupComponent } from './edit-goods-group.component';

describe('EditGoodsGroupComponent', () => {
  let component: EditGoodsGroupComponent;
  let fixture: ComponentFixture<EditGoodsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGoodsGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGoodsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
