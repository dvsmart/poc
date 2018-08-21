import {
    Component, Input
} from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { MatSnackBar } from '@angular/material';



@Component({
    selector: 'toaster',
    templateUrl: './toaster.component.html',
    styleUrls: ['./toaster.component.scss']
})

export class ToasterComponent {
    
    @Input() message: string;

    constructor(public snackBar: MatSnackBar) {
    }

    ngOnInit() {
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    showToaster(message) {
        this.snackBar.openFromComponent(ToasterComponent, { duration: 5000 });
    }

    ngOnDestroy(){
        this.snackBar.dismiss();
    }
}