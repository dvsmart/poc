import { FieldConfig } from "@core/components/custom-controls/models/fieldConfig";

export class CustomField {
    fieldId: number;
    name: string;
    caption: string;
    sortOrder?: any;
    isVisible: boolean;
    type: string;
    value?: string;
    validations?: any[]

    constructor(data: any) {
        this.fieldId = data.fieldId;
        this.caption = data.caption;
        this.name = 'fieldId_' + data.fieldId;
        this.type = data.fieldType;
        this.sortOrder = data.sortOrder;
        this.isVisible = data.isVisible = true;
    }
}

export interface Template {
    templateName: string;
    groupId: number;
    groupName?: any;
    id: number;
}

export class TemplateList {
    groupName: string;
    groupId: number;
    count: number;
    templates: Template[];
}

export class CustomTab {
    tabId: number;
    caption: string;
    sortOrder?: any;
    isVisible: boolean;
    fields: FieldConfig[];
}

export class CustomEntityRecord {
    id: number;
    dataId: string;
    customEntityId: number;
    templateName: string;
    customTabs: CustomTab[];

    /**
     *
     */
    constructor(data?) {
        data = data || {};
        this.id = data.id;
        this.dataId = data.dataId;
        this.customEntityId = data.customEntityId;
        this.customTabs = data.customTabs;
        this.templateName = data.templateName;
    }

}


export class CustomEntityValue {
    customEntityId: number;
    CustomEntityValueId: number;
    id: number;
    fieldValues: Field[] = [];
    statusId: number = 1;
}

export class Field {
    id: string | number;
    value: string;
}

export interface CustomEntity {
    id: number
    tabs: CustomTab[]
}

export class CustomFieldDto {
    tabId: number;
    name: string;
    type: string | number;
    id: number;
}

export class PagedResult {
    data: any[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
}