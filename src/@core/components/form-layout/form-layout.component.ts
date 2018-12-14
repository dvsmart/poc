import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
  animations:fuseAnimations,
  encapsulation:ViewEncapsulation.None
})
export class FormLayoutComponent implements OnInit {

  @Input() title: string;
  @Input() pageType: string;

  constructor() { }

  ngOnInit() {
  }

}
