export class User {
    id : number;
    login : string;
    password : string;
    mail : string;

    constructor (login : string, password : string){
        this.password=password;
        this.login=login;
    }
}