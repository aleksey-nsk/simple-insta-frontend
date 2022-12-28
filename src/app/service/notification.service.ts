import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

// Сервис с нотификациями будет показывать нам сообщения:
// когда мы успешно зашли, создали пост, и т.п.
//
// Воспользуемся функционалом Angular Material -> Snackbar

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) {
  }

  // Показать нотификацию
  public showSnackBar(message: string): void {
    this.snackbar.open(message, null, {
      duration: 2000 // нотификация будет отображаться 5 секунд
    });
  }
}
