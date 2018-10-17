export class Tab{
    id:number;
    caption: string;

    constructor(data) {
        {
            this.id = data.id;
            this.caption = data.caption;
        }
    }
}