import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:8080/';
    this.myApiUrl = 'api/MoviesAPI/';
  }

  getMovielist(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveMovie(Movie): Observable<Movie> {
    return this.http.post<Movie>(this.myAppUrl + this.myApiUrl, JSON.stringify(Movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateMovie(id: number, Movie): Observable<Movie> {
    return this.http.put<Movie>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(Movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
