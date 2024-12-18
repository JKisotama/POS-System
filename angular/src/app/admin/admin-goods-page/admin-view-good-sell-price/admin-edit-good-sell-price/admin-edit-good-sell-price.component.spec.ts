import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditGoodSellPriceComponent } from './admin-edit-good-sell-price.component';

describe('AdminEditGoodSellPriceComponent', () => {
  let component: AdminEditGoodSellPriceComponent;
  let fixture: ComponentFixture<AdminEditGoodSellPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditGoodSellPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditGoodSellPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
