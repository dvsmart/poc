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

export class TabResponse {
    tabId: number | 0;
    tabName: string | '';
    fieldsCount: number;
    isVisible: boolean | true
    isOptional: boolean | false;
    addedOn: Date;
    addedBy: string;
    modifiedOn?: any;
    modifiedBy: string;
    customTemplateId?:number;
    fields: FieldResponse[];

    constructor(templateId){
        {
            if(typeof(templateId) == "object"){
                this.tabId = templateId.tabId;
                this.tabName = templateId.tabName == undefined ? templateId.caption : templateId.tabName;
                this.isVisible = templateId.isVisible;
                this.customTemplateId = templateId.customTemplateId;
            }else{
                this.customTemplateId = templateId;
            }
        }
    }
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


export class CreateFieldRequest{
    id: number | 0;
    caption:string;
    tabId: number | null;
    templateId: number | null;
    controlTypeId: number;
    isVisible: boolean | true;

    constructor(data?){
        this.id = data.id;
        this.caption = data.caption;
        this.tabId = data.tabId;
        this.templateId = data.templateId;
        this.controlTypeId = data.fieldType;
        this.isVisible = true;
    }
}

export class FieldType{
    id: number;
    caption: string;
}