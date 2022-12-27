import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {User} from '../../models/User';
import {PostService} from '../../service/post.service';
import {UserService} from '../../service/user.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';
import {ImageService} from '../../service/image.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  posts: Post[];            // посты
  isPostsLoaded = false;    // флаг загрузились ли посты
  user: User;               // юзер
  isUserDataLoaded = false; // флаг загрузились ли данные юзера

  // Инжекция сервисов
  constructor(private postService: PostService,
              private userService: UserService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private imageService: ImageService) {
  }

  // Данный метод вызывается первым
  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(data => {
      console.log(data);
      this.posts = data;
      this.getImagesToPosts(this.posts);
      this.getCommentsToPosts(this.posts);
      this.isPostsLoaded = true;
    });

    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.isUserDataLoaded = true;
    });
  }

  getImagesToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.imageService.getImageToPost(p.id)
        .subscribe(data => {
          p.image = data.imageBytes;
        });
    });
  }

  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.commentService.getCommentsToPost(p.id).subscribe(data => {
        p.comments = data;
      });
    });
  }

  likePost(postId: number, postIndex: number): void {
    const post = this.posts[postIndex];

    if (!post.usersLiked.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username).subscribe(() => {
        post.usersLiked.push(this.user.username);
        this.notificationService.showSnackBar('Post Liked');
      });
    } else {
      this.postService.likePost(postId, this.user.username).subscribe(() => {
        const index = post.usersLiked.indexOf(this.user.username, 0);
        if (index > -1) {
          post.usersLiked.splice(index, 1);
        }
      });
    }
  }

  postComment(message: string, postId: number, postIndex: number): void {
    console.log('IndexComponent -> method postComment()');

    const post = this.posts[postIndex];
    console.log(post);

    this.commentService.addCommentToPost(postId, message).subscribe(data => {
      console.log(data);
      post.comments.push(data);
    });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }

    return 'data:image/jpeg;base64,' + img;
  }
}
