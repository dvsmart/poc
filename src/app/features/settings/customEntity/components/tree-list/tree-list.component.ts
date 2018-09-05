import { Component, OnInit, Injectable } from '@angular/core';
import { CustomentityService, Entity, Group } from '../../service/customentity.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent {
  entity: any;
  expand: boolean;
  selectedgroupId:number;
  selectedtemplateId:number;
  selectedTabId: number;
  constructor(private ceService: CustomentityService) {

  }

  ngOnInit() {
    this.ceService.getGroups().subscribe(x=>{
      this.entity = x;
      console.log(this.entity);
    });
  }

  showTemplate(id){
    this.expand = !this.expand;
    this.selectedgroupId = id;
  }

  showTabs(id){
    this.expand = !this.expand;
    this.selectedtemplateId = id;
  }

  showfields(id){
    this.expand = !this.expand;
    this.selectedTabId = id;
  }
}
