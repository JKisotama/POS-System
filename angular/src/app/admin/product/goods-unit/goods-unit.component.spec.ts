import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsUnitComponent } from './goods-unit.component';

describe('GoodsUnitComponent', () => {
  let component: GoodsUnitComponent;
  let fixture: ComponentFixture<GoodsUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodsUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
