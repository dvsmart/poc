import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChecklistService } from '../../services/checklist.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  title: string;

  private _unsubscribeAll: Subject<any>;
  categories: Observable<any[]>;
  constructor(private route: ActivatedRoute, private _checklistservice: ChecklistService) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        this.title = x["id"] + ' Category';
      }
    });

    this.categories = this._checklistservice.onCategories;
  }

}
