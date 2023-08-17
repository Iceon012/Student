import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TrackingComponent } from './tracking/tracking.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { PaymentComponent } from './payment/payment.component';
import { ProofComponent } from './proof/proof.component';
import { HomeComponent } from './home/home.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';

const routes: Routes = [
  {path: 'enrollment', component:EnrollmentComponent},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'tracking', component:TrackingComponent,
    children: [
      {path: 'studentprofile', component:StudentprofileComponent},
      {path: 'payment', component:PaymentComponent},
      {path: 'proof', component:ProofComponent},

      {path: '', redirectTo: '/tracking/studentprofile', pathMatch: 'full'}
    ]
  },
  
  {path: '', redirectTo:'enrollment', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
