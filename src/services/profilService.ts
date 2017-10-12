import {Profil} from "../dtos/profil"

export class ProfilService {

    getProfilForCurrentUser(id : number){
        // wait DAO
        return new Profil(1,"toto","titi");
    }
}