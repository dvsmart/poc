import { Component, ViewChild, ElementRef, HostBinding, Input } from '@angular/core';
import { CustomentityService } from '../../service/customentity.service';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { fuseAnimations } from '@core/animations';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'tree-menu',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss'],
  animations: fuseAnimations
})
export class TreeListComponent {
  entity: any;
  private _unsubscribeAll: Subject<any>;
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() depth: number;
  @Input() item: any;

  constructor(private ceService: CustomentityService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // this.ceService.getGroups().subscribe(x => {
    //   this.entity = x;
    //   console.log(this.entity);
    // });
    this.ceService.customGroups
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(groups => {
        debugger;
        this.entity = groups;
      });
  }

  refreshTree($event){
    debugger;
    if($event){
      this.ceService.getCustomGroups();
    }
  }
}
