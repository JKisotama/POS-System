import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellPriceComponent } from './create-sell-price.component';

describe('CreateSellPriceComponent', () => {
  let component: CreateSellPriceComponent;
  let fixture: ComponentFixture<CreateSellPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSellPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSellPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
