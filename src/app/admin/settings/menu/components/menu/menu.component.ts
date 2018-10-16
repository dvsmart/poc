import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItemModel } from '../../model/menu.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MenuService } from './menu.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MenuComponent implements OnInit {
  menuItem: MenuItemModel;
  pageType: string;
  menuForm: FormGroup;
  menuGroups: any;
  parentMenuItems: any;
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _menuservice: MenuService,
    private _location: Location
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._menuservice.onMenuItemChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(item => {
        if (item) {
          this.menuItem = new MenuItemModel(item);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.menuItem = new MenuItemModel();
        }
        this.menuForm = this.createMenuForm();
      });

    this._menuservice.menuGroupChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(groups => {
        this.menuGroups = groups;
      })
    this._menuservice.menuParentChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(parentMenuItems => {
        this.parentMenuItems = parentMenuItems;
      })
  }

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.value === f2.value;
  }

  createMenuForm(): FormGroup {
    return this._formBuilder.group({
      caption: [this.menuItem.caption],
      route: [this.menuItem.route],
      hasChildren: [this.menuItem.hasChildren],
      iconName: [this.menuItem.iconName],
      isVisible: [this.menuItem.isVisible],
      sortOrder: [this.menuItem.sortOrder],
      menuGroupId: [this.menuItem.menuGroupId],
      parentId: [this.menuItem.parentId],
      id: [this.menuItem.id]
    });
  }



  addMenu() {
    const data = this.menuForm.getRawValue();
    this._menuservice.addMenu(data)
      .then(x => {
        if (x != null) {
          this._menuservice.onMenuItemChanged.next(x);
          this._matSnackBar.open('Menu added', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
          this._location.go('/settings/menuManagement/menu/' + x.id);
        }
      });
  }

  updateMenu() {
    const data = this.menuForm.getRawValue();
    this._menuservice.updateMenu(data)
      .then(x => {
        if (x != null) {
          this._menuservice.onMenuItemChanged.next(x);
          this._matSnackBar.open('Menu Updated', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
          this._location.go('/settings/menuManagement/menu/' + x.id);
        }
      });
  }
}
