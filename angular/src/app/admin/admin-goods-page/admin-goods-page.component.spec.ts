import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsPageComponent } from './admin-goods-page.component';

describe('AdminGoodsPageComponent', () => {
  let component: AdminGoodsPageComponent;
  let fixture: ComponentFixture<AdminGoodsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGoodsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminGoodsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
