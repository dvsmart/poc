export class TabRequest {
    id: number | 0;
    caption: string | '';
    isVisible: boolean | true
    isOptional: boolean | false;
    customTemplateId?:number;
    
    constructor(data?) {
        data = data || {};
        this.id = data.id;
        this.caption = data.caption;
        this.isVisible = data.isVisible;
        this.isOptional = data.isOptional;
        this.customTemplateId = data.customTemplateId
    }
}