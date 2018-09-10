import { FormGroup, FormControl, Validators } from "@angular/forms";

export class Assessment {
    title: string;
    assessmentDate: Date;
    assessmentTypeId: number;
    reference: string;
    scopeId: number;
    published: true;
    scope: string;
    frequency: string;
    frequencyId: number;
    isSuperseded: true;
    publishedDate: Date;
    publishedByUserId: number;
    publishedBy: string;
    assessmentType: string;
    id: number | string;
    addedDate: Date;
    modifiedDate: Date;
    dataId: string;
    status: string;

    /**
     *
     */
    constructor(data?) {
        data = data || {};
        if (data != null) {
            this.title = data.title
            this.assessmentDate = data.assessmentDate
            this.assessmentTypeId = data.assessmentTypeId
            this.reference = data.reference
            this.scopeId = data.scopeId
            this.published = data.published
            this.scope = data.scope;
            this.frequency = data.frequency;
            this.frequencyId = data.frequencyId;
            this.isSuperseded = data.isSuperseded;
            this.publishedDate = data.publishedDate;
            this.publishedByUserId = data.publishedByUserId;
            this.publishedBy = data.publishedBy;
            this.assessmentType = data.assessmentType;
            this.id = data.id | 0;
            this.addedDate = data.addedDate;
            this.modifiedDate = data.modifiedDate;
            this.dataId = data.dataId
        }
    }
}