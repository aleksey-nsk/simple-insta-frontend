// Создадим модели для нашего приложения.
// У нас будет 3 модели: User, Post и Comment

export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  bio: string;
}
