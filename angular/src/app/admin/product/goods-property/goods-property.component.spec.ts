import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsPropertyComponent } from './goods-property.component';

describe('GoodsPropertyComponent', () => {
  let component: GoodsPropertyComponent;
  let fixture: ComponentFixture<GoodsPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodsPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
