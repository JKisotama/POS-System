import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoodsUnitComponent } from './create-goods-unit.component';

describe('CreateGoodsUnitComponent', () => {
  let component: CreateGoodsUnitComponent;
  let fixture: ComponentFixture<CreateGoodsUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGoodsUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGoodsUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
