import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {TokenStorageService} from '../../service/token-storage.service';
import {PostService} from '../../service/post.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../service/notification.service';
import {ImageService} from '../../service/image.service';
import {UserService} from '../../service/user.service';
import {EditUserComponent} from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserDataLoaded = false; // флаг загрузились ли данные юзера
  user: User;               // пользователь
  selectedFile: File;
  userProfileImage: File;   // фотография юзера
  previewImgURL: any;       // превью фотографии

  constructor(private tokenService: TokenStorageService,
              private postService: PostService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    // Получить данные юзера
    this.userService.getCurrentUser().subscribe(data => {
      console.log(data);
      this.user = data;
      this.isUserDataLoaded = true;
    });

    // Получить фото профиля
    this.imageService.getProfileImage().subscribe(data => {
      this.userProfileImage = data.imageBytes;
    });
  }

  onFileSelected(event): void {
    console.log('On File Selected');
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImgURL = reader.result;
    };
  }

  openEditDialog(): void {
    console.log('Open Edit Dialog');
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      user: this.user
    };
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  // Показать фото юзера.
  // Фото приходит в байтах и его надо трансформировать
  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  // Загрузить фото
  onUpload(): void {
    if (this.selectedFile != null) {
      this.imageService.uploadImageToUser(this.selectedFile).subscribe(() => {
        this.notificationService.showSnackBar('Profile Image updated successfully');
      });
    }
  }
}
