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
  /**
   * Inject the HttpClient module to the constructor params
  This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
  constructor(private http: HttpClient) {}

/**
 * call API endpoint to register a new user
 * @function userRegistration
 * @param userDetails 
 * @returns a new user object in JSON format
 */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

/**
 * calls API endpoint for user login
 * @function userLogin
 * @param userDetails 
 * @returns a users' data in JSON format
 */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + `/login`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

/**
 * calls API endpoint to get all movies
 * @function getAllMovies
 * @returns an array of the movies object in JSON format
 */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * calls API endpoint for getting a single movie 
 * @function getOneMovie
 * @param Title 
 * @returns a movie object in JSON format
 */
  public getOneMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/${Title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * calls the API endpoint to get director info by his*her name
 * @function getDirector
 * @param Name 
 * @returns directors' data in JSON format
 */
  public getDirector(Name: 'string'): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/directors/${Name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * calls API endpoint to get Genre data by its name
 * @function getGenre
 * @param Name 
 * @returns genre data in JSON format
 */
  public getGenre(Name: 'string'): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/genres/${Name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * calls API endpooint to get a users' data 
 * @function getUser
 * @param Username 
 * @returns user data in JSON format
 */
public getUser(Username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http
    .get(apiUrl + `/users/${Username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}

/**
 * calls API endpoint to get the favorite movie list of a user
 * @function getFavMovie
 * @param MovieID 
 * @returns a list of the users' favorite movies in JSON format
 */
  public getFavMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    //no GET request for this endpoint previously made in API; was used for PUSH request
    return this.http.get(apiUrl + `/users/:Username/movies/${MovieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * calls API endpooint to add a movie to a users' favorite movie list
 * @function addFavMovie
 * @param Title 
 * @param MovieID 
 * @returns the updated users' favorite list in JSON format
 */
  public addFavMovie(Title: string, MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    console.log(apiUrl + `/users/${Username}/movies/${MovieID}`);
    return this.http.post(apiUrl + `/users/${Username}/movies/${MovieID}`, {}, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * calls API endpoint to delete a movie from the users' favorite list
 * @function deleteFavMovie
 * @param Title 
 * @param MovieID 
 * @returns updated user info after removal of a fav movie
 */
  public deleteFavMovie(Title: string, MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `/users/${Username}/movies/${MovieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * call API endpoint to edit user info
 * @param userData 
 * @returns updated user information in JSON format
 */
  public editUserProfile(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.put(apiUrl + `/users/${Username}`, userData, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * call API endpoint to delete a user
 * @function deleteUserProfile
 * @param Username 
 * @returns delete status
 */
  public deleteUserProfile(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `/users/${Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 *  non-typed response extraction at bottom to reduce repetition
 * @function extractResponseData
 * @param resp 
 * @returns response || object
 */
private extractResponseData(resp: any | Object): any {
  const body = resp;
  return body || {};
  }

/**
 * Error function at bottom to reduce repetition 
 * @function handleError
 * @param error 
 * @returns error call 
 */
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