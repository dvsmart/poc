export interface LiveFormResponse {
    id: number;
    status: number;
    formId: number;
    formName: string;
    dataId?: string;
    tabs: Tab[];
}

export interface Tab {
    id: number;
    caption: string;
    hidden: boolean;
    isOptional: boolean;
    fields: Field[];
}

export interface Field {
    id: number;
    caption: string;
    name: string;
    fieldType: string;
    value?: any;
    fieldAttributeDto: FieldAttributeDto;
    fieldSpectificDto: FieldSpecificDto;
}

export interface FieldSpecificDto{
    fieldOptions: FieldOptionDto[],
    minimumValue:number;
    maximumValue:number;
}

export interface FieldAttributeDto {
    placeHolder?: any;
    hint?: any;
    showHint: boolean;
    defaultValue?: any;
    isRequired: boolean;
    readOnly: boolean;
}

export interface FieldOptionDto {
    id: number;
    value: string;
}

export interface LiveFormRecordRequest {
    id: number;
    formId: number;
    fieldValues: FieldValue[];
}

export interface FieldValue {
    fieldKey: string;
    value: string;
}