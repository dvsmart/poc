import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { CustomentityService, Entity, Group } from '../../service/customentity.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent {
  entity: any;

  @ViewChild('templates') templates: ElementRef;

  @ViewChild('tabs') tabs: ElementRef;

  @ViewChild('tab') tab: ElementRef;

  constructor(private ceService: CustomentityService) {

  }

  ngOnInit() {
    this.ceService.getGroups().subscribe(x=>{
      this.entity = x;
      console.log(this.entity);
    });
  }

  showTemplate(){
    if(this.templates.nativeElement.style.display === 'block'){
      this.templates.nativeElement.style.display = 'none'
    }else{
      this.templates.nativeElement.style.display = 'block'
    }
  }

  showTab(){
    debugger;
    if(this.tabs.nativeElement.style.display === 'block'){
      this.tabs.nativeElement.style.display = 'none'
    }else{
      this.tabs.nativeElement.style.display = 'block'
    }
  }

  showTabs(){
    debugger;
    if(this.tab.nativeElement.style.display === 'block'){
      this.tab.nativeElement.style.display = 'none'
    }else{
      this.tab.nativeElement.style.display = 'block'
    }
  }


  // showTemplate(id){
  //   this.expand = !this.expand;
  //   this.selectedgroupId = id;
  // }

  // showTabs(id){
  //   this.expand = !this.expand;
  //   this.selectedtemplateId = id;
  // }

  // showfields(id){
  //   this.expand = !this.expand;
  //   this.selectedTabId = id;
  // }

  // showTab(id){
  //   this.selectedtemplateId = id;
  //   this.showTabLink = true;
  // }
}
