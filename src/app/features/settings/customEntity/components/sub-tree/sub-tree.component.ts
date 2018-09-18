import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';

import { fuseAnimations } from '@core/animations';
import { BehaviorSubject } from 'rxjs';
import { CustomentityService } from '../../service/customentity.service';
import { CustomTabModel } from '../../models/customEntity.model';

@Component({
  selector: 'tree-menu-sub',
  templateUrl: './sub-tree.component.html',
  styleUrls: ['./sub-tree.component.scss'],
  animations: fuseAnimations
})
export class SubTreeListComponent {

  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() depth: number;
  @Input() item: any;
  showTabs: boolean = false;

  @Output() notify = new EventEmitter<boolean>(false);

  selectedId: BehaviorSubject<number>;

  constructor(private adminservice: CustomentityService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
    this.selectedId = new BehaviorSubject(0);
  }

  expand() {
    this.showTabs = !this.showTabs;
  }

  onItemSelected(item: any) {
    debugger
    if (item.templateId) {
      this.selectedId.next(item.templateId);
    } else {
      this.selectedId.next(item.groupId);
    }
    this.expanded = !this.expanded;
  }

  addTab(id) {
    var customEntityId = this.selectedId.getValue();
    let tab = new CustomTabModel();
    tab.customEntityId = customEntityId;
    tab.caption = "new tab" + customEntityId;
    this.adminservice.createTab(tab).subscribe(x => {
      if(x.saveSuccessful){
        debugger;
        this.notify.emit(x.saveSuccessful);
      }
    });
  }

  getId() {
    return this.selectedId.asObservable();
  }

  ngOnInit() {
  }
}

