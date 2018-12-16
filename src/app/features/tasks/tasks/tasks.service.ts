import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  routeParams: any;
  tasks: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.tasks = new BehaviorSubject<any>(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getTasks(1, 10)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  private async getTasks(index: number, pageSize: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'Tasks?page=' + index + '&pageSize=' + pageSize)
        .subscribe((response: any) => {
          this.tasks.next(response);
          resolve(response);
        }, reject);
    });
  }

  deleteTask(id: any) {
    this._httpClient.delete(environment.apiUrl + 'Tasks/' + id).subscribe(x => {
      this.getTasks(1, 10);
    });
  }
}
