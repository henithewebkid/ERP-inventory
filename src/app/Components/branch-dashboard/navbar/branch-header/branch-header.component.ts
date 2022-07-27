import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-branch-header',
  templateUrl: './branch-header.component.html',
  styleUrls: ['./branch-header.component.css']
})
export class BranchHeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
    }
  onLogOut(){
    this.authentication.logout()
    this.router.navigate(['/'])
  }

}
