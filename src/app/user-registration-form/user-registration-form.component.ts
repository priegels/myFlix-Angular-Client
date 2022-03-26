import { Component, OnInit, Input } from '@angular/core';
// import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// import to bring in API calls 
import { FetchApiDataService } from '../fetch-api-data.service';
// import to display notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // function for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for successful user registration goes here
      this.dialogRef.close(); //closing modal on success
      this.snackBar.open('You\'ve successfully registered!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }

}
