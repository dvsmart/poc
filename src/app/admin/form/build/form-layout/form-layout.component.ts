import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss']
})
export class FormLayoutComponent {
  formLayoutList: [];
  formFields: any[];
  current_field: any;
  guid = 1;

  ngOnInit() {
    this.formLayoutList = [];
    this.formFields = [];
  }

  drop(event: CdkDragDrop<string[]>) {
    debugger;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.buildField(event.item)
    }
  }

  buildField(type: any) {
    console.log(type.data);
    //this.formFields.push(type.data);
    console.log(this.formFields);
  }
}
