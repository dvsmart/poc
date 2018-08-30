import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@core/animations';
import { TemplateService, CustomTemplate } from './checklistTemplate.service';
import { FormControl } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TemplateComponent implements OnInit {
  isEdit: boolean = false;
  isNew: boolean = false;
  searchInput: FormControl;
  recordId: number;
  templateId: number
  groupName: string;
  templateName:string;
  constructor(private route: ActivatedRoute, private _checklistservice: TemplateService, private router: Router) {
    this.searchInput = new FormControl('');
  }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        console.log(parseInt(x["id"]));
        this.templateId = parseInt(x["id"])
        this._checklistservice.customEntityId.next(this.templateId);
        this._checklistservice.getcevRecords(this.templateId, 1, 10);
        this._checklistservice.getTemplateInformation(this.templateId).subscribe(x=>{
          this.groupName = x.groupName;
          this.templateName = x.templateName;
        });
      }
    });
  }

  closeForm($event) {
    if (this.isNew) {
      this.isNew = !$event;
    }
    if (this.isEdit) {
      this.isEdit = !$event;
    }
  }

  addNew() {
    this.isEdit = false;
    this.isNew = true;
  }

  editRecord($event) {
    this.isNew = false;
    this.isEdit = true;
    this.recordId = $event;
  }
}