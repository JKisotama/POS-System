import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPriceComponent } from './sell-price.component';

describe('SellPriceComponent', () => {
  let component: SellPriceComponent;
  let fixture: ComponentFixture<SellPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
