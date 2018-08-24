import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChecklistService } from '../../services/checklist.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {
  templates: Observable<any[]>;
  caption: Observable<string>;;
  constructor(private route: ActivatedRoute,private _checklistservice: ChecklistService) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        const id = parseInt(x["id"]);
        this._checklistservice.getCustomEntityTemplates(id);
        this._checklistservice.onTemplatesChanged.subscribe(x=>{
          this.templates = x.templates;
          this.caption = x.groupName;
        })
      }
    });
  }



}
