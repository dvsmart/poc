import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChecklistService } from '../../services/checklist.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  title: string;

  private _unsubscribeAll: Subject<any>;
  categories: any[];
  constructor(private route: ActivatedRoute, private _checklistservice: ChecklistService) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        this.title = x["id"] + ' Category';
      }
    });

    this._checklistservice.onCategories
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(result => {
        this.categories = result;
      });
  }

}
