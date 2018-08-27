import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@core/animations';
import { TemplateService } from './checklistTemplate.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  animations: fuseAnimations
})
export class TemplateComponent implements OnInit {

  title: string;
  constructor(private route: ActivatedRoute, private _checklistservice: TemplateService) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        this.title = x["id"] + ' List';
        const id = parseInt(x["id"]);
        
      }
    });
  }
}