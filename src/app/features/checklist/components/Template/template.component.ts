import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@core/animations';
import { TemplateService } from './checklistTemplate.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  animations: fuseAnimations
})
export class TemplateComponent implements OnInit {
  isEdit: boolean = false;
  isNew: boolean = false;
 
  recordId: number;
  templateId: number
  constructor(private route: ActivatedRoute, private _checklistservice: TemplateService,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        console.log(parseInt(x["id"]));
        this.templateId = parseInt(x["id"])
        this._checklistservice.customEntityId.next(this.templateId);
        this._checklistservice.getcevRecords(this.templateId);
      }
    });
  }

  addNew(){
    this.isEdit = false;
    this.isNew = true;
  }

  editRecord($event){
    this.isNew = false;
    this.isEdit = true;
    this.recordId = $event;
  }
}