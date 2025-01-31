import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OwnerdashboardComponent } from './ownerdashboard/ownerdashboard.component';
import { SettingsownerComponent } from './settingsowner/settingsowner.component';
import { EmployeesComponent } from './employees/employees.component';
import { AccountantComponent } from './accountant/accountant.component';
import { EmployeedashComponent } from './employeedash/employeedash.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dash', component: OwnerdashboardComponent },
    { path: 'settings', component: SettingsownerComponent },
    { path: 'employee', component: EmployeesComponent },
    { path: 'accountant', component: AccountantComponent },
    { path: 'employeedash', component: EmployeedashComponent },
    { path: '', component: LoginComponent },
    { path: '**', redirectTo: '' }

];
