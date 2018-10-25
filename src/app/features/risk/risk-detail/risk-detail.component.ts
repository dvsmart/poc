import { Component, OnInit } from '@angular/core';
import { RiskService } from './risk.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-risk-detail',
  templateUrl: './risk-detail.component.html',
  styleUrls: ['./risk-detail.component.scss']
})
export class RiskDetailComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  riskDetail: any;
  constructor(private riskservice: RiskService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.riskservice.onRiskChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(risk => {
        this.riskDetail = risk;
      });
  }

}
