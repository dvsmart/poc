export class FormFieldRequestModel {
    id: string;
    label: string;
    tabId: number;
    description: string;
    isRequired: boolean;
    hidden: boolean;
    readonly: boolean;
    fieldTypeId: number;
    showDescription: boolean;
    placeholderText: string;
    formFieldSpecificRequestModel: FormFieldSpecificRequestModel

    constructor(data?) {
        data = data || {};
        this.id = data.id || 0;
        this.label = data.label;
        this.tabId = data.tabId;
        this.description = data.description;
        this.hidden = data.hidden || false;
        this.readonly = data.readOnly || false;
        this.showDescription = data.showDescription;
        this.placeholderText = data.placeholder;
    }
}

export class FieldDetail {
    id: number;
    caption: string;
    type: string;
    tabName: string;
    fieldTypeId: number;
    hint: string;
    hidden: boolean;
    isRequired: boolean;
    placeHolder?: any;
    disabled: boolean;
}


export class FormFieldSpecificRequestModel {
    defaultValue: string;
    minimumValue: number;
    maximumValue: number;
    colspan: number;
    maximumRows: number;
    decimalFormat: number;
    currency: number;
    fileTypes: string;
    dateFormat: string;
    fieldOptions: FieldOptionRequestModel[] = [];
    validation: string;

    constructor(data?) {
        data = data || {};
        this.colspan = data.colspan;
        this.minimumValue = data.minimumValue;
        this.minimumValue = data.maximumValue;
        this.maximumRows = data.maximumRows;
        this.currency = data.currency;
        this.decimalFormat = data.decimalFormat;
        this.defaultValue = data.defaultValue;
        this.fileTypes = data.fileTypes;
        this.validation = data.validation;
        this.dateFormat = data.dateFormat;
        this.fieldOptions = [];
    }
}

export class FieldOptionRequestModel {
    id: number;
    value: string;

    constructor(value) {
        this.id = 0;
        this.value = value;
    }

}

export class FieldType {
    type: string;

    constructor(data?) {
        data = data || {};
        this.type = data.type || '';
    }
}



export class FieldGeneralVisibility {
    isRequired: boolean;
    hidden: boolean;
    readOnly: boolean;
    showDescription: boolean;
    placeholder: boolean;

    constructor(data?) {
        data = data || {};
        this.hidden = data.hidden || false;
        this.readOnly = data.readOnly || false;
        this.isRequired = data.isRequired || false;
        this.placeholder = data.placeHolder || false;
        this.showDescription = data.showDescription || false;
    }
}

export class FieldSpecificVisibility {
    defaultValue: boolean;
    minimumValue: boolean;
    maximumValue: boolean;
    colspan: boolean;
    maximumRows: boolean;
    decimalFormat: boolean;
    currency: boolean;
    fileTypes: boolean;
    fieldOptions: boolean;
    validation: boolean;

    constructor(data?) {
        data = data || {};
        this.decimalFormat = data.decimalFormat || false;
        this.colspan = data.colspan || false;
        this.currency = data.currency || false;
        this.maximumValue = data.maximumValue || false;
        this.minimumValue = data.minimumValue || false;
        this.defaultValue = data.defaultValue || false;
        this.fileTypes = data.fileTypes || false;
        this.fieldOptions = data.fieldOptions || false;
        this.maximumRows = data.maximumRows || false;
        this.validation = data.validation || false;
    }
}