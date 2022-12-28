import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const IMAGE_API = 'http://localhost:8082/api/v1/image/';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  // Загрузить фото для пользователя
  uploadImageToUser(file: File): Observable<any> {
    const url = IMAGE_API + 'upload';
    console.log(url);

    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(url, uploadData);
  }

  // Загрузить фото для поста
  uploadImageToPost(file: File, postId: number): Observable<any> {
    const url = IMAGE_API + postId + '/upload';
    console.log(url);

    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(url, uploadData);
  }

  // Вернуть фото пользователя. Используем когда заходим в профиль
  getProfileImage(): Observable<any> {
    const url = IMAGE_API + 'profileImage';
    console.log(url);
    return this.http.get(url);
  }

  // Взять фотографию для поста
  getImageToPost(postId: number): any {
    const url = IMAGE_API + postId + '/image';
    return this.http.get(url);
  }
}
