import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthSuperAdminService } from 'src/app/Services/auth-super-admin.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { BranchAdminService } from 'src/app/Services/branch-admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login!: FormGroup
  errors: any
  iserror = false

  constructor(private router: Router, private auth : AuthSuperAdminService, private authentication: AuthenticationService, private branchAdmin: BranchAdminService) { }

  ngOnInit(): void {
    this.login = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,[Validators.required,Validators.minLength(8)])
    })
  }

  onLogin(){
    const {username, password} = this.login.value;
    if(username === 'admin'){
      this.auth.login(username,password).subscribe(result => {
        if(result){
          if(result.status===200){
            localStorage.setItem('superAdmin','admin');
            this.authentication.setAccessToken(JSON.parse(result.body).token);
            this.router.navigate(['/dashboard']);
          }
         
        }
      }, error =>{
        this.iserror = true
        this.errors = JSON.parse(error.error).message
      })
    }else{
      this.branchAdmin.login(username,password).subscribe(result => {
        if(result){
          if(result.status==200){
            localStorage.setItem('superAdmin','branchAdmin');
            this.authentication.setAccessToken(JSON.parse(result.body).token);
            localStorage.setItem( 'username',JSON.parse(result.body).user.username)
            if(JSON.parse(result.body).user.isnew === true){

              this.router.navigate(['/update-password']);
            }else{
              this.router.navigate(['/branch-dashboard/new-sale']);
            }
          }
          else{
            this.errors=result;   
          }
        }
      }, error =>{
        this.iserror = true
        this.errors = JSON.parse(error.error).message
      })
    }
  }

}

