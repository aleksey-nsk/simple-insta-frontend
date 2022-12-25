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

  // Брать юзера по id
  getUserById(id: number): Observable<any> {
    console.log('Method getUserById()');
    const url = USER_API + id;
    console.log('  url: ' + url);
    return this.http.get(url);
  }

  // Вернуть текущего авторизированного юзера
  getCurrentUser(): Observable<any> {
    console.log('Method getCurrentUser()');
    const url = USER_API;
    console.log('  url: ' + url);
    return this.http.get(url);
  }

  // Обновить юзера
  updateUser(user: any): Observable<any> {
    console.log('Method updateUser()');
    console.log('  user: ' + user);
    const url = USER_API + 'update';
    console.log('  url: ' + url);
    return this.http.post(url, user);
  }
}
