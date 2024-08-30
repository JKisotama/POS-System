import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSellPriceComponent } from './edit-sell-price.component';

describe('EditSellPriceComponent', () => {
  let component: EditSellPriceComponent;
  let fixture: ComponentFixture<EditSellPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSellPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSellPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
