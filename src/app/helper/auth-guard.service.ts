import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../service/token-storage.service';

// Сервис который будет проверять: имеются ли права у нашего пользователя
// зайти на тот или иной url

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private tokenService: TokenStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Method canActivate()');
    const currentUser = this.tokenService.getUser();
    console.log('  currentUser: ' + currentUser);

    if (currentUser) { // если текущий юзер присутствует, вернуть true
      return true;
    } else { // если нет, то перенести юзера на страницу login
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
