export class FormTab{
    id: number;
    caption:string;
    ishidden:boolean;
    isOptional: boolean;
    templateName?: string;

    constructor(data?: any) {
        data = data || {};
        this.id = data.id || 0;
        this.caption = data.caption;
        this.ishidden = data.hidden;
        this.isOptional = data.isOptional;
        this.templateName = data.templateName;
    }
}

export class TabRequest{
    id:number;
    caption:string;
    formId:number;
    isOptional:boolean;
    hidden:boolean;

    constructor(data?) {
        data = data || {};
        this.id = data.id;
        this.formId = data.formId;
        this.hidden = data.hidden || false;
        this.caption = data.caption;
        this.isOptional = data.isOptional || false;
    }
}