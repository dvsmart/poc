import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { TasksService } from './tasks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { source, Column, Setting } from '@core/components/data-table/dataTableSource';
import { Router } from '@angular/router';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: fuseAnimations,
})
export class TasksComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  tableDataSource: source;
  tableSetting: Setting;


  constructor(private _tasksService: TasksService, private router: Router) {
    this._unsubscribeAll = new Subject();
  }



  columns: Column[] = [{ name: 'name', title: 'Name', type: 'string' }, { type: 'string', name: 'description', title: 'Description' }, { type: 'string', title: 'Status', name: 'status' },
  { title: 'Priority', name: 'priority', type: 'string' }, { type: 'bool', title: 'Is Completed', name: 'isCompleted' }, { type: 'date', title: 'Created On', name: 'createdOn', options: { dateFormat: 'medium' } },
  { title: 'Created By', name: 'addedBy', type: 'string' }];


  ngOnInit() {
    this._tasksService.tasks
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response) {
          this.tableDataSource = new source(response);
        }
      });
    this.tableSetting = {
      actions: [
        {
          archive: true,
          delete: true
        }
      ]
    };
  }

  onAddNewTask() {
    this.router.navigate(['tasks/new']);
  }

  rowClicked($event: any) {
    if ($event != undefined) {
      let id = $event[0].id;
      switch ($event[1]) {
        case 'edit':
          this.editTask(id);
          break;
        case 'remove':
          this.removeTask(id);
        default:
          break;
      }
    }
  }

  editTask(id: number) {
    this.router.navigate(['task/' + id]);
  }

  removeTask(id: number) {
    let response = this._tasksService.deleteTask(id);
  }

  archiveTask(id: number) {
    this._tasksService.deleteTask(id);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}