import { FieldResponse } from "../manage-fields/field.model";

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