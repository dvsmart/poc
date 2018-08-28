import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
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

  pageSize: number;
  total: number;
  currentPage: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() editRecord = new EventEmitter<number>()



  constructor(private _checklistservice: TemplateService) {
  }

  ngOnInit() {
    this.dataSource = new CustomEntityInstanceDataSource(this._checklistservice);
  }

  edit(row) {
    this.editRecord.emit(row.id);
  }

  pageEvent($event) {
    this.currentPage = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
  }
}
export class CustomEntityInstanceDataSource extends DataSource<any>
{
  constructor(private _customEntityGridService: TemplateService) { super(); }
  connect(): Observable<any[]> {
    return this._customEntityGridService.cevRecords;
  }
  disconnect(): void {
  }
}