import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControllerComponent } from './user-controller.component';

describe('UserControllerComponent', () => {
  let component: UserControllerComponent;
  let fixture: ComponentFixture<UserControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
