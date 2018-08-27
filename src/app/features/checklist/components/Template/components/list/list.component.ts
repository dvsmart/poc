import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { fuseAnimations } from '@core/animations';
import { TemplateService } from '../../checklistTemplate.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['dataId', 'status', 'dueDate', 'addedOn'];
  dataSource: CustomEntityInstanceDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  templateId: string;

  constructor(private route: ActivatedRoute, private _checklistservice: TemplateService, private router: Router) {
  }

  ngOnInit() {
    this.dataSource = new CustomEntityInstanceDataSource(this._checklistservice);
    this.route.data.subscribe(x => {
      this.templateId = x["param"]
    });
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        const id = parseInt(x["id"]);
        this.templateId = this.templateId + id;
      }
    });
  }
  edit(row) {
    this.router.navigate([this.templateId + '/edit/', row.id])
  }
}

export class CustomEntityInstanceDataSource extends DataSource<any>
{
  constructor(private _customEntityGridService: TemplateService) { super(); }
  connect(): Observable<any[]> {
    return this._customEntityGridService.onInstancesChanged;
  }
  disconnect(): void {
  }
}