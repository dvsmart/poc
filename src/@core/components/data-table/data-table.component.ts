import { Component, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataTableService } from './data-table.service';
import { fuseAnimations } from '../../animations';


@Component({
    selector: 'data-table',
    styleUrls: ['./data-table.component.scss'],
    templateUrl: './data-table.component.html',
    animations: fuseAnimations
})
export class DataTableComponent {
    @Input() path: string = "test-local";
    @Input() displayedColumns: any[] = [];
    dataSource: MyDataSource;
    dataSubject = new BehaviorSubject<any[]>([]);
    constructor(private apiService: DataTableService) { }

    ngOnInit() {
        this.dataSource = new MyDataSource(this.dataSubject);
        this.apiService.getData(this.path).subscribe({
            next: value => this.dataSubject.next([value])
        });
    }
}
export class MyDataSource extends DataSource<any[]> {
    constructor(private subject: BehaviorSubject<any[]>) {
        super();
    }
    connect(): Observable<any[]> {
        return this.subject.asObservable();
    }
    disconnect(): void { }
}