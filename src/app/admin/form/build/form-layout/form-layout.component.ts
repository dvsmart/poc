import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss']
})
export class FormLayoutComponent implements OnInit {
  formLayoutList: any[];
  constructor() { }

  ngOnInit() {
    this.formLayoutList = [{}];
  }

  formFields:any[] = [];
  currentField:{};

  drop(event: CdkDragDrop<string[]>) {
    if (event.container.id === event.previousContainer.id) {
      // move inside same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.buildField(event.item.data);

    }
  }

  buildField(type:any) {

    this.formFields.push(type)
  }
}
