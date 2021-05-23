import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import {CamundaRestService} from '../../services/rest/camunda-rest.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

    export class LoginComponent implements OnInit {
   
  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin :any;
  loginSuccess = false;
  auth:any;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService ,
    private CamundaRest1:CamundaRestService,
    ) 
    { localStorage.setItem('login', this.auth=this.gene())  }
    
  ngOnInit() {
  }
  component = 'signin';
  handleLogin() {
      this.authenticationService.authenticationService(this.username, this.password).subscribe((result:any)=> {
       let str="";
    if(result.authenticated == true){
        this.router.navigate(['/home']);
        this.successMessage = 'Login Successful.';
        localStorage.setItem('login', environment.obj.authSucc = this.gene());
        document.cookie = "username="+environment.obj.authSucc+"Succ";
        this.invalidLogin=false
        console.log(environment.obj.authSucc );
    }
    else
    {
     this.invalidLogin =true
     localStorage.setItem('login', environment.obj.authFail =this.auth );
     document.cookie = "username="+environment.obj.authFail+"Fail";
    }
    this.CamundaRest1.getUserGroups(this.username).subscribe(succ=>{
      let tab1:Array<any>=new Array();
      succ.groups.forEach(element => {
      tab1.push(element.id)
      });
      localStorage.setItem('groupsId',JSON.stringify(tab1));
      // str += "The id of Users in the same group "
      // succ.groupUsers.forEach(e   lement => {
      //  str += element.id+"  ";
      //  alert(str);
        });
      }, () => {
         this.invalidLogin = true;
        this.loginSuccess = false;
      });
    }


    gene(){
      var result  = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz&à@ç=~#_+^|&-0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 60; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() *charactersLength)));
   }
   return result.join('');
      }
    
  }