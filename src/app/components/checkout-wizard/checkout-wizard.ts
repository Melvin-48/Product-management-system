import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-wizard',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-wizard.html',
  styleUrl: './checkout-wizard.css'
})
export class CheckoutWizard {
  currentStep = signal(1);

  wizardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.wizardForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', Validators.required]
    });
  }

  nextStep() {
    if (this.currentStep() === 1 && (this.wizardForm.get('fullName')?.invalid || this.wizardForm.get('address')?.invalid)) {
      this.wizardForm.get('fullName')?.markAsTouched();
      this.wizardForm.get('address')?.markAsTouched();
      return;
    }

    if (this.currentStep() === 2 && (this.wizardForm.get('cardNumber')?.invalid || this.wizardForm.get('expiryDate')?.invalid)) {
      this.wizardForm.get('cardNumber')?.markAsTouched();
      this.wizardForm.get('expiryDate')?.markAsTouched();
      return;
    }

    this.currentStep.update(step => step + 1);
  }

  previousStep() {
    this.currentStep.update(step => step - 1);
  }

  onSubmit() {
    if (this.wizardForm.valid) {
      console.log('Order submitted:', this.wizardForm.value);
    }
  }
}