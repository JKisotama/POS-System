import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsGroupComponent } from './goods-group.component';

describe('GoodsGroupComponent', () => {
  let component: GoodsGroupComponent;
  let fixture: ComponentFixture<GoodsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodsGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
