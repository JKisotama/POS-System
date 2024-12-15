import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoodUnitComponent } from './create-good-unit.component';

describe('CreateGoodUnitComponent', () => {
  let component: CreateGoodUnitComponent;
  let fixture: ComponentFixture<CreateGoodUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGoodUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGoodUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
