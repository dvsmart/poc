import { Validators } from "@angular/forms";

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