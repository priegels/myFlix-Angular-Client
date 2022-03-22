import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  FavMovie: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
   ) {}

  ngOnInit(): void {
    this.getMovies();
    this.showFavMovie();
  }

  // show all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  // function to pull all favorited movies of a user.
  showFavMovie(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavMovie = resp.FavoriteMovies;
      console.log(this.FavMovie);
    });
  }

  // function to let user add a movie to their favorite movies
  addFavMovie(MovieID: string, Title: string): void {
    this.fetchApiData.addFavMovie(this.user.Username, MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${Title} has been added to your favorites.`, 'OK', {
      duration: 3000,
    });
    this.showFavMovie();
    });
  }

  // function to let user remove a movie from their favorite movies
  deleteFavMovie(MovieID: string, Title: string): void {
    this.fetchApiData.deleteFavMovie(this.user.Username, MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${Title} is no longer favorited.`, 'OK', {
        duration: 3000,
      });
      this.showFavMovie();
    });
  }

  // function to display to user filled or empty heart icon depending on favorite status of a movie
  isFav(MovieID: string): boolean {
    return this.FavMovie.some((movie) => movie._id === MovieID);
  }

  setFavStatus(movie: any): void {
    this.isFav(movie._id)
    ? this.deleteFavMovie(movie._id, movie.Title)
    : this.addFavMovie(movie._id, movie.Title)
  }

  // open Genre dialog
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px'
    });
  }

  // open Director dialog
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {name, bio},
      width: '500px',
    });
  }

  // open Synopsis dialog
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title, description}
    })
  }

}
