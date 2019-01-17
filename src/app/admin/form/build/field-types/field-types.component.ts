import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, copyArrayItem } from '@angular/cdk/drag-drop';
import { FieldTypeService } from './fieldType.service';
import { map, filter, toArray, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-field-types',
  templateUrl: './field-types.component.html',
  styleUrls: ['./field-types.component.scss'],
})
export class FieldTypesComponent implements OnInit {
  basicFieldTypes: any = [];
  advFieldTypes: any = [];
  private _unsubscribeAll: Subject<any>;
  constructor(private fieldTypeService: FieldTypeService) {
    this._unsubscribeAll = new Subject();
  }


  ngOnInit() {
    this.fieldTypeService.fieldTypes
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(types => {
        this.basicFieldTypes = types.filter(x => x.level == "Basic");
        this.advFieldTypes = types.filter(x => x.level == "Advanced");
      });
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
