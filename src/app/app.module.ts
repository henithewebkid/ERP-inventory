import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MaterialModule } from './Shared/material/material.module';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { HeaderComponent } from './Components/dashboard/navbar/header/header.component';
import { SidenavComponent } from './Components/dashboard/navbar/sidenav/sidenav.component';
import { IconSidenavComponent } from './Components/dashboard/navbar/icon-sidenav/icon-sidenav.component';
import { ManageProductComponent } from './Components/dashboard/Components/manage-product/manage-product.component';
import { ManageBranchAdminComponent } from './Components/dashboard/Components/manage-branch-admin/manage-branch-admin.component';
import { ManageDashboardComponent } from './Components/dashboard/Components/manage-dashboard/manage-dashboard.component';
import { SalesComponent } from './Components/dashboard/Components/sales/sales.component';
import { ReportComponent } from './Components/dashboard/Components/sales/report/report.component';
import { BranchDashboardComponent } from './Components/branch-dashboard/branch-dashboard.component';
import { BranchHeaderComponent } from './Components/branch-dashboard/navbar/branch-header/branch-header.component';
import { BranchSidenavComponent } from './Components/branch-dashboard/navbar/branch-sidenav/branch-sidenav.component';
import { BranchIconSidenavComponent } from './Components/branch-dashboard/navbar/branch-icon-sidenav/branch-icon-sidenav.component';
import { NewSaleComponent } from './Components/branch-dashboard/Components/new-sale/new-sale.component';
import { SalesReportComponent } from './Components/branch-dashboard/Components/sales-report/sales-report.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PagenotfoundComponent,
    HeaderComponent,
    SidenavComponent,
    IconSidenavComponent,
    ManageProductComponent,
    ManageBranchAdminComponent,
    ManageDashboardComponent,
    SalesComponent,
    ReportComponent,
    BranchDashboardComponent,
    BranchHeaderComponent,
    BranchSidenavComponent,
    BranchIconSidenavComponent,
    NewSaleComponent,
    SalesReportComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2OrderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
