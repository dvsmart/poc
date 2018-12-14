interface task {
    id: number;
    reference?: any;
    description: string;
    status: string;
    priority: string;
    startDate: string;
    dueDate: string;
    isCompleted: boolean;
    createdBy: string;
    createdOn: string;
    modifiedBy?: any;
    modifiedOn: string;
    comments?: any;
}

export class taskDetail{
    id: number;    
    description: string;
    status: string;
    priority: string;
    startDate: Date;
    dueDate: Date;
    isCompleted: boolean;
    name: string;
    dataId:string;

    constructor(data?) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.status = data.status;
        this.startDate = data.startDate;
        this.dueDate = data.dueDate;
        this.isCompleted = data.isCompleted;
        this.priority = data.priority;
        this.dataId = data.dataId || 'TA' + data.id;
    }

}