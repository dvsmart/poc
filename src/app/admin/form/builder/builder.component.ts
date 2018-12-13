import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'form-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BuilderComponent implements OnInit {
  formTemplateName: string;
  private _unsubscribeAll: Subject<any>;
  constructor(private route: ActivatedRoute) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        if (x) {
          this.formTemplateName = x.slug;
        }
      });
  }
  
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
