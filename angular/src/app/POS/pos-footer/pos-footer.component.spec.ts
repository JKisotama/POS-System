import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosFooterComponent } from './pos-footer.component';

describe('PosFooterComponent', () => {
  let component: PosFooterComponent;
  let fixture: ComponentFixture<PosFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
