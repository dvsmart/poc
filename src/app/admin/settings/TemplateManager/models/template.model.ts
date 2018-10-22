import { TabResponse } from "../components/manage-tabs/tab.model";
import { FieldResponse } from "../components/manage-fields/field.model";

export interface TemplateResponse {
    id: number;
    templateName: string;
    addedBy?: any;
    modifiedBy?: any;
    addedOn: Date;
    modifiedOn?: any;
    tabs: TabResponse[];
    fields: FieldResponse[];
}
