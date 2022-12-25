import {Comment} from './Comment';

export interface Post {

  // При определении интерфейса мы можем задать некоторые свойства как необязательные
  // с помощью знака вопроса. Подобные свойства реализовать необязательно
  id?: number;

  topic: string;
  caption: string;
  location: string;

  image?: File;
  likes?: number;
  userLiked?: string[]; // юзеры которые лайкнули
  comments?: Comment[];
  username?: string;
}
