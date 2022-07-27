import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchAdminGuard implements CanActivate {
  constructor(private router: Router,private authentication: AuthenticationService,){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authentication.isSuperAdmin === false && this.authentication.isLoggedIn !== false ){
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
  }
  
}
