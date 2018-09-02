import { fuseAnimations } from "@core/animations";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.scss'],
    animations: fuseAnimations
})

export class EditFormComponent {
    customRecordForm: FormGroup;

    constructor() {
        this.customRecordForm = new FormGroup({});
    }

    ngOnInit() {

    }
}