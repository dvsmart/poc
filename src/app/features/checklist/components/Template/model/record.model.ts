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
}

export class SaveResponse {
    errorMessage: string;
    recordId: number;
    saveSuccessful: boolean;
    savedDataId: string;
    savedEntityId: number;
}