# SimpleInstaFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


-----------------------




------------------------

2. Создадим модели для нашего приложения. У нас будет 3 модели: User, Post и Comment

3. Далее создадим сервисы, которые будут делать запросы на наш backend

Создаём папку src/app/service
Далее генерируем сервисы используя CLI

Сгенерим сервис для авторизации:
ng generate service service/auth --skip-tests

Затем остальные сервисы:
ng generate service service/comment --skip-tests
ng generate service service/image --skip-tests

Сервис нотификации:
ng generate service service/notification --skip-tests

Сервис который будет получать посты с сервера:
ng generate service service/post --skip-tests

Сервис который будет сохранять токен, получаемый от бэкенда
(сохранять будет в локальной памяти браузера):
ng generate service service/token-storage --skip-tests
После чего мы будем использовать Interceptor который будет каждый раз
подставлять этот токен с локальной памяти бруазера в http запрос

Юзер сервис:
ng generate service service/user --skip-tests

4. Далее создадим папку src/app/helper и в ней создадим сервисы:
   
ng generate service helper/auth-guard --skip-tests
ng generate service helper/auth-interceptor --skip-tests
ng generate service helper/error-interceptor --skip-tests

5. Добавляем Angular Material для стиля приложения

6. TokenStorage и Интерсепторы

Начнём заниматься авторизацией пользователя.

Нам понадобится сервис TokenStorageService
Сохранять токен будем в браузере

Затем приступим к AuthInterceptorService: это именно тот сервис, который каждый раз
будет подставлять токен в запросы.

Далее сервис с нотификациями: NotificationService

Далее сервис для загрузки картинок

Далее сервис для комментариев

Далее сервис авторизации и интерсептор ошибок

Последний сервис, который надо создать, это AuthGuardService

7. Компоненты

"Одним из ключевых элементов приложения являются компоненты. Компонент управляет 
отображением представления на экране."

Нужны 2 компонента: Регистрация и Логин
Создадим папку src/app/auth и в ней создадим наши 2 компонента:

ng generate component auth/register --skip-tests
ng generate component auth/login --skip-tests

Для проверки запустим сервер командой:
ng serve
и затем открываем в браузере http://localhost:4200/

Далее можем открыть
http://localhost:4200/register
http://localhost:4200/login

