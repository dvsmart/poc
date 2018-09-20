export class CustomTabModel {
    caption: string;
    customEntityId: number;
}

export class CustomFieldModel {
    customTabId: number;
    fieldName: string;
    fieldtypeId: number;
}

export class Category {
    id: number;
    categoryName: string;
}

export class customGroupTemplate {
    customTemplates: CreateCustomTemplateRequest[];
    groupName: string;
    groupId: number;
    /**
     *
     */
    constructor(data?) {
        data = data || {};
        this.groupId = data.groupId;
        this.groupName = data.groupName;
        this.customTemplates = data.templates
    }
}



export class CreateCustomTemplateRequest {
    id: number;
    groupId: number;
    templateName: string;

    /**
     *
     */
    // constructor(data?) {
    //     data = data || {};
    //     this.id = data.id;
    //     this.groupId = data.groupId;
    //     this.templateName = data.templateName;
    // }
    /**
     *
     */
    constructor(groupId: number, templateName: string, id?: number) {
        this.id = id | 0;
        this.groupId = groupId;
        this.templateName = templateName;
    }
}

export class CustomTemplateTab {
    caption: string;
    fieldsCount: number;
    templateId: number;
    /**
     *
     */
    constructor(data?) {
        data = data || {};
        this.caption = data.caption;
        this.templateId = data.customEntityId;
        this.fieldsCount = data.customFields.length;

    }
}

export interface CustomTab {
    id: number;
    tabName: string;
    fieldsCount: number;
}

export interface CustomTabResponse {
    customEntityId: number;
    customTabs: CustomTab[];
}

export class CreateCustomTabRequest {
    caption: string;
    id?: number | 0;
    customEntityId: number;

    /**
     *
     */
    constructor(caption, customEntityId, id?: number) {
        this.caption = caption;
        this.customEntityId = customEntityId;
    }
}