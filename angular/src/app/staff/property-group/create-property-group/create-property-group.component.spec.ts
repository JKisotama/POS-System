import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropertyGroupComponent } from './create-property-group.component';

describe('CreatePropertyGroupComponent', () => {
  let component: CreatePropertyGroupComponent;
  let fixture: ComponentFixture<CreatePropertyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePropertyGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePropertyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
