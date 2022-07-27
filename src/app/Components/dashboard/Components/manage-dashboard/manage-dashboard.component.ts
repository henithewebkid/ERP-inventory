import { Component, OnInit } from '@angular/core';
import { BranchAdminService } from 'src/app/Services/branch-admin.service';
import { ProductManageService } from 'src/app/Services/product-manage.service';

@Component({
  selector: 'app-manage-dashboard',
  templateUrl: './manage-dashboard.component.html',
  styleUrls: ['./manage-dashboard.component.css']
})
export class ManageDashboardComponent implements OnInit {

  productlength?: number
  adminlength?: number
  constructor(private productService: ProductManageService,private branchAdmin: BranchAdminService) { }

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllAdmins()
  }

  getAllProducts(){
    this.productService.getAllProduct().subscribe(result => {
      if (result) {
        if (result.status === 200) {
         this.productlength = JSON.parse(result.body).length
        } else {
        }
      }
    },
      error => {
        console.log(error(String(error.error), "Error"));
      });
  }
  getAllAdmins(){
    this.branchAdmin.getAllAdmins().subscribe(result => {
      if (result) {
        if (result.status === 200) {
         this.adminlength = JSON.parse(result.body).length
        } else {
        }
      }
    },
      error => {
        console.log(error(String(error.error), "Error"));
    })
  }

}
