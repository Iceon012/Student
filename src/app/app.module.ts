import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TrackingComponent } from './tracking/tracking.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { PaymentComponent } from './payment/payment.component';
import { ProofComponent } from './proof/proof.component';
import { HomeComponent } from './home/home.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SignupComponent } from './signup/signup.component';
import { EnrollmentDataComponent } from './enrollment-data/enrollment-data.component';
import { TuitionFeesComponent } from './tuition-fees/tuition-fees.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TrackingComponent,
    StudentprofileComponent,
    PaymentComponent,
    ProofComponent,
    HomeComponent,
    EnrollmentComponent,
    SignupComponent,
    EnrollmentDataComponent,
    TuitionFeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
