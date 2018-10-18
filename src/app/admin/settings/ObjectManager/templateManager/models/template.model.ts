export interface FieldResponse {
    fieldId: number;
    fieldName: string;
    fieldCaption: string;
    isVisible: boolean;
    isRequired: boolean;
    addedOn: Date;
    addedBy: string;
    modifiedOn?: any;
    modifiedBy: string;
    tabId: number;
    fieldChoiceOptions?: any;
    value?: any;
    fieldType:string;
}

export interface TabResponse {
    tabId: number;
    tabName: string;
    fieldsCount: number;
    isVisible: boolean;
    isOptional: boolean;
    addedOn: Date;
    addedBy: string;
    modifiedOn?: any;
    modifiedBy: string;
    fields: FieldResponse[];
}

export interface TemplateResponse {
    id: number;
    templateName: string;
    addedBy?: any;
    modifiedBy?: any;
    addedOn: Date;
    modifiedOn?: any;
    tabs: TabResponse[];
    fields: FieldResponse[];
}