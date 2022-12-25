import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';

const POST_API = 'http://localhost:8082/api/v1/post/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  // Создать пост
  createPost(post: Post): Observable<any> {
    console.log('Method createPost()');
    console.log('  post: ' + post);
    const url = POST_API + 'create';
    console.log('  url: ' + url);
    return this.http.post(url, post);
  }

  // Получим все посты, когда
  // будем заходить на главную страницу
  getAllPosts(): Observable<any> {
    console.log('Method getAllPosts()');
    const url = POST_API + 'all';
    console.log('  url: ' + url);
    return this.http.get(url);
  }

  // Вернуть посты текущего пользователя
  getPostsForCurrentUser(): Observable<any> {
    console.log('Method getPostsForCurrentUser()');
    const url = POST_API + 'user/posts';
    console.log('  url: ' + url);
    return this.http.get(url);
  }

  // Удалить пост
  deletePost(postId: number): Observable<any> {
    console.log('Method deletePost()');
    const url = POST_API + postId + '/delete';
    console.log('  url: ' + url);
    return this.http.post(url, null);
  }

  // Лайкнуть пост
  likePost(postId: number, username: string): Observable<any> {
    console.log('Method likePost()');
    const url = POST_API + postId + '/' + username + '/like';
    console.log('  url: ' + url);
    return this.http.post(url, null);
  }
}
