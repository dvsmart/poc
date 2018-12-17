import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TaskService } from './task.service';
import { taskDetail } from './task';
import { FormGroup, FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@core/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


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

  constructor(private _taskService: TaskService, private _formBuilder: FormBuilder, private router: Router, private toaster: MatSnackBar) {
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
    var task = this.taskForm.value;
    this._taskService.saveTask(task).then((x: any) => {
      this.router.navigate(['/task/' + x.id]);
      this.toaster.open("Task created successfully", null, { duration: 4000 });
    });
  }

  updateTask() {
    var task = this.taskForm.value;
    this._taskService.updateTask(task).then((x: any) => {
      this.toaster.open("Task updated successfully", null, { duration: 4000 });
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
