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