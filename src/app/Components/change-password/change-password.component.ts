import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchAdminService } from 'src/app/Services/branch-admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
 
  changeForm!: FormGroup
  errors:any

  constructor(private branchAdmin: BranchAdminService,private router: Router) { }

  ngOnInit(): void {
    this.changeForm = new FormGroup({
      'passwordCurrent': new FormControl('kesteDamena@13579,',Validators.required),
      'password': new FormControl(null,[Validators.minLength(8),Validators.required]),
      're-typePassword': new FormControl(null,Validators.required),
    })
  }
  onSubmit(){
    const {passwordCurrent,password} = this.changeForm.value
    this.branchAdmin.changePassword(passwordCurrent,password).subscribe(result => {
      if(result){
        if(result.status==200){
          this.changeForm.get('password')?.reset()
          this.changeForm.get('re-typePassword')?.reset()
          this.router.navigate(['/branch-dashboard/new-sale']);
        }
        else{
          this.errors=result; 
        }
      }
    })
  }

}
