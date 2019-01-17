import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, copyArrayItem } from '@angular/cdk/drag-drop';
import { FieldTypeService } from './fieldType.service';

@Component({
  selector: 'app-field-types',
  templateUrl: './field-types.component.html',
  styleUrls: ['./field-types.component.scss']
})
export class FieldTypesComponent implements OnInit {
  fieldTypes: any = [];
  constructor(private fieldTypeService: FieldTypeService) { }

  ngOnInit() {
    this.fieldTypes = this.fieldTypeService.fieldTypes();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.container.id === event.previousContainer.id) {
      // move inside same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
}
