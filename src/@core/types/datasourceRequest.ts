import { environment } from "@env/environment";

export class DataSourceRequest{
    url:string
    page?: number | 0;
    pageSize?: number | 0;
    filter:string;
    sort:number | 0;

    /**
     *
     */
    constructor(url,index,size) {
        this.url = environment.apiUrl + url;
        this.page = index;
        this.pageSize = size;
    }
}