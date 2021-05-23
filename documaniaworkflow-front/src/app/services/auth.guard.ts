import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {LoginComponent} from './../components/login/login.component'
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
 
  constructor(private authService : AuthService,private route : Router){


  }
 

  canActivate() : boolean {
  
    if(this.authService.isUserLoggedIn())
      return true;
    else{
      this.route.navigate(['login']);
      return false;
    }
  }
  
}
