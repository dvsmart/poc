export class CustomTabModel {
    caption: string;
    customEntityId: number;
}

export class CustomFieldModel {
    id:number | 0;
    customTabId: number;
    fieldName: string;
    fieldtypeId: number;
    customEntityId?: number;

    /**
     *
     */
    constructor(tabId,fieldName,fieldTypeId) {
        this.customTabId = tabId;
        this.fieldName = fieldName;
        this.fieldtypeId = fieldTypeId;
    }
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
    templateName:string;
    groupName: string;
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


export interface TemplateTabField {
    label?: any;
    name: string;
    type: string;
    value?: any;
    tabId: number;
    sortOrder?: any;
    isMandatory: boolean;
    isVisible: boolean;
    id: number;
}

export class TemplateTab {
    tabId: number;
    tabCaption: string;
    sortOrder?: any;
    isVisible: boolean;
    customFields: TemplateTabField[];
}