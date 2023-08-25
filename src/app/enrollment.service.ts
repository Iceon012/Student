import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {

  url = 'http://localhost/nlacacademy/';

  constructor(private http: HttpClient) {}

  getData(pid:any){
    return this.http.get(this.url + 'getPayment.php?en_id=' + pid);
    }

  enroll(stud: any) {
    return this.http.post(this.url + 'signup.php', JSON.stringify(stud));
  }

  studOne(lrn: any) {
    return this.http.get(this.url + 'studProfile.php?LRN=' + lrn);
  }

  StudLogin(log: any) {
    return this.http.post(this.url + 'login.php', JSON.stringify(log));
  }

  studProfile(LRN: any) {
    return this.http.get(this.url + 'studProfile.php?LRN=' + LRN);
  }

  updateProfile(LRN: any) {
    return this.http.post(this.url + 'updateProfile.php', JSON.stringify(LRN));
  }

  updateEnrollment(LRN: any) {
    return this.http.post(this.url + 'updateEnrollment.php', JSON.stringify(LRN));
  }
}
