import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8082/api/v1/auth/';

// Сервис который будет авторизировать пользователя

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  // Зарегистрироваться
  public register(user): Observable<any> {
    console.log('Method register(), user: ' + user);
    const url = AUTH_API + 'signup';
    console.log('  url: ' + url);

    return this.http.post(url, {
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }

  // Залогиниться
  public login(user): Observable<any> {
    console.log('Method login(), user: ' + user);
    const url = AUTH_API + 'signin';
    console.log('  url: ' + url);

    return this.http.post(url, {
      username: user.username,
      password: user.password
    });
  }
}
