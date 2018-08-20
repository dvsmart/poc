import { Component } from "@angular/core";
import { ToasterService } from "./toaster.service";
import { MatSnackBar } from "@angular/material";
import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'toaster',
    templateUrl: './toaster.component.html',
    styles: ['./toaster.component.scss'],
})
export class ToasterComponent {

    constructor(private toaster: ToasterService) {

    }

    ngOnInit() {
        this.toaster.currentMessage.subscribe(message => alert(message));
    }
}