export class User{
    username: string;
    firstname:string;
    lastname:string;
    email:string;
    addressLine1:string;
    addressLine2:string;
    postcode:string;
    phoneNumber:string;
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
        this.username = user.username;
        this.addressLine1 = user.addressLine1;
        this.addressLine2 = user.addressLine1;
        this.postcode = user.postCode;
        this.phoneNumber = user.phoneNumber == 0? "" : user.phoneNumber;
        this.email = user.email;
        this.city = user.city;
        this.active = user.active;
        this.dob = user.dateOfBirth;
        this.roleId = user.roleTypeId;
    }
}