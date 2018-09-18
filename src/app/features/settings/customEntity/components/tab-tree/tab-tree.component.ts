import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'tab-tree',
  templateUrl: './tab-tree.component.html',
  styleUrls: ['./tab-tree.component.scss'],
  animations: fuseAnimations
})
export class TabTreeComponent implements OnInit {
  @Input() depth: number;
  @Input() item: any;


  constructor() { }

  ngOnInit() {
  }

}
