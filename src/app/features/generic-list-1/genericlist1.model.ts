export class GenericListConfig{

    sideFilterConfig: SideFilterConfig;
    contentConfig: ContentConfig;
}
export class SideFilterConfig{

   title: string;
   titleIcon: string;
   filterConfig: FilterConfig;
    
}
export class ContentConfig{
  
    searchBoxConfig: SearchBoxConfig;
    gridToolboxConfig: GridToolboxConfig;
}
export class GridToolboxConfig{

    title: string;
    show: boolean;
    gridToolboxItems:GridToolboxItemConfig[];   
}
export class GridToolboxItemConfig{

    title: string;
    routeUrl:string;   
}

export class SearchBoxConfig{

    title: string;
    show: boolean;
    routeUrl: string; 
    placeHolder:string;   
}
export class AddNewConfig{

    title: string;
    show: boolean;
    routeUrl: string;    
}

export class FilterConfig{
    title: string;
    show: boolean;
    filterItems: FilterItemConfig[];     
}

export class FilterItemConfig{
    title: string;
    routeUrl: string;         
}

export class GenericList1
{
    id: string;
    name: string;
    description: string;
    startDate: Date;
    dueDate: Date;
    dataId:string;
    status: string;
    priority:string;
    addedOn: Date;
    completed:boolean;
    deleted:boolean;
    starred:boolean;
    important:boolean;

    constructor(task)
    {
        {
            this.id = task.id;
            this.name = task.name;
            this.description = task.description;
            this.startDate = task.startDate;
            this.dueDate = task.dueDate;
            this.status = task.status;
            this.priority = task.priority;
            this.addedOn = task.addedOn;
        }
    }

    /**
     * Toggle star
     */
    toggleStar(): void
    {
        this.starred = !this.starred;
    }

    /**
     * Toggle important
     */
    toggleImportant(): void
    {
        this.important = !this.important;
    }

    /**
     * Toggle completed
     */
    toggleCompleted(): void
    {
        this.completed = !this.completed;
    }

    /**
     * Toggle deleted
     */
    toggleDeleted(): void
    {
        this.deleted = !this.deleted;
    }
}
