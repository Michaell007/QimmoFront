import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthnService } from '../services/authn.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private svcAuth: AuthnService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
      if (this.svcAuth.getLocalStorage("token") == undefined || this.svcAuth.getLocalStorage("token") == '') {
        this.router.navigate(['login']);
      }
      return true;
  }
  
}
