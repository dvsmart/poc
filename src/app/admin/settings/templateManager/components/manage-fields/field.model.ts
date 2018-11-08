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
    fieldType: string;
}

export class CreateTabFieldRequest {
    id: number | 0;
    caption: string;
    tabId: number | null;
    controlTypeId: number;
    isVisible: boolean | true;
    controlType:string;
    templateId:number | null;
    tabName:string;

    constructor(data?) {
        this.id = data.id || 0;
        this.caption = data.caption || '';
        this.tabId = data.tabId;
        this.controlTypeId = data.fieldType;
        this.isVisible = true;
        this.templateId = data.templateId;
        this.tabName = data.tabName;
    }
}

export class CreateTemplateFieldRequest {
    id: number | 0;
    caption: string;
    templateId: number | null;
    controlTypeId: number;
    isVisible: boolean | true;

    constructor(data?) {
        this.id = data.id;
        this.caption = data.caption;
        this.templateId = data.templateId;
        this.controlTypeId = data.fieldType;
        this.isVisible = true;
    }
}

export class FieldType {
    id: number;
    caption: string;
}