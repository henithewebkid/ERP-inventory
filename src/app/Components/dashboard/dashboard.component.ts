import { Component, OnInit, DoCheck, NgZone } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sideBarOpen = true;
  width?: any;
  height?: any;
  
  constructor(public ngZone:NgZone) {
    window.onresize = (e) => {
      ngZone.run(() => {
          this.onchange();
      });
     };
   }

  ngOnInit(): void {
    
  }
  
  onchange(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
      if(this.width <= 800) {
          this.sideBarOpen = false
          
      }
      if(this.width > 800) {
        this.sideBarOpen = true
      }
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
    
  }

}
