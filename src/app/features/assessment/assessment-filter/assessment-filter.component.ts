import { Component, OnInit } from '@angular/core';
import { takeUntil } from '../../../../../node_modules/rxjs/operators';
import { Subject } from '../../../../../node_modules/rxjs';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-assessment-filter',
  templateUrl: './assessment-filter.component.html',
  styleUrls: ['./assessment-filter.component.scss']
})
export class AssessmentFilterComponent implements OnInit {
  filterBy: string;
    
  private _unsubscribeAll: Subject<any>;
  constructor(private _assessmentservice: AssessmentService)
  {
      this._unsubscribeAll = new Subject();
  }
  ngOnInit(): void {
      this.filterBy = this._assessmentservice.filterBy || 'all';

      this._assessmentservice.onAssessmentsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(assessment => {
              console.log(assessment);
          });
  }

  ngOnDestroy()
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  changeFilter(filter): void
  {
      this.filterBy = filter;
      this._assessmentservice.onFilterChanged.next(this.filterBy);
  }

}
