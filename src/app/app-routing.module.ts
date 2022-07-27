import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchDashboardComponent } from './Components/branch-dashboard/branch-dashboard.component';
import { NewSaleComponent } from './Components/branch-dashboard/Components/new-sale/new-sale.component';
import { SalesReportComponent } from './Components/branch-dashboard/Components/sales-report/sales-report.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { ManageBranchAdminComponent } from './Components/dashboard/Components/manage-branch-admin/manage-branch-admin.component';
import { ManageDashboardComponent } from './Components/dashboard/Components/manage-dashboard/manage-dashboard.component';
import { ManageProductComponent } from './Components/dashboard/Components/manage-product/manage-product.component';
import { ReportComponent } from './Components/dashboard/Components/sales/report/report.component';
import { SalesComponent } from './Components/dashboard/Components/sales/sales.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { AdminGuard } from './Guards/admin.guard'
import { BranchAdminGuard } from './Guards/branch-admin.guard'

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AdminGuard],children:[
    {path:'',component:ManageDashboardComponent},
    {path:'branch-admin',component:ManageBranchAdminComponent},
    {path:'product',component:ManageProductComponent},
    {path:'sales',component:SalesComponent},
    {path:'sales/:name',component:ReportComponent}
  ]},
  {path:'update-password',component:ChangePasswordComponent,canActivate:[BranchAdminGuard]},
  {path:'branch-dashboard',component:BranchDashboardComponent,canActivate:[BranchAdminGuard],children:[
    {path:'new-sale',component:NewSaleComponent},
    {path:'sale-report',component:SalesReportComponent}
  ]},
  {path:'page-not-found',component:PagenotfoundComponent},
  {path:'**', redirectTo:'/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
