import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { PropertiesService } from './properties.service';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
import { ToasterService } from '@core/components/toaster/toaster.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AssetComponent implements OnInit {
  searchInput: FormControl;
  hasSelectedProperties: boolean;
  close: boolean;
  private _unsubscribeAll: Subject<any>;
  constructor(private _fuseSidebarService: FuseSidebarService, private _propertyservice: PropertiesService, private toaster: ToasterService) {
    this.searchInput = new FormControl('');
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    //this.toaster.message.subscribe(x => { alert(x); });
    this._propertyservice.onSelectedPropertiesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedContacts => {
        this.hasSelectedProperties = selectedContacts.length > 0;
      });

    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this._propertyservice.onSearchTextChanged.next(searchText);
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
