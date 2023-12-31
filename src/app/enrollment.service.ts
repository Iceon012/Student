import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  url = 'http://localhost/nlacacademy/';

  constructor(private http: HttpClient) {}

  getData(pid: any) {
    return this.http.get(
      this.url + 'getPayment.php?en_id=' + pid
      );
  }

  getProof(pid: any) {
    return this.http.get(
      this.url + 'proof.php?en_id=' + pid
      );
  }

  getPayment(pid: any) {
    return this.http.get(
      this.url + 'payment.php?en_id=' + pid
      );
  }

  getGrades() {
    return this.http.get(
      this.url + 'displayGrades.php'
      );
  }

  enroll(stud: any) {
    return this.http.post(
      this.url + 'signup.php',
      JSON.stringify(stud)
      );
  }

  studOne(lrn: any) {
    return this.http.get(
      this.url + 'studProfile.php?LRN=' + lrn
      );
  }

  GradesOne(Grade: any) {
    return this.http.post(
      this.url + 'updateGrades.php',
      JSON.stringify(Grade)
      );
  }

  StudLogin(log: any) {
    return this.http.post(
      this.url + 'login.php',
      JSON.stringify(log)
      );
  }

  studProfile(LRN: any) {
    return this.http.get(
      this.url + 'studProfile.php?LRN=' + LRN
      );
  }

  updateProfile(LRN: any) {
    return this.http.post(
      this.url + 'updateProfile.php',
      JSON.stringify(LRN));
  }

  updateEnrollment(LRN: any) {
    return this.http.post(
      this.url + 'updateEnrollment.php',
      JSON.stringify(LRN)
    );
  }
  getRequirements(LRN: any) {
    return this.http.get(
      this.url + 'getRequirements.php?lrn=' + LRN
    );
  }

  getSchedule(LRN:any) {
    return this.http.get(
      this.url + 'getSchedule.php?lrn=' + LRN
    );
  }
}
