import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom email validator with more strict validation
 * Validates email format with the following rules:
 * - Must have @ symbol
 * - Must have domain with at least one dot
 * - No spaces allowed
 * - Valid characters before and after @
 */
export function customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // Don't validate empty values (use required validator for that)
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const valid = emailRegex.test(control.value);

        return valid ? null : { customEmail: { value: control.value } };
    };
}
