import { Component, OnInit, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Subject } from '../../../../../../node_modules/rxjs';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { GenericList1Service } from '../../genericlist1.service';
import { GenericList1 } from '../../genericlist1.model';

@Component({
  selector: 'task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenericListItemComponent implements OnInit {
  tags: any[];

  @Input()
  task: GenericList1;

  @HostBinding('class.selected')
  selected: boolean;

  @HostBinding('class.completed')
  completed: boolean;

  @HostBinding('class.move-disabled')
  moveDisabled: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {taskService} _taskService
   * @param {ActivatedRoute} _activatedRoute
   */
  constructor(
      private _taskService: GenericList1Service,
      private _activatedRoute: ActivatedRoute
  )
  {
      // Disable move if path is not /all
      if ( _activatedRoute.snapshot.url[0].path !== 'all' )
      {
          this.moveDisabled = true;
      }

      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Set the initial values
      this.task = new GenericList1(this.task);
      this.completed = this.task.completed;

      // Subscribe to update on selected task change
      this._taskService.onSelectedTasksChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedtasks => {
              this.selected = false;

              if ( selectedtasks.length > 0 )
              {
                  for ( const task of selectedtasks )
                  {
                      if ( task.id === this.task.id )
                      {
                          this.selected = true;
                          break;
                      }
                  }
              }
          });

      // Subscribe to update on tag change
      // this._taskService.on
      //     .pipe(takeUntil(this._unsubscribeAll))
      //     .subscribe(tags => {
      //         this.tags = tags;
      //     });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On selected change
   */
  onSelectedChange(): void
  {
      this._taskService.toggleSelectedTask(this.task.id);
  }

  /**
   * Toggle star
   */
  toggleStar(event): void
  {
      event.stopPropagation();

      this.task.toggleStar();
      this._taskService.updateTask(this.task);
  }

  /**
   * Toggle Important
   */
  toggleImportant(event): void
  {
      event.stopPropagation();

      this.task.toggleImportant();
      this._taskService.updateTask(this.task);
  }

  /**
   * Toggle Completed
   */
  toggleCompleted(event): void
  {
      event.stopPropagation();

      this.task.toggleCompleted();
      this._taskService.updateTask(this.task);
  }

}
