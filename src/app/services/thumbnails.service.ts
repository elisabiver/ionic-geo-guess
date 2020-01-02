import { Injectable } from '@angular/core';
import { Thumbnail } from 'src/app/models/thumbnail';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ThumbnailsService {

  private thumbnails: Thumbnail[];
  private user: User;
  readonly url = `${environment.apiUrl}/thumbnails`;

  constructor(public http: HttpClient, private auth: AuthService) {
    this.thumbnails = [];
  }

  fetchThumbnails() {
    return this.http.get<Thumbnail[]>(this.url);
  }

  fetchMyThumbnails() {
  /*  this.auth.getUser().subscribe(user => {
      this.user = user;
    }); */
    return this.http
    .get<Thumbnail[]>(this.url)
    .pipe(map(res => {
      // return res.filter(thumbnails => thumbnails.user_id == this.user._id);
      return res.filter(thumbnails => thumbnails.user_id == '5dbaec66b6c35e0017c82115');
    }));
  }

  getThumbnail(thumbnailId: string) {
    return {
      ...this.thumbnails.find(thumbnail => {
        return thumbnail._id === thumbnailId;
      })
    };
  }

}