import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ProductService } from '../../services/product';

export function duplicateNameValidator(productService: ProductService) {
  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value?.trim().toLowerCase();
    if (!name) {
      return null;
    }

    const exists = productService.products().some(
      p => p.name.trim().toLowerCase() === name
    );

    return exists ? { duplicateName: true } : null;
  };
}