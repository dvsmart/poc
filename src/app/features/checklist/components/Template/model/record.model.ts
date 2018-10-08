export class CustomEntityValue{
    id: number;
    dataId:string;
    dueDate?:Date | null;
    status:string;
}

export class CustomTemplate {
    groupName: string;
    templateName: string;
    id: number;
    groupId: number;

    constructor(data?) {
        data = data || {},
        this.id = data.id;
        this.groupName = data.groupName;
        this.templateName = data.templateName;
        this.groupId = data.groupId;
    }
}

export class SaveResponse {
    errorMessage: string;
    recordId: number;
    saveSuccessful: boolean;
    savedDataId: string;
    savedEntityId: number;
}