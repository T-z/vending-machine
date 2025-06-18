import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingMaschineComponent } from './vending-maschine.component';

describe('VendingMaschineComponent', () => {
  let component: VendingMaschineComponent;
  let fixture: ComponentFixture<VendingMaschineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendingMaschineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendingMaschineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
