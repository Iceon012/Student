import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TrackingComponent } from './tracking/tracking.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { PaymentComponent } from './payment/payment.component';
import { ProofComponent } from './proof/proof.component';
import { HomeComponent } from './home/home.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { EnrollmentDataComponent } from './enrollment-data/enrollment-data.component';
import { TuitionFeesComponent } from './tuition-fees/tuition-fees.component';
import { SignupComponent } from './signup/signup.component';
import { ReferenceComponent } from './reference/reference.component';
import { authGuard } from './authenticate/auth.guard';
import { ApprovedComponent } from './approved/approved.component';

const routes: Routes = [
  { path: 'enrollment', component: EnrollmentComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'reference', component:ReferenceComponent},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'tracking',
        canActivate:[authGuard],
        component: TrackingComponent,
        children: [
          { path: 'studentprofile', component: StudentprofileComponent },
          { path: 'enrollmentdata', component: EnrollmentDataComponent },
          { path: 'tuition-fees', component: TuitionFeesComponent },
          { path: 'payment', component: PaymentComponent },
          { path: 'proof', component: ProofComponent },
          { path: 'approved', component:ApprovedComponent},
          {
            path: '',
            redirectTo: 'studentprofile',
            pathMatch: 'full',
          },
        ],
      },
      { path: '', redirectTo: 'tracking', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'enrollment', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
