import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthnService } from './authn.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

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

  constructor(private http: HttpClient, private svcAuth: AuthnService) { }

  getLatestAnnonces() : Observable<any> {
    return this.http.get(`${this.apiURL}annonce/all/latest`, this.httpOptions);
  }

  getSearchAnnonces(data: any, page = 1) : Observable<any> {
    return this.http.post(`${this.apiURL}annonces/search/${page}`, data);
  }

  getAllAnnonces(page = 1) : Observable<any> {
    return this.http.get(`${this.apiURL}annonces/all/${page}`);
  }

  getAnnonceById(annonceId: number) : Observable<any> {
    return this.http.get(`${this.apiURL}annonce/${annonceId}`);
  }

  createSouscripteur(data: any) : Observable<any> {
    return this.http.post(`${this.apiURL}souscripteur/create`, data);
  }

  createUser(data: any) : Observable<any> {
    return this.http.post(`${this.apiURL}user/create`, data);
  }

  updateUser(data: any) : Observable<any> {
    let token = this.svcAuth.getLocalStorage("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    };

    return this.http.put(`${this.apiURL}api/user/edit`, data, httpOptions);
  }

  addAnnonce(data: any) : Observable<any> {
    let token = this.svcAuth.getLocalStorage("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    };

    return this.http.post(`${this.apiURL}api/annonce/create`, data, httpOptions);
  }

}
