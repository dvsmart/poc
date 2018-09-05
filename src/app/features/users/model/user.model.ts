export class User{
    username: string;
    firstname:string;
    lastname:string;
    emailAddress:string;
    address:string;
    roletype:string;
    city:string;
    id: number;
    active: boolean;
    roleId?:number;
    dob?: Date;

    /**
     *
     */
    constructor(user?) {
        user = user || {},
        this.id = user.id;
        this.firstname = user.firstName;
        this.lastname = user.lastName;
        this.username = user.userName;
        this.address = user.address;
        this.emailAddress = user.emailAddress;
        this.city = user.city;
        this.active = user.active = true;
        this.dob = user.dateofBirth;
    }
}