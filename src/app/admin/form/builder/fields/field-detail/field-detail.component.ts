import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from './detail.service';
import { FieldDetail } from '../field';

@Component({
  selector: 'app-field-detail',
  templateUrl: './field-detail.component.html',
  styleUrls: ['./field-detail.component.scss']
})
export class FieldDetailComponent implements OnInit {
  detail: FieldDetail;
  constructor(private route: ActivatedRoute, private fieldDetailService: DetailService) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x.id != null) {
        this.fieldDetailService.getField(x.id)
          .subscribe(detail => {
            this.detail = detail;
          });
      }
    })
  }

}
