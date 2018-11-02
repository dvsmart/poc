import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../../node_modules/@angular/forms';
import { Subject } from '../../../../../node_modules/rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from '../../../../../node_modules/rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { GenericList1 } from '../genericlist1.model';
import { GenericList1Service } from '../genericlist1.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  animations : fuseAnimations
})
export class GenericDetailComponent implements OnInit {
  task: GenericList1;
  tags: any[];
  formType: string;
  taskForm: FormGroup;

  @ViewChild('titleInput')
  titleInputField;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _taskservice: GenericList1Service,
    private _formBuilder: FormBuilder
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to update the current todo
    this._taskservice.onCurrentTaskChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(([task, formType]) => {

        if (task && formType === 'edit') {
          this.formType = 'edit';
          this.task = task;
          this.taskForm = this.createTodoForm();

          this.taskForm.valueChanges
            .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(500),
              distinctUntilChanged()
            )
            .subscribe(data => {
              this._taskservice.updateTask(data);
            });
        }
      });

    // Subscribe to update on tag change
    // this._taskservice.on
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(labels => {
    //         this.tags = labels;
    //     });

    // Subscribe to update on tag change
    // this._taskservice.o
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(() => {
    //         this.todo = new Todo({});
    //         this.todo.id = FuseUtils.generateGUID();
    //         this.formType = 'new';
    //         this.todoForm = this.createTodoForm();
    //         this.focusTitleField();
    //         this._taskservice.onCurrentTodoChanged.next([this.todo, 'new']);
    //     });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Focus title field
   */
  focusTitleField(): void {
    setTimeout(() => {
      this.titleInputField.nativeElement.focus();
    });
  }

  /**
   * Create todo form
   *
   * @returns {FormGroup}
   */
  createTodoForm(): FormGroup {
    return this._formBuilder.group({
      'id': [this.task.id],
      'name': [this.task.name],
      'description': [this.task.description],
      'startDate': [this.task.startDate],
      'dueDate': [this.task.dueDate],
      'completed': [this.task.completed],
      'starred': [this.task.starred],
      'important': [this.task.important],
      'deleted': [this.task.deleted],
    });
  }

  /**
   * Toggle star
   *
   * @param event
   */
  toggleStar(event): void {
    event.stopPropagation();
    this.task.toggleStar();
    this._taskservice.updateTask(this.task);
  }

  /**
   * Toggle important
   *
   * @param event
   */
  toggleImportant(event): void {
    event.stopPropagation();
    this.task.toggleImportant();
    this._taskservice.updateTask(this.task);
  }

  /**
   * Toggle Completed
   *
   * @param event
   */
  toggleCompleted(event): void {
    event.stopPropagation();
    this.task.toggleCompleted();
    this._taskservice.updateTask(this.task);
  }

  /**
   * Toggle Deleted
   *
   * @param event
   */
  toggleDeleted(event): void {
    event.stopPropagation();
    this.task.toggleDeleted();
    this._taskservice.updateTask(this.task);
  }

  /**
   * Toggle tag on todo
   *
   * @param tagId
   */
  toggleTagOnTodo(tagId): void {
    //this._taskservice.to(tagId, this.todo);
  }

  /**
   * Has tag?
   *
   * @param tagId
   * @returns {any}
   */
  hasTag(tagId): any {
    return tagId;//this._taskservice.hasTag(tagId, this.todo);
  }

  /**
   * Add todo
   */
  addTask(): void {
    this._taskservice.updateTask(this.taskForm.getRawValue());
  }
}
