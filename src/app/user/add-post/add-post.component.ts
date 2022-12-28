import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../models/Post';
import {PostService} from '../../service/post.service';
import {ImageService} from '../../service/image.service';
import {NotificationService} from '../../service/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup;
  selectedFile: File;
  isPostCreated = false;
  createdPost: Post;
  previewImgURL: any;

  constructor(private postService: PostService,
              private imageService: ImageService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.postForm = this.createPostForm();
  }

  createPostForm(): FormGroup {
    console.log('Create Post Form');
    return this.fb.group({
      topic: ['', Validators.compose([Validators.required])],
      caption: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    this.postService.createPost({
      topic: this.postForm.value.topic,
      caption: this.postForm.value.caption,
      location: this.postForm.value.location,
    }).subscribe(data => {
      console.log(data);
      this.createdPost = data;

      if (this.createdPost.id != null) {
        this.imageService.uploadImageToPost(this.selectedFile, this.createdPost.id).subscribe(() => {
          this.notificationService.showSnackBar('Post created successfully');
          this.isPostCreated = true;
          this.router.navigate(['/profile']);
        });
      }
    });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = (e) => {
      this.previewImgURL = reader.result;
    };
  }
}
