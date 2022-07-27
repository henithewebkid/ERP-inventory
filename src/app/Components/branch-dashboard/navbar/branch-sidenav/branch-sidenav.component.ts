import { Component, OnInit } from '@angular/core';
import { BranchAdminService } from 'src/app/Services/branch-admin.service';

@Component({
  selector: 'app-branch-sidenav',
  templateUrl: './branch-sidenav.component.html',
  styleUrls: ['./branch-sidenav.component.css']
})
export class BranchSidenavComponent implements OnInit {

  adminData: any
  constructor(private branchAdmin: BranchAdminService) { }

  ngOnInit(): void {
    this.getOwnDatas()
  }

  getOwnDatas(){
    return this.adminData = localStorage.getItem('username')
    
  }
}
