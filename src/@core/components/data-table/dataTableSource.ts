import { MatTableDataSource } from "@angular/material";

interface TableSource {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
}

export class source implements TableSource{
    results: MatTableDataSource<any>;    
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;

    constructor(data?) {
        data  = data || {};
        this.results = data.results;
        this.currentPage = data.currentPage || 1;
        this.pageCount = data.pageCount || 0;
        this.pageSize = data.pageSize || 0;
        this.rowCount = data.rowCount || 0;
    }
}

export class Column{
    title: string;
    hidden?:boolean = false;
    name:string;
    type: string;
    options?: any;
    sticky?: string;
}
