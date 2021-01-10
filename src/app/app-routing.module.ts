import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnePageComponent } from './pages/one-page/one-page.component';
import { PinManagerComponent } from './pages/pin-manager/pin-manager.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'one-page', component: OnePageComponent },
  { path: 'one-page-manager', component: PinManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
