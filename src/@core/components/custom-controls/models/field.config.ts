import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
    disabled?: boolean,
    label?: string,
    name: string,
    options?: FOption[],
    placeholder?: string,
    type: string,
    validation?: ValidatorFn[],
    value?: any,
    hint?:string,
}


export interface FOption{
    id:number,
    value:string
}