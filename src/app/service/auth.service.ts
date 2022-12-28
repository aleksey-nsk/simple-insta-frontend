import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8082/api/v1/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  // Зарегистрироваться
  public register(user): Observable<any> {
    console.log('Register');
    console.log(user);

    const url = AUTH_API + 'signup';
    console.log(url);

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
    console.log('Login');
    console.log(user);

    const url = AUTH_API + 'signin';
    console.log(url);

    return this.http.post(url, {
      username: user.username,
      password: user.password
    });
  }
}
