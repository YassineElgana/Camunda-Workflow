import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {CamundaRestService} from '../rest/camunda-rest.service';
const BASE_AUTH_URL =environment.CAMUNDA_URL+"identity/verify"


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  AUTH_ATTRIBUTE_NAME = 'AUTH'

  public username: String;
  public password: String;
  public id : String;
  public state:boolean;
  constructor(private http: HttpClient) {
   
  }

  authenticationService(username: String, password: String) {
    return this.http.post<any>(BASE_AUTH_URL,{username : username ,password : password }
      
    )}

  createBasicAuthToken(username: String, password: String) {
    return window.btoa('Basic ' + window.btoa(username + ":" + password))
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem(this.AUTH_ATTRIBUTE_NAME,this.createBasicAuthToken(username,password));
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.AUTH_ATTRIBUTE_NAME);
    this.username = null  ;
    this.password = null;
  }

  isUserLoggedIn() { 
    var currentStatusOfLogin= localStorage.getItem('login'); 
    var boolValue; 
    currentStatusOfLogin = document.cookie.substr(9)
    if(currentStatusOfLogin== localStorage.getItem('login')+"Succ")
     boolValue =true
     else
       boolValue =false
   
    return boolValue;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }

  getUserAuth(userId)
  {
    const _userId = userId ?? sessionStorage.getItem;   
  }


}
