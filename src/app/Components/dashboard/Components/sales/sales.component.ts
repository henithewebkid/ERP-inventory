import { Component, OnInit } from '@angular/core';
import { BranchAdminService } from 'src/app/Services/branch-admin.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  adminData: any
  username: any
  constructor(private branchAdmin: BranchAdminService,private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.getAllAdmins()
  }
  getAllAdmins(){
    this.branchAdmin.getAllAdmins().subscribe(result =>{
      if (result) {
        if (result.status === 200) {
         this.adminData = JSON.parse(result.body)
        } else {
        }
      }
    },
      error => {
        console.log(error(String(error.error), "Error"));
    })
  }

  onUsername(user:any){
    this.username = user
  }
}
