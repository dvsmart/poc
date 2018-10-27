export class TemplateDetail {
    id: number;
    name: string;
    pluralName: string;
    categoryName: string;
    categoryId: number | null;
    isVisible: boolean;
}

export class TemplateRequest {
    id: number | 0;
    categoryId?: number | null;
    templateName: string;
    pluralName: string;
    isVisible: boolean | true;

    constructor(data?) {
        data = data || {};
        this.id = data.id;
        this.categoryId = data.categoryId;
        this.pluralName = data.pluralName;
        this.isVisible = data.isVisible;
        this.templateName = data.templateName;
    }
}