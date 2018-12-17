import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskId: any;
  onTaskChanged: BehaviorSubject<any>;
  constructor(
    private _httpClient: HttpClient
  ) {
    this.onTaskChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.taskId = route.params.id;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getTaskDetail()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getTaskDetail(): Promise<any> {
    if (this.taskId != 'new') {
      return new Promise((resolve, reject) => {
        this._httpClient.get<any>(environment.apiUrl + 'Tasks/' + this.taskId)
          .subscribe((response: any) => {
            this.onTaskChanged.next(response);
            resolve(response);
          }, reject);
      });
    } else {
      this.onTaskChanged.next('');
    }
  }

  getTaskReferences() {
    let statuses = this._httpClient.get(environment.apiUrl + 'Tasks/Statuses');
    let priorities = this._httpClient.get(environment.apiUrl + 'Tasks/Priorities');
    return forkJoin(statuses, priorities);
  }

  saveTask(createTaskRequestModel: any) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'Tasks/', createTaskRequestModel)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  updateTask(createTaskRequestModel: any) {
    return new Promise((resolve, reject) => {
      this._httpClient.put(environment.apiUrl + 'Tasks/' + createTaskRequestModel.id, createTaskRequestModel)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  
}
