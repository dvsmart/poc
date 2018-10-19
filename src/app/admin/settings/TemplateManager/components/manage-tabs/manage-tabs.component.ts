import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TabService } from '../tab-list/tabs.service';
import { TemplateSetupService } from '../template-setup/templatesetup.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TemplateResponse, TabResponse } from '../../models/template.model';
import { fuseAnimations } from '@core/animations';


@Component({
  selector: 'app-manage-tabs',
  templateUrl: './manage-tabs.component.html',
  styleUrls: ['./manage-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ManageTabsComponent implements OnInit {
  templateId: number;
  private _unsubscribeAll: Subject<any>;
  currentTodo: TabResponse;
  constructor(private _tabservice: TabService, private templateService: TemplateSetupService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templateService.onSelectedTemplateChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: TemplateResponse) => {
        this.templateId = res.id;
      })
    this._tabservice.onCurrentTabChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(([currentTodo, formType]) => {
        if (!currentTodo) {
          this.currentTodo = null;
        }
        else {
          this.currentTodo = currentTodo;
        }
      });
  }

  deselectCurrentTodo(): void
    {
        this._tabservice.onCurrentTabChanged.next([null, null]);
    }

  AddTab() {
    this._tabservice.onNewTabClicked.next(this.templateId);
  }

}
