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
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectComponent } from './subject/subject.component';
import { SignupComponent } from './signup/signup.component';
import { ReferenceComponent } from './reference/reference.component';
import { authGuard } from './auth.guard';
import { GradesComponent } from './grades/grades.component';
import { RosterComponent } from './roster/roster.component';
import { ApprovedComponent } from './approved/approved.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { BalanceComponent } from './balance/balance.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AccountComponent } from './account/account.component';

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
  {
    path: 'dash', component:DashboardComponent,
    canActivate: [authGuard],
    children: [
      {path: 'subject', component:SubjectComponent},
      { path: 'grade', component:GradesComponent},
      { path: 'roster', component: RosterComponent},
      { path: 'requirements', component:RequirementsComponent},
      { path: 'account', component:AccountComponent},
      { path: 'balance', component:BalanceComponent},
      {path: 'sched', component:ScheduleComponent},
      {
        path: '',
        redirectTo: 'sched',
        pathMatch: 'full',
      }
    ]
  },
  { path: '', redirectTo: 'enrollment', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
