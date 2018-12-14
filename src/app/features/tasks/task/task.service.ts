import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
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

  saveTask(createTaskRequestModel: any){
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'Tasks/', createTaskRequestModel)
        .subscribe((response: any) => {
          this.onTaskChanged.next(response);
          resolve(response);
        }, reject);
    });
  }
}
