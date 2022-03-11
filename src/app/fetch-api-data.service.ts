import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'http://k-flix.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

// User registration
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {    
  }
  //Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
      }
      return throwError(() =>
        'Something bad happened; please try again later.');
    }
  }

// User Login
export class UserLoginService {
  constructor(private http: HttpClient) {
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong while logging in.'
    );
  }
}

// Get All Movies
export class GetAllMoviesService {
  constructor(private http: HttpClient) {
  }
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  } 
}

// Get One Movie
export class GetOneMovieService {
  constructor(private http: HttpClient) {
  }

  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/:Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Non-typed response extraction
    private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
    }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong loading the movie collection; please try again later.');
  }
}

// Get Director
export class GetDirectorService {
  constructor(private http: HttpClient) {
  }

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/directors/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Non-typed response extraction
    private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
    }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  }
}

// Get Genre
export class GetGenreService {
  constructor(private http: HttpClient) {
  }

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/genres/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Non-typed response extraction
    private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
    }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  }
}

// Get User
export class GetUserService {
  constructor(private http: HttpClient) {
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Non-typed response extraction
    private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
    }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  }
}

// Get Favorite Movie
export class GetFavMovieService {
  constructor(private http: HttpClient) {
  }

  getFavMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    //no GET request for this endpoint previously made in API; was used for PUSH request
    return this.http.get(apiUrl + '/users/:Username/movies/:MovieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Non-typed response extraction
    private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
    }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  }
}

// Add movie to favMovies
export class AddFavMovieService {
  constructor(private http: HttpClient) {
  }

  addFavMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + '/users/:Username/movies/:MovieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Non-typed response extraction
    private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
    }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  }
}

// Delete FavMovie
export class DeleteFavMovieService {
  constructor(private http: HttpClient) {
  }

  deleteFavMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/:Username/movies/:MovieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Non-typed response extraction
    private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
    }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  }
}

// Edit User Profile
export class EditUserProfileService {
  constructor(private http: HttpClient) {
  }

  editUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + '/users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Non-typed response extraction
    private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
    }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  }
}

// Delete User Profile
export class DeleteUserProfileService {
  constructor(private http: HttpClient) {
  }

  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Non-typed response extraction
    private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
    }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  }
}