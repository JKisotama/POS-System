import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoodPropertyComponent } from './create-good-property.component';

describe('CreateGoodPropertyComponent', () => {
  let component: CreateGoodPropertyComponent;
  let fixture: ComponentFixture<CreateGoodPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGoodPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGoodPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
