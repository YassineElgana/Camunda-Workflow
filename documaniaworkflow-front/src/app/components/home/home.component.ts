import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  checkInHome:any=false;
  check:any=true;
 
  constructor(private router: Router, ) { this.router.events.subscribe((ev) => {
   if(this.router.url == "/home"){
     this.checkInHome=true
     console.log(this.checkInHome)
   }else
   this.checkInHome=false

  })
  ;}

  ngOnInit() {
   
  }
 
 
  
}
