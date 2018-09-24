import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@core/animations';
import { TemplateListService } from './templateList.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  animations: fuseAnimations
})
export class TemplateListComponent implements OnInit {
  templateList: any;
  private _unsubscribeAll: Subject<any>;
  constructor(private route: ActivatedRoute, private _checklistTemplateservice: TemplateListService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._checklistTemplateservice.onTemplatesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.templateList = x
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
