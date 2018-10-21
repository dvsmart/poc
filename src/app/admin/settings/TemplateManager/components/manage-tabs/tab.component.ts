import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TabService } from './tabs.service';
import { TemplateSetupService } from '../template-setup/templatesetup.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TemplateResponse } from '../../models/template.model';
import { fuseAnimations } from '@core/animations';
import { TabResponse } from './tab.model';


@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ManageTabsComponent implements OnInit {
  templateId: number;
  private _unsubscribeAll: Subject<any>;
  currentTab:TabResponse;
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
      .subscribe(([currentTab, formType]) => {
        if (!currentTab) {
          this.currentTab = null;
        }
        else {
          this.currentTab = currentTab;
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
