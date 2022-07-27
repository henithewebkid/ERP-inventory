import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminDatas } from 'src/app/Models/admin.model';
import { BranchAdminService } from 'src/app/Services/branch-admin.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-manage-branch-admin',
  templateUrl: './manage-branch-admin.component.html',
  styleUrls: ['./manage-branch-admin.component.css']
})
export class ManageBranchAdminComponent implements OnInit {
  
  term!: any;
  adminData: any
  adminForm!: FormGroup
  admin: AdminDatas = {} as AdminDatas
  isPopupOpened = true
  errors:any
  p: number = 1

  constructor(private dialog: MatDialog, private branchAdmin: BranchAdminService) { }

  ngOnInit(): void {
    this.getAllAdmins()
    this.adminForm = new FormGroup({
      'id': new FormControl(null),
      'username': new FormControl(null,Validators.required),
      'location': new FormControl(null,Validators.required),
      'password': new FormControl('kesteDamena@13579,',Validators.required),
      'isnew': new FormControl(true,Validators.required)
    })
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
  onAddBranchAdmin(addAdminRef:any){
    const dialogRef = this.dialog.open(addAdminRef, {
      data: {},
      height: '75%',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
  onUpdateBranchAdmin(updateAdminRef:any,row:any){
    this.adminForm.controls['id'].setValue(row._id)
    this.adminForm.controls['username'].setValue(row.username)
    this.adminForm.controls['location'].setValue(row.location)
    const dialogRef = this.dialog.open(updateAdminRef, {
      data: {},
      height: '75%',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
  onDeleteBranchAdmin(deleteAdminRef:any,row:any){
    this.adminForm.controls['id'].setValue(row._id)
    const dialogRef = this.dialog.open(deleteAdminRef, {
      data: {},
      height: '25%',
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  addNewAdmin(){
    const {username,location,password,isnew} = this.adminForm.value
    this.branchAdmin.SignUp(username,location,password,isnew).subscribe(result => {
      if(result){
        if(result.status==201){
          Swal.fire({
            icon: 'success',
            title: 'Branch Admin Register Successfully',
            showConfirmButton: true
          })
          this.getAllAdmins()
          this.adminForm.get('username')?.reset()
          this.adminForm.get('location')?.reset()
          this.dialog.closeAll() 
        }
        else{
          this.errors=result;
          
        }
      }
    })
}
 updateAdmin(){
   this.admin._id = this.adminForm.get('id')?.value
   this.admin.username = this.adminForm.get('username')?.value
   this.admin.location = this.adminForm.get('location')?.value
   this.branchAdmin.updateAdmin(this.admin._id,this.admin).subscribe(result => {
    if (result) {
      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Branch Admin Updated Successfully',
          showConfirmButton: true
        })
       this.getAllAdmins()
       this.dialog.closeAll()
      } else {
      }
    }
  },
    error => {
      console.log(error(String(error.error), "Error"));
    })
}
 onRestPassword(){
  this.admin._id = this.adminForm.get('id')?.value
  this.admin.password = this.adminForm.get('password')?.value
  this.admin.isnew = this.adminForm.get('isnew')?.value
  this.branchAdmin.resetPassword(this.admin._id,this.admin).subscribe(result => {
    if (result) {
      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Branch Admin Password Rest Successfully',
          showConfirmButton: true
        })
       this.getAllAdmins()
       this.dialog.closeAll()
      } else {
      }
    }
  },
    error => {
      console.log(error(String(error.error), "Error"));
  })
} 
 onDelete(){
  const id = this.adminForm.get('id')?.value
  this.branchAdmin.deleteAdmin(id).subscribe(result => {
    if(result){
      if(result.status === 200){
        this.getAllAdmins()
        this.dialog.closeAll()
      }else{

      }
    }
  },
    error =>{
      console.log(error(String(error.error), "Error"));
    })
 }
 onCancle(){
  this.dialog.closeAll()
 }
 key: string = this.admin.username
 reverse: boolean = false
 sort(key:any){
   this.key =key
   this.reverse = !this.reverse
 }
}
