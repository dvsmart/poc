import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'customobjectsidebar',
  templateUrl: './customobjectsidebar.component.html',
  styleUrls: ['./customobjectsidebar.component.scss'],
  animations: fuseAnimations
})
export class CustomobjectsidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
