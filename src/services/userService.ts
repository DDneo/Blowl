import {User} from "../dtos/user"

export class UserService{

    logIntoApp(user : User){
        //if ok with DAO so return true
        return true;
    }

    createUser(user : User){
        //persit user into BDD
    }

    recoverPassword(user : User){
        //verifi if user exist
        //send mail with password
    }

    changePassword(password : string){
        // dao change password in db
    }
}