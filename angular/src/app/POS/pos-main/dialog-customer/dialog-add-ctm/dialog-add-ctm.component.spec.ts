import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCtmComponent } from './dialog-add-ctm.component';

describe('DialogAddCtmComponent', () => {
  let component: DialogAddCtmComponent;
  let fixture: ComponentFixture<DialogAddCtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddCtmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddCtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
