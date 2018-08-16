import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AssessmentService } from './assessment.service';
import { fuseAnimations } from '@core/animations';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
import { takeUntil, debounceTime, distinctUntilChanged } from '../../../../node_modules/rxjs/operators';


@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AssessmentComponent implements OnInit {
  searchInput: FormControl;
  hasSelectedAssessments: boolean;
  private _unsubscribeAll: Subject<any>;

  constructor(private _fuseSidebarService: FuseSidebarService, private _assessmentservice: AssessmentService) {
    this.searchInput = new FormControl('');
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._assessmentservice.onSelectedAssessmentsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedAssessments => {
        this.hasSelectedAssessments = selectedAssessments.length > 0;
      });

    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this._assessmentservice.onSearchTextChanged.next(searchText);
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
