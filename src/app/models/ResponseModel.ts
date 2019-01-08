export class ResponseModel {
    statusCode: number;
    message: string;
    constructor(code?: number, message?: string) {
        this.statusCode = code;
        this.message = message;
    }
}


export class PagedResult {
    results: any[];
    rowCount: number;
    currentPage: number;
    pageSize: number;
}