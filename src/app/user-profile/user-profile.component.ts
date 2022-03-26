import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { DeleteProfileFormComponent } from '../delete-profile-form/delete-profile-form.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  FavMovie: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavMovie();
  }

  // function to let the user display their profile
  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
      });
    }
  }

  // function to let the user display their favorited movies 
  /*getFavMovie(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavMovie = resp.FavoriteMovies;
      console.log(this.FavMovie);
      return this.FavMovie;
    });
  }
*/
  
  getFavMovie(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.FavMovie.push(movie);
        }
      });
    });
    console.log(this.FavMovie);
  }
  

  // function to let the user remove a movie from their favorited movies
  removeFavMovie(MovieID: string, Title: string): void {
    this.fetchApiData.deleteFavMovie(this.user.Username, MovieID).subscribe((resp) => {
      console.log(resp);
      this.snackBar.open(
        `${Title} is no longer favorited`,
        'OK',
        {
          duration: 1000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  // dialog to edit user information
  openUserEditDialog(): void {
    this.dialog.open(EditProfileFormComponent, {
      panelClass: 'custom-dialog-container',
      width: 'max-content'
    });
  }

  // dialog to delete user
  openUserDeleteDialog(): void {
    this.dialog.open(DeleteProfileFormComponent, {
      panelClass: 'custom-dialog-container',
      width: 'max-content'
    });
  }

  // open Genre dialog
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      panelClass: 'custom-dialog-container',
      data: { name, description },
      width: '500px',
    });
  }
  
  // open Director dialog
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      panelClass: 'custom-dialog-container',
      data: {name, bio},
      width: '500px',
    });
  }
  
  // open Synopsis dialog
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      panelClass: 'custom-dialog-container',
      data: { title, description}
    })
  }  

}