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

export class CustomTab {
    tabId: number;
    caption: string;
    sortOrder?: any;
    isVisible: boolean;
    customFields: FieldConfig[];
}

export class CustomEntityRecord {
    id: number;
    dataId: string;
    customEntityId: number;
    customTabs: CustomTab[];
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

export class CustomTabDto {
    customEntityId: number;
    caption: string;
    tabId: number;
    fields: FieldConfig[]

    /**
     *
     */
    constructor(obj: any) {
        if (obj == undefined) return;
        this.customEntityId = obj.customEntityId;
        this.caption = obj.caption;
        this.tabId = obj.id;
        this.fields = this.mapFields(obj.customFields);
    }

    mapFields(fields: any[]) {
        let cusFields: FieldConfig[] = [];
        fields.map(function (val) {
            cusFields.push({
                name: val.name,
                type: val.type,
                label: val.label,
                id: val.id,
                tabId: val.tabId,
                inputType: val.type
            })
        })
        return cusFields;
    }

    mapType(type) {
        switch (type) {
            case "TextBox":
                return "text";
            case "Calender":
                return "date";
            case "Picklist":
                return "select";
            case "TextArea":
                return "textarea";
            default:
                break;
        }
        return "text";
    }
}

export class PagedResult {
    data: any[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
}