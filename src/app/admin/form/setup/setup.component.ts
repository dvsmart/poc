import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  animations: fuseAnimations
})
export class SetupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
