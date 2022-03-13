import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'http://k-flix.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /* Making the api call for the user registration endpoint
   * @function userRegistration
   * @params userDetails
   * @returns new user object output in JSON 
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

// User Login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + `/login`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

// Get All Movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Get One Movie
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/${Title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Get Director
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/directors/${Name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Get Genre
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/genres/${Name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Get User
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/users/${Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Get Favorite Movie

  getFavMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    //no GET request for this endpoint previously made in API; was used for PUSH request
    return this.http.get(apiUrl + `/users/:Username/movies/${MovieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Add movie to favMovies

  addFavMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `/users/${Username}/movies/${MovieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Delete FavMovie

  deleteFavMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `/users/${Username}/movies/${MovieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Edit User Profile

  editUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `/users/${Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Delete User Profile

  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `/users/${Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// non-typed response extraction at bottom to reduce repetition
private extractResponseData(data: any | Object): any {
  return data || {};
  }

// Error function at bottom to reduce repetition 
private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occured:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  }
}