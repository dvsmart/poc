import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  navLinks: any;
  constructor() { }

  ngOnInit() {
    this.navLinks = [];
    this.navLinks = [{
      label: 'General',
      path: 'general',
    },
    {
      label: 'User Access',
      path: 'useraccess',
    },
    {
      label: 'Actions',
      path: 'general',
    },
    {
      label: 'Security',
      path: 'general',
    },
    {
      label: 'Report',
      path: 'general',
    },]
  }

}
