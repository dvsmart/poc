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
}

export interface FieldAttributeDto {
    placeHolder?: any;
    hint?: any;
    showHint: boolean;
    defaultValue?: any;
    isRequired: boolean;
    readOnly: boolean;
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