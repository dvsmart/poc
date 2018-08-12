import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from '../../../../node_modules/rxjs';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../../node_modules/@angular/router';
import { environment } from 'environments/environment';
import { FuseUtils } from '@core/utils';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  onTasksChanged: BehaviorSubject<any>;
  onSelectedTasksChanged: BehaviorSubject<any>;
  onSearchTextChanged: Subject<any>;
  onFilterChanged: Subject<any>;
  dataLength: BehaviorSubject<number>;
  onCurrentTaskChanged: BehaviorSubject<any>;

  apiResponse: any;
  tasks: any[];
  selectedTasks: string[] = [];
  searchText: string;
  filterBy: string;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
      private _httpClient: HttpClient
  ) {
      // Set the defaults
      this.onTasksChanged = new BehaviorSubject([]);
      this.onSelectedTasksChanged = new BehaviorSubject([]);
      this.onSearchTextChanged = new Subject();
      this.onFilterChanged = new Subject();
      this.dataLength = new BehaviorSubject(0);
      this.onCurrentTaskChanged = new BehaviorSubject([]);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
      return new Promise((resolve, reject) => {

          Promise.all([
              this.gettasks(),
          ]).then(
              ([files]) => {

                  this.onSearchTextChanged.subscribe(searchText => {
                      this.searchText = searchText;
                      this.gettasks();
                  });

                  this.onFilterChanged.subscribe(filter => {
                      this.filterBy = filter;
                      this.gettasks();
                  });

                  resolve();

              },
              reject
          );
      });
  }

  /**
   * Get contacts
   *
   * @returns {Promise<any>}
   */
  gettasks(page?: number, size?: number): Promise<any> {
      return new Promise((resolve, reject) => {
          page = page === undefined ? 1 : page;
          size = size === undefined ? 10 : size;
          this._httpClient.get(environment.apiUrl + 'Task/TaskForGrid?page=' + page + '&pageSize=' + size)
              .subscribe((response: any) => {
                  this.apiResponse = response;
                  this.dataLength = response.totalCount;
                  if (this.searchText && this.searchText !== '') {
                      this.tasks = FuseUtils.filterArrayByString(this.apiResponse.data, this.searchText);
                  }
                  this.onTasksChanged.next(this.apiResponse.data);
                  resolve(this.tasks);
              }, reject);
      }
      );
  }

  /**
   * Toggle selected contact by id
   *
   * @param id
   */
  toggleSelectedTask(id): void {
      // First, check if we already have that contact as selected...
      if (this.selectedTasks.length > 0) {
          const index = this.selectedTasks.indexOf(id);

          if (index !== -1) {
              this.selectedTasks.splice(index, 1);

              // Trigger the next event
              this.onSelectedTasksChanged.next(this.selectedTasks);

              // Return
              return;
          }
      }

      // If we don't have it, push as selected
      this.selectedTasks.push(id);

      // Trigger the next event
      this.onSelectedTasksChanged.next(this.selectedTasks);
  }

  /**
   * Toggle select all
   */
  toggleSelectAll(): void {
      if (this.selectedTasks.length > 0) {
          this.deselectTasks();
      }
      else {
          this.selectTasks();
      }
  }

  /**
   * Select contacts
   *
   * @param filterParameter
   * @param filterValue
   */
  selectTasks(filterParameter?, filterValue?): void {

      this.selectedTasks = [];

      // If there is no filter, select all contacts
      if (filterParameter === undefined || filterValue === undefined) {
          this.selectedTasks = [];
          this.tasks.map(property => {
              this.selectedTasks.push(property.id.toString());
          });
      }

      // Trigger the next event
      this.onSelectedTasksChanged.next(this.selectedTasks);
  }

  /**
   * Update contact
   *
   * @param contact
   * @returns {Promise<any>}
   */
  updateTask(contact): Promise<any> {
      return new Promise((resolve, reject) => {

          this._httpClient.post('api/contacts-contacts/' + contact.id, { ...contact })
              .subscribe(response => {
                  this.gettasks();
                  resolve(response);
              });
      });
  }

  /**
   * Update user data
   *
   * @param userData
   * @returns {Promise<any>}
   */
  // updateUserData(userData): Promise<any>
  // {
  //     return new Promise((resolve, reject) => {
  //         this._httpClient.post('api/contacts-user/' + this.user.id, {...userData})
  //             .subscribe(response => {
  //                 this.gettasks();
  //                 resolve(response);
  //             });
  //     });
  // }

  /**
   * Deselect contacts
   */
  deselectTasks(): void {
      this.selectedTasks = [];

      // Trigger the next event
      this.onSelectedTasksChanged.next(this.selectedTasks);
  }

  /**
   * Delete contact
   *
   * @param contact
   */
  deleteTasks(contact): void {
      const contactIndex = this.tasks.indexOf(contact);
      this.tasks.splice(contactIndex, 1);
      this.onTasksChanged.next(this.tasks);
  }

  /**
   * Delete selected contacts
   */
  deleteselectedTasks(): void {
      for (const propertyId of this.selectedTasks) {
          const contact = this.tasks.find(_property => {
              return _property.id.toString() === propertyId;
          });
          const contactIndex = this.tasks.indexOf(contact);
          this.tasks.splice(contactIndex, 1);
      }
      this.onTasksChanged.next(this.tasks);
      this.deselectTasks();
  }

}
