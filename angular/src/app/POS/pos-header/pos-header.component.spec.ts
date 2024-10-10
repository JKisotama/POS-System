import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/POS/pos-footer/pos-footer.component.spec.ts
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
========
import { PosHeaderComponent } from './pos-header.component';

describe('PosHeaderComponent', () => {
  let component: PosHeaderComponent;
  let fixture: ComponentFixture<PosHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosHeaderComponent);
>>>>>>>> origin/Thinh-branch:src/app/POS/pos-header/pos-header.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
