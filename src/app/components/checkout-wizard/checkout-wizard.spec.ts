import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutWizard } from './checkout-wizard';

describe('CheckoutWizard', () => {
  let component: CheckoutWizard;
  let fixture: ComponentFixture<CheckoutWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutWizard],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutWizard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
