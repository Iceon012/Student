import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  alert = false
  alert2 = false
  LRN2: any

  strands = false

  selectedValue: any

  register = new FormGroup({
    LRN : new FormControl(null),
    lname : new FormControl(null),
    fname : new FormControl(null),
    middle : new FormControl(null),
    bdate : new FormControl(null),
    grade: new FormControl("7"),
    strand: new FormControl("ABM")
  })


  constructor(private post: EnrollmentService, private route:Router,) {}

  ngOnInit(): void {
    console.log(this.register.value)
  }

  selectedGrade(grade: any) {
    this.selectedValue = grade.target.value;
    console.log(this.selectedValue);

    if(this.selectedValue == "11" || this.selectedValue == "12" )
    {
      this.strands = !this.strands
      this.ngOnInit()
    }
    else {
      this.strands = false
    }
  }

  selectedStrand(strand: any) {
    const selectedValue = strand.target.value;
    console.log(selectedValue);
  }

  onSubmit() {
    console.log(this.register.value)
    this.post.enroll(this.register.value).subscribe((result:any)=>
    {
      console.log(result)

      if(result == "1") {
        // this.route.navigate(['/login']);
        console.log(this.register.value.LRN)
        this.LRN2 = this.register.value.LRN;
        localStorage.setItem("LRN", this.LRN2);
        this.route.navigate(['/reference']);        
      }

      else if(result == "3") {
        this.alert = !this.alert;
        // location.reload()
      }

      else if(result == "2") {
        this.alert2 = !this.alert2;
      }

    })
  }

}
