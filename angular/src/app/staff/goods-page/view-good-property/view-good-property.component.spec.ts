import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGoodPropertyComponent } from './view-good-property.component';

describe('ViewGoodPropertyComponent', () => {
  let component: ViewGoodPropertyComponent;
  let fixture: ComponentFixture<ViewGoodPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewGoodPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewGoodPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
