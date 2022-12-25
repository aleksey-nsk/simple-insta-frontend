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

  // Добавить комментарий посту
  addCommentToPost(postId: number, message: string): Observable<any> {
    console.log('Method addCommentToPost(), message: ' + message);
    const url = COMMENT_API + postId + '/create';
    console.log('  url: ' + url);

    return this.http.post(url, {
      message
    });
  }

  // Получить все комментарии к посту
  getCommentsToPost(postId: number): Observable<any> {
    console.log('Method getCommentsToPost()');
    const url = COMMENT_API + postId + '/all';
    console.log('  url: ' + url);

    return this.http.get(url);
  }

  // Удалить комментарий
  deleteComment(commentId: number): Observable<any> {
    console.log('Method deleteComment()');
    const url = COMMENT_API + commentId + '/delete';
    console.log('  url: ' + url);

    return this.http.post(url, null);
  }
}
