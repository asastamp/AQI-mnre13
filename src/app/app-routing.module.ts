import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnePageComponent } from './pages/one-page/one-page.component';
import { PinManagerComponent } from './pages/pin-manager/pin-manager.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth-guard.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'one-page', component: OnePageComponent },
  {
    path: 'login', component: LoginComponent
  },
  { 
    path: 'one-page-manager', 
    component: PinManagerComponent, 
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
