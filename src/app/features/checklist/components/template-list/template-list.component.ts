import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChecklistService } from '../../services/checklist.service';
import { fuseAnimations } from '@core/animations';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { TemplateListService } from './templateList.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  animations: fuseAnimations
})
export class TemplateListComponent implements OnInit {
  templateList: Observable<any>;
  constructor(private route: ActivatedRoute, private _checklistTemplateservice: TemplateListService) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        const id = parseInt(x["id"]);
        this.templateList = this._checklistTemplateservice.getCustomEntityTemplates(id);
      }
    });

  }

}
