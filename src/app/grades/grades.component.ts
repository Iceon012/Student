import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent {

  stud_roster: any

  Grade = new FormGroup ({
    input: new FormControl(0),
    input2: new FormControl(0),
    input3: new FormControl(0),
    input4: new FormControl(0)
  })
  condition: boolean = true; // Set your condition. True means the event will be handled.

  constructor(private get: EnrollmentService) {}

  ngOnInit(): void {
    this.get.getGrades().subscribe((Grades:any)=>{
      console.log(Grades)
      this.Grade.controls['input'].setValue(Grades[0].first_grading);
      this.Grade.controls['input2'].setValue(Grades[0].second_grading);
      this.Grade.controls['input3'].setValue(Grades[0].third_grading);
      this.Grade.controls['input4'].setValue(Grades[0].fourth_grading);

      this.stud_roster = Grades
    })
  }

  conditionalKeyup(event: any) {
    if (this.condition) {
      this.onKeyup(event);
    }
  }

  conditionalKeyup2(event: any) {
    if (this.condition) {
      this.onKeyup2(event);
    }
  }

  conditionalKeyup3(event: any) {
    if (this.condition) {
      this.onKeyup3(event);
    }
  }

  conditionalKeyup4(event: any) {
    if (this.condition) {
      this.onKeyup4(event);
    }
  }

  onKeyup(event: any) {
    this.Grade.controls['input'].setValue(event.target.value)

    this.get
      .GradesOne(this.Grade.value)
      .subscribe((result: any) => {
        console.log(result);
      });
  }

  onKeyup2(event: any) {
    this.Grade.controls['input2'].setValue(event.target.value)

    this.get
      .GradesOne(this.Grade.value)
      .subscribe((result: any) => {
        console.log(result);
      });
  }

  onKeyup3(event: any) {
    this.Grade.controls['input3'].setValue(event.target.value)

    this.get
      .GradesOne(this.Grade.value)
      .subscribe((result: any) => {
        console.log(result);
      });
  }

  onKeyup4(event: any) {
    this.Grade.controls['input4'].setValue(event.target.value)

    this.get
      .GradesOne(this.Grade.value)
      .subscribe((result: any) => {
        console.log(result);
      });
  }

}
