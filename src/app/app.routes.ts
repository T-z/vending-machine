import { Routes } from '@angular/router';
import { CustomerInterfaceComponent } from './components/customer-interface/customer-interface.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: 'customer', component: CustomerInterfaceComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: 'customer' }
];
