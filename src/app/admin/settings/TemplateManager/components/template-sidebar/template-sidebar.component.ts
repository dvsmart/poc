import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { TemplateSetupService } from '../template-setup/templatesetup.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-template-sidebar',
  templateUrl: './template-sidebar.component.html',
  styleUrls: ['./template-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TemplateSidebarComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  templateId: number;
  constructor(private _templateService: TemplateSetupService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._templateService.onSelectedTemplateChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res:any)=>{
      if(res){
        this.templateId = res.id;
      }
    })
  }

}
