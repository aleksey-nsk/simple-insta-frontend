import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {TokenStorageService} from '../../service/token-storage.service';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;   // флаг залогинился ли юзер
  isDataLoaded = false; // флаг загрузились ли данные
  user: User;           // юзер

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('NavigationComponent -> method ngOnInit()');

    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe(data => {
        console.log(data);
        this.user = data;
        this.isDataLoaded = true;
      });
    }
  }

  logout(): void {
    console.log('NavigationComponent -> method logout()');
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }
}
