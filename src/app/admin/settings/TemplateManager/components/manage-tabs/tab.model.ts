import { FieldResponse } from "../manage-fields/field.model";

export class TabRequest {
    tabId: number | 0;
    caption: string | '';
    fieldsCount: number;
    isVisible: boolean | true
    isOptional: boolean | false;
    addedOn: Date;
    addedBy: string;
    modifiedOn?: any;
    modifiedBy: string;
    customTemplateId?:number;
    fields: FieldResponse[];

    
    constructor(templateId?:number) {
        this.customTemplateId = templateId;
    }
}



export class Tab{
    id:number;
    caption: string;

    constructor(data?) {
        {
            this.id = data.id;
            this.caption = data.caption;
        }
    }
}