import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoodSellPriceComponent } from './edit-good-sell-price.component';

describe('EditGoodSellPriceComponent', () => {
  let component: EditGoodSellPriceComponent;
  let fixture: ComponentFixture<EditGoodSellPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGoodSellPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGoodSellPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
