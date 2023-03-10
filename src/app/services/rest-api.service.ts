import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:8000/';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  constructor(private http: HttpClient) { }

  getLatestAnnonces() : Observable<any> {
    return this.http.get(`${this.apiURL}annonce/latest`);
  }

  getSearchAnnonces(data: any, page = 1) : Observable<any> {
    return this.http.post(`${this.apiURL}annonces/search/${page}`, data);
  }

  getAllAnnonces(page = 1) : Observable<any> {
    return this.http.get(`${this.apiURL}annonces/all/${page}`);
  }

  createSouscripteur(data: any) : Observable<any> {
    return this.http.post(`${this.apiURL}souscripteur/create`, data);
  }

  createUser(data: any) : Observable<any> {
    return this.http.post(`${this.apiURL}user/create`, data);
  }

}
