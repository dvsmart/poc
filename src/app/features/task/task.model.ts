export class Task
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