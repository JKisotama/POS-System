import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsPageComponent } from './goods-page.component';

describe('GoodsPageComponent', () => {
  let component: GoodsPageComponent;
  let fixture: ComponentFixture<GoodsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
