import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'app-template-sidebar',
  templateUrl: './template-sidebar.component.html',
  styleUrls: ['./template-sidebar.component.scss'],
  animations: fuseAnimations
})
export class TemplateSidebarComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
