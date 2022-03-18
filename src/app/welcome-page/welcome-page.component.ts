import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
//import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  // function that will open dialog when signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // assigning dialog a width
      width: '280px'
    });
  }

  //function that will open dialog when login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      //assigning width to dialog
      width: '280px'
    });
  }
}

 /*
  //function that will open the movie view
  openMoviesDialog(): void {
   this.dialog.open(MovieCardComponent, {
     width: '500px'
    });
  } */

