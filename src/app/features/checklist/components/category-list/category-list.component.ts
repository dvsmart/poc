import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { CategoryListService } from './category.service';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { fuseAnimations } from '@core/animations';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: fuseAnimations
})
export class CategoryListComponent implements OnInit {

  title: string;

  private _unsubscribeAll: Subject<any>;
  categories: Observable<any[]>;
  constructor(private route: ActivatedRoute, private _checklistservice: CategoryListService) {
    this._unsubscribeAll = new Subject();
   }

  ngOnInit() {
    this._checklistservice.onCategories
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.categories = x
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
