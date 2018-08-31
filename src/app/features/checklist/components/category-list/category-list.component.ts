import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { CategoryListService } from './category.service';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { fuseAnimations } from '@core/animations';

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
  constructor(private route: ActivatedRoute, private _checklistservice: CategoryListService) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        this.title = x["id"] + ' Category';
      }
    });

    this.categories = this._checklistservice.onCategories;
  }

}
