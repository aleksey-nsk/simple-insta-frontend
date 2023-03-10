import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const COMMENT_API = 'http://localhost:8082/api/v1/comment/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  // Добавить комментарий к посту
  addCommentToPost(postId: number, message: string): Observable<any> {
    console.log('Add Comment To Post');
    console.log(message);

    const url = COMMENT_API + postId + '/create';
    console.log(url);

    return this.http.post(url, {
      message
    });
  }

  // Получить все комментарии поста
  getCommentsToPost(postId: number): Observable<any> {
    const url = COMMENT_API + postId + '/all';
    return this.http.get(url);
  }

  // Удалить комментарий
  deleteComment(commentId: number): Observable<any> {
    const url = COMMENT_API + commentId + '/delete';
    console.log(url);
    return this.http.post(url, null);
  }
}
