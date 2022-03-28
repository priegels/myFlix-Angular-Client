import { Component, OnInit, Input } from '@angular/core';

//import for closing the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//import for bringing in API calls 
import { FetchApiDataService } from '../fetch-api-data.service';

//import for displaying notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';

//import for routing to different path 
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  /**
   * store input value in userData
   */
  @Input() userData = { Username: '', Password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * function responsible for sending form inputs to backend
   * @function userLogin
   * @param userData
   * @return user data in JSON format
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      //check for success and log data/token to localStorage
      console.log(result);
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      //Logic for successful user login to be implemented
      this.dialogRef.close(); //will close modal on success
      this.snackBar.open('You\'re logged in!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

