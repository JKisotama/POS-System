import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosMainComponent } from './pos-main.component';

describe('PosMainComponent', () => {
  let component: PosMainComponent;
  let fixture: ComponentFixture<PosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
