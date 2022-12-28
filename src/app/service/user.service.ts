import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const USER_API = 'http://localhost:8082/api/v1/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  // Получить юзера по id
  getUserById(id: number): Observable<any> {
    const url = USER_API + id;
    console.log(url);
    return this.http.get(url);
  }

  // Вернуть текущего авторизированного юзера
  getCurrentUser(): Observable<any> {
    const url = USER_API;
    console.log(url);
    return this.http.get(url);
  }

  // Обновить юзера
  updateUser(user: any): Observable<any> {
    console.log(user);
    const url = USER_API + 'update';
    console.log(url);
    return this.http.post(url, user);
  }
}
