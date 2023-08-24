import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css'],
})
export class StudentprofileComponent {
  studLRN = { studLRN: localStorage.getItem('LRN') };

  alert = false;

  personinfo = new FormGroup({
    LRN: new FormControl(),
    fname: new FormControl(null),
    mname: new FormControl(null),
    lname: new FormControl(null),
    bdate: new FormControl(null),
    gender: new FormControl(null),
    address: new FormControl(null),
    birthplace: new FormControl(null),
    religion: new FormControl(null),
    mother_name: new FormControl(null),
    father_name: new FormControl(null),
    occupation: new FormControl(null),
  });

  students: any;
  constructor(private post: EnrollmentService, private route: Router) {}

  ngOnInit(): void {
    console.log(this.studLRN.studLRN);

    this.post.studProfile(this.studLRN.studLRN).subscribe((result: any) => {
      console.log(result);
      this.students = result;

      this.personinfo.controls['LRN'].setValue(this.students[0].LRN);
      this.personinfo.controls['fname'].setValue(this.students[0].fname);
      this.personinfo.controls['mname'].setValue(this.students[0].middle);
      this.personinfo.controls['lname'].setValue(this.students[0].lname);
      this.personinfo.controls['bdate'].setValue(this.students[0].bdate);
      this.personinfo.controls['gender'].setValue(this.students[0].gender);
      this.personinfo.controls['address'].setValue(this.students[0].address);
      this.personinfo.controls['birthplace'].setValue(this.students[0].birthplace);
      this.personinfo.controls['religion'].setValue(this.students[0].religion);
      this.personinfo.controls['mother_name'].setValue(this.students[0].mother_name);
      this.personinfo.controls['father_name'].setValue(this.students[0].father_name);
      this.personinfo.controls['occupation'].setValue(this.students[0].parent_occupation);
    });
  }

  updateProfile() {
    console.log(this.personinfo.value);

    this.post.updateProfile(this.personinfo.value).subscribe((result: any) => {
      console.log(result);
      if (result == 'ok') {
        this.route.navigate(['/home/tracking/enrollmentdata'])
      }
    });
  }
}
