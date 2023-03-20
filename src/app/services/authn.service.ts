import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthnService {

  apiURL = environment.apiURL;

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

  postLogin(data: any) : Observable<any> {
    return this.http.post(`${this.apiURL}api/login_check`, data);
  }

  setLocalStorage(name: string, value: any) {
    localStorage.setItem(name, value);
  }

  getLocalStorage(name: string) {
    return JSON.parse(localStorage.getItem(name)!); 
  }

  deleteLocalStorage(name: string) {
    localStorage.removeItem(name);
  }

  viderLocalStorage(name: string) {
    localStorage.clear();
  }

}
