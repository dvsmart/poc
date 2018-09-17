import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@core/animations';
import { TemplateService } from './checklistTemplate.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TemplateComponent implements OnInit {
  edit: boolean;

  searchInput: FormControl;
  recordId: number;
  templateId: number
  groupName: string;
  templateName: string;
  constructor(private route: ActivatedRoute, private _checklistservice: TemplateService, private router: Router) {
    this.searchInput = new FormControl('');
  }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        this.templateId = parseInt(x["id"])
        this._checklistservice.customEntityId.next(this.templateId);
        this._checklistservice.getTemplateInformation(this.templateId).subscribe(x => {
          this.groupName = x.groupName;
          this.templateName = x.templateName;
        });
      }
    });
  }

  closeForm($event) {
    if (this.edit) {
      this.edit = !$event;
    }
  }

  addNew() {
    this.edit = true;
    this.recordId = null;
  }

  editRecord($event) {
    if(this.edit){
      this.edit = this.edit;
    }else{
      this.edit = !this.edit;
    }
    this.recordId = $event;
  }
}