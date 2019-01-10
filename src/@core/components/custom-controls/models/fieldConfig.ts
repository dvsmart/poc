import { ErrorStateMatcher } from "@angular/material";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";

export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export class FieldConfig {
  caption?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
  id?: string | number;
  tabId?: number;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}