import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { LayoutService } from './layout.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss']
})
export class FormLayoutComponent {
  formFields: any[];
  type: any;
  showSpec: boolean;
  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.formFields = [];
    this.showSpec = false;
  }

  drop(event: CdkDragDrop<string[]>) {
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
    this.layoutService.getFieldTypes(type.data.id);
    this.showSpec = true;
    this.type = type.data;
  }

}
