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
  detail: any;
  constructor(private route: ActivatedRoute, private fieldDetailService: DetailService) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x.id != null) {
        this.detail = this.fieldDetailService.getField(x.id);
      }
    })
  }

}
