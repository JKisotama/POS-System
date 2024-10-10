import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoodGroupComponent } from './create-good-group.component';

describe('CreateGoodGroupComponent', () => {
  let component: CreateGoodGroupComponent;
  let fixture: ComponentFixture<CreateGoodGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGoodGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGoodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
