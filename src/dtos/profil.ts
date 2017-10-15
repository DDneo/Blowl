export class Profil {
    name : string;
    firstName : string;
    id : number;

    constructor (id : number,name:string,firstName : string){
        this.id=id;
        this.name=name;
        this.firstName=firstName;
    }
}