import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { DeleteProfileFormComponent } from '../delete-profile-form/delete-profile-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  FavMovie: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  // function to let the user display their profile
  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.user = resp;
        this.getFavMovie();

        console.log(this.user);
      });
    }
  }

  // function to let the user display their favorited movies 
  getFavMovie(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie: any) => {
        if (this.user.FavMovie.includes(movie._id)) {
          this.FavMovie.push(movie);
        }
      });
    });
    console.log(this.FavMovie);
  }

  // function to let the user remove a movie from their favorited movies
  removeFavMovie(MovieID: string, Title: string): void {
    this.fetchApiData.deleteFavMovie(MovieID).subscribe((resp) => {
      console.log(resp);
      this.snackBar.open(
        `${Title} is no longer favorited`,
        'OK',
        {
          duration: 2000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    });
  }

  // dialog to edit user information
  openUserEditDialog(): void {
    this.dialog.open(EditProfileFormComponent, {
      width: 'max-content'
    });
  }

  // dialog to delete user
  openUserDeleteDialog(): void {
    this.dialog.open(DeleteProfileFormComponent, {
      width: 'max-content'
    });
  }

}