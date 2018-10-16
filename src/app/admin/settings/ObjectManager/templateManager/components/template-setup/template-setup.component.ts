import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
import { fuseAnimations } from '@core/animations';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TemplateSetupService } from './templatesetup.service';

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
  constructor(private _fuseSidebarService: FuseSidebarService,private templateService: TemplateSetupService) {
    this.searchInput = new FormControl('');

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templateService.ontemplateChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(response => {
      this.templateName = response;
    });
    this.templateService.ontemplateIdChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(response => {
      this.templateId = response;
    });

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
}
