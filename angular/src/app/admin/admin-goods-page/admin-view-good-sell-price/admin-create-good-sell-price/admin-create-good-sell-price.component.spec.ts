import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateGoodSellPriceComponent } from './admin-create-good-sell-price.component';

describe('AdminCreateGoodSellPriceComponent', () => {
  let component: AdminCreateGoodSellPriceComponent;
  let fixture: ComponentFixture<AdminCreateGoodSellPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateGoodSellPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateGoodSellPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
