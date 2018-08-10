import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '../../../../@core/components/sidebar/sidebar.service';
import { FuseConfigService } from '@core/services/config.service';


@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  selectedLanguage: any;
  languages: any;

  constructor(private _fuseSidebarService: FuseSidebarService, private _fuseConfigService: FuseConfigService) {
    this._unsubscribeAll = new Subject();
    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      },
      {
        id: 'tr',
        title: 'Turkish',
        flag: 'tr'
      }
    ];
  }

  ngOnInit() {
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    this.selectedLanguage = _.find(this.languages, { 'id': 'en' });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }


  search(value): void {
    // Do your search here...
    console.log(value);
  }

  setLanguage(lang): void {
    // Set the selected language for the toolbar
    console.log(lang);
  }


}
