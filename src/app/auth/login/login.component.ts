import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  // Делаем инжекцию наших сервисов
  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private notificationService: NotificationService,
              private router: Router, // роутер будет переводить нас на другой url при успешной авторизации
              private fb: FormBuilder) { // для создания формы

    // Если есть пользователь, то перевести
    // его на главную страницу
    if (this.tokenStorage.getUser()) {
      console.log('Пользователь авторизирован. Перейти на главную страницу');
      this.router.navigate(['main']);
    } else {
      console.log('Пользователь не авторизирован');
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  // Метод для создания формы
  createLoginForm(): FormGroup {
    console.log('Create Login Form');
    return this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  // Этот метод будет отправлять данные на сервер
  submit(): void {
    console.log('Логинимся. Отправить данные на сервер');

    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(data => {
      console.log(data);

      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);

      this.notificationService.showSnackBar('Successfully logged in');
      this.router.navigate(['/']);
      window.location.reload();
    }, error => {
      console.log('  error: ' + error);
      this.notificationService.showSnackBar(error.message);
    });
  }
}
