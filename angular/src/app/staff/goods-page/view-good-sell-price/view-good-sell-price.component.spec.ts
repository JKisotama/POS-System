import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGoodSellPriceComponent } from './view-good-sell-price.component';

describe('ViewGoodSellPriceComponent', () => {
  let component: ViewGoodSellPriceComponent;
  let fixture: ComponentFixture<ViewGoodSellPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewGoodSellPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewGoodSellPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
