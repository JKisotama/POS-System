import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewGoodSellPriceComponent } from './admin-view-good-sell-price.component';

describe('AdminViewGoodSellPriceComponent', () => {
  let component: AdminViewGoodSellPriceComponent;
  let fixture: ComponentFixture<AdminViewGoodSellPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewGoodSellPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminViewGoodSellPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
