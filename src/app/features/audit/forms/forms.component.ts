import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { FormsService } from './forms.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  animations: fuseAnimations
})
export class FormsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  categories: any[];
  forms: any[];
  filteredForms: any[];
  formsFilteredByCategory: any[];
  currentCategory: string;
  searchTerm: string;

  constructor(private formsservice: FormsService) {
    this._unsubscribeAll = new Subject();
    this.currentCategory = 'all';
    this.searchTerm = '';
  }

  ngOnInit() {
    this.formsservice.onCategoriesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(categories => {
        this.categories = categories;
      });

    this.formsservice.onFormsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(forms => {
        this.filteredForms = this.formsFilteredByCategory = this.forms = forms;
      });
  }

  filterFormsByTerm(): void {
    const searchTerm = this.searchTerm.toLowerCase();

    // Search
    if (searchTerm === '') {
      this.filteredForms = this.formsFilteredByCategory;
    }
    else {
      this.filteredForms = this.formsFilteredByCategory.filter((form) => {
        return form.name.toLowerCase().includes(searchTerm);
      });
    }
  }

  filterforms(): void {
    if (this.currentCategory === 'all') {
      this.formsFilteredByCategory = this.forms;
      this.filteredForms = this.forms;
    } else if (this.currentCategory === 'uncategorised') {
      this.formsFilteredByCategory = this.forms.filter((course) => {
        return course.categoryId === null;
      });
      this.filteredForms = [...this.formsFilteredByCategory];
    }
    else {
      this.formsFilteredByCategory = this.forms.filter((course) => {
        return course.categoryId === this.currentCategory;
      });
      this.filteredForms = [...this.formsFilteredByCategory];
    }
    this.filterFormsByTerm();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
