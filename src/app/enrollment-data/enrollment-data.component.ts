// Angular imports
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// Service imports
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrollment-data',
  templateUrl: './enrollment-data.component.html',
  styleUrls: ['./enrollment-data.component.css'],
})
export class EnrollmentDataComponent {
  studLRN = { studLRN: localStorage.getItem('LRN') };

  enrolldata = new FormGroup({
    LRN: new FormControl(this.studLRN.studLRN),
    grade: new FormControl(null),
    strand: new FormControl(null),
    guardian_name: new FormControl(null),
    contact_no: new FormControl(null),
    last_attended: new FormControl(null),
    sector: new FormControl(null),
  });

  students: any;
  selectedValue: any;
  strands: any;
  
  constructor(private post: EnrollmentService, private route:Router) {}

  ngOnInit(): void {
    this.fetchStudentProfile();
  }
  
  selectedGrade(grade: any) {
    this.selectedValue = grade.target.value;
    this.updateStrandBasedOnGrade();
    console.log(this.selectedValue);
  }

  selectedStrand(strand: any) {
    console.log(strand.target.value);
  }

  onSubmitData() {
    console.log(this.enrolldata.value);
    this.post.updateEnrollment(this.enrolldata.value).subscribe((result: any) => {
      console.log(result);
    });
  }

  private fetchStudentProfile(): void {
    this.post.studProfile(this.studLRN.studLRN).subscribe((result: any) => {
      this.students = result;

      console.log(this.students)
      
      this.strands = this.students[0]?.grade_level === '11' || this.students[0]?.grade_level === '12';

      if(this.students[0]?.regapproval_date !== null) {
        this.route.navigate(['/home/tracking/tuition-fees']);
      }
      else {
        if (!this.strands || (this.selectedValue !== '11' && this.selectedValue !== '12')) {
          this.enrolldata.controls['strand'].setValue(null);
        } else {
          this.enrolldata.controls['strand'].setValue(this.students[0]?.strand);
        }
      }

      this.enrolldata.controls['grade'].setValue(this.students[0]?.grade_level);
      this.enrolldata.controls['strand'].setValue(this.students[0]?.strand);
      this.enrolldata.controls['guardian_name'].setValue(this.students[0]?.guardian_name);
      this.enrolldata.controls['contact_no'].setValue(this.students[0]?.contact_no);
      this.enrolldata.controls['last_attended'].setValue(this.students[0]?.last_attended);
      this.enrolldata.controls['sector'].setValue(this.students[0]?.sector);
      
    });
  }

  private updateStrandBasedOnGrade(): void {
    this.strands = this.selectedValue === '11' || this.selectedValue === '12';
    if (!this.strands) {
      this.enrolldata.controls['strand'].setValue(null);
    } else {
      this.enrolldata.controls['strand'].setValue(this.students[0]?.strand);
    }
  }
}
