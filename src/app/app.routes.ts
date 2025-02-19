import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OwnerdashboardComponent } from './ownerdashboard/ownerdashboard.component';
import { SettingsownerComponent } from './settingsowner/settingsowner.component';
import { EmployeesComponent } from './employees/employees.component';
import { AccountantComponent } from './accountant/accountant.component';
import { EmployeedashComponent } from './employeedash/employeedash.component';
import { ClientsComponent } from './clients/clients.component';
import { SettingsemployeeComponent } from './settingsemployee/settingsemployee.component';
import { ClientsinfosempComponent } from './clientsinfosemp/clientsinfosemp.component';
import { ClientsinfosownerComponent } from './clientsinfosowner/clientsinfosowner.component';
import { AccsettingsComponent } from './accsettings/accsettings.component';
import { ProductsempComponent } from './productsemp/productsemp.component';
import { ProductsinfoempComponent } from './productsinfoemp/productsinfoemp.component';
import { ProductsComponent } from './products/products.component';
import { ProductinfosComponent } from './productinfos/productinfos.component';
import { ReportempComponent } from './reportemp/reportemp.component';
import { BilltemplateComponent } from './billtemplate/billtemplate.component';
import { BillsaccComponent } from './billsacc/billsacc.component';
import { BillinfoaccComponent } from './billinfoacc/billinfoacc.component';
import { SettingsclientComponent } from './settingsclient/settingsclient.component';
import { ProductclientComponent } from './productclient/productclient.component';
import { BillsclComponent } from './billscl/billscl.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },

    { path: 'dash', component: OwnerdashboardComponent },
    { path: 'settingsowner', component: SettingsownerComponent },
    { path: 'employee', component: EmployeesComponent },
    { path: 'accountant', component: AccountantComponent },
    { path: 'client', component: ClientsComponent },
    { path: 'clientsinfosown', component: ClientsinfosownerComponent },
    { path: 'product', component: ProductsComponent },
    { path: 'productsinfosown', component: ProductinfosComponent },


    { path: 'employeedash', component: EmployeedashComponent },
    { path: 'settingsemp', component: SettingsemployeeComponent },
    { path: 'clientsinfos', component: ClientsinfosempComponent },
    { path: 'productemp', component: ProductsempComponent },
    { path: 'productsinfosemp', component: ProductsempComponent },
    { path: 'reportemp', component: ReportempComponent },
    { path: 'billemp', component: BilltemplateComponent },


    { path: 'settingsacc', component: AccsettingsComponent },
    { path: 'billacc', component: BillsaccComponent },
    { path: 'billinfosacc', component: BillinfoaccComponent },


    { path: 'settingscl', component: SettingsclientComponent },
    { path: 'productcl', component: ProductclientComponent },
    { path: 'billcl', component: BillsclComponent },




    { path: '', component: LoginComponent },
    { path: '**', redirectTo: '' }

];
