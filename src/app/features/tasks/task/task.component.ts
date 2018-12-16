import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { TaskService } from './task.service';
import { taskDetail } from './task';
import { FormGroup, FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@core/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: fuseAnimations
})
export class TaskComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  task: any;
  pageType: string;
  taskForm: FormGroup;
  statuses: {};
  priorities: {};

  constructor(private _taskService: TaskService, private _formBuilder: FormBuilder, private router: Router) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._taskService.onTaskChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(task => {

        if (task) {
          this.task = new taskDetail(task);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.task = new taskDetail();
        }

        this.taskForm = this.createTaskForm();
      });

    this._taskService.getTaskReferences().subscribe(x => {
      this.statuses = x[0];
      this.priorities = x[1];
    })
  }

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  compareByValue(f1: any, f2: any) {
    debugger;
    return f1 && f2 && f1.name === f2.name;
  }

  createTaskForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.task.id],
      name: [this.task.name],
      description: [this.task.description],
      status: [this.task.status],
      priority: [this.task.priority],
      startDate: [this.task.startDate],
      dueDate: [this.task.dueDate],
      isCompleted: [this.task.isCompleted],
    });
  }

  saveTask() {
    var task = this.taskForm.getRawValue();
    this._taskService.saveTask(task).then((x: any) => {
      this.router.navigate(['/task/' + x.id]);
    });
  }

  updateTask() {
    debugger;
    var task = this.taskForm.getRawValue();
    this._taskService.updateTask(task).then((x: any) => {
      this.router.navigate(['/task/' + x.id]);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
