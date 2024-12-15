import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGoodUnitComponent } from './view-good-unit.component';

describe('ViewGoodUnitComponent', () => {
  let component: ViewGoodUnitComponent;
  let fixture: ComponentFixture<ViewGoodUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewGoodUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewGoodUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
