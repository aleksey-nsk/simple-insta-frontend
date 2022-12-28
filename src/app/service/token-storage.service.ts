import {Injectable} from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  // Сохранить токен
  public saveToken(token: string): void {
    console.log('Save Token: ' + token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return token;
  }

  // Сохранить юзера
  public saveUser(user): void {
    console.log('Save User');
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Взять юзера
  public getUser(): any {
    const user = JSON.parse(sessionStorage.getItem(USER_KEY));
    console.log(user);
    return user;
  }

  // Чтобы сделать log out надо очистить сессию
  public logOut(): void {
    console.log('Log Out');
    window.sessionStorage.clear();
    window.location.reload();
  }
}
