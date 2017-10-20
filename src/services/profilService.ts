import { Profil } from "../dtos/profil"
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class ProfilService {

    async getProfilForCurrentUser(id: number, http: Http) {
        let test = await this.daoRequest(http, id);
        let profil = new Profil(test[0]["USER_ID"], test[0]["LAST_NAME"], test[0]["FIRST_NAME"]);
        return profil;
    }

    daoRequest(http: Http, id: number): Promise<Array<Object>> {
        return http.get("http://localhost:3000/?query=select * from t_user where user_id=" + id).toPromise().then(response => response.json());
    }
}