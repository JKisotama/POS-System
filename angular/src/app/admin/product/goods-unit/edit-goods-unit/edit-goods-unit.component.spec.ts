import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoodsUnitComponent } from './edit-goods-unit.component';

describe('EditGoodsUnitComponent', () => {
  let component: EditGoodsUnitComponent;
  let fixture: ComponentFixture<EditGoodsUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGoodsUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGoodsUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
