import { AbstractControl, ValidatorFn } from '@angular/forms'

export const noWhiteSpaceValidator: ValidatorFn = (
    control: AbstractControl
): { [key: string]: any } | null => {
    if (control.value == null) {
        return null
    }
    const isWhitespace = (control.value || '').trim().length === 0
    const isValid = !isWhitespace
    return isValid ? null : { whitespace: true }
}
