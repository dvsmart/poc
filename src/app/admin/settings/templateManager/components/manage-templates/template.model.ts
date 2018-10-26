export class TemplateDetail {
    id: number;
    name: string;
    pluralName: string;
    categoryName: string;
    categoryId: number | null;
    isVisible: boolean;
}

export interface TemplateRequest {
    id: number | 0;
    categoryId?: number | null;
    templateName: string;
    pluralName: string;
    isVisible: boolean | true;
}