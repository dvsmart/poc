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
    constructor(data) {
        if(data != null){
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
            this.id = data.id;
            this.addedDate = data.addedDate;
            this.modifiedDate = data.modifiedDate;
            this.dataId = data.dataId
        }
    }

    assessmentFormGroup() {
        return new FormGroup({
            id: new FormControl(this.id),
            scopeId: new FormControl(this.scopeId),
            frequencyId: new FormControl(this.frequencyId),
            dataId: new FormControl(this.dataId),
            assessmentTypeId: new FormControl(this.assessmentTypeId, Validators.required),
            title: new FormControl(this.title, Validators.required),
            status: new FormControl(this.status),
            assessmentDate: new FormControl(this.assessmentDate),
            publishedBy: new FormControl(this.publishedBy),
            scope: new FormControl(this.scope),
            reference: new FormControl(this.reference)
        })
    }

}