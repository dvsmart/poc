import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
import { fuseAnimations } from '@core/animations';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TemplateSetupService } from './templatesetup.service';
import { TemplateResponse } from '../../models/template.model';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-setup',
  templateUrl: './template-setup.component.html',
  styleUrls: ['./template-setup.component.scss'],
  animations: fuseAnimations
})
export class TemplateSetupComponent implements OnInit {
  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  templateName:string;
  templateId:number;

  isNew: boolean = false;

  constructor(private _fuseSidebarService: FuseSidebarService,private templateService: TemplateSetupService,private route:ActivatedRoute) {
    this.searchInput = new FormControl('');
    
    this._unsubscribeAll = new Subject();
    
    
  }

  ngOnInit() {
    var param = this.route.snapshot.paramMap.get('id');
    this.isNew = param === 'new' ? true : false;
  
    this.templateService.onSelectedTemplateChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res:TemplateResponse)=>{
      if(res){
        this.templateName = res.templateName;
        this.templateId  = res.id
        this.isNew = false;
      }
    })

    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        console.log(searchText);
      });
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
