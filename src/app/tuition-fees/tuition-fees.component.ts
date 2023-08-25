import { Component } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tuition-fees',
  templateUrl: './tuition-fees.component.html',
  styleUrls: ['./tuition-fees.component.css']
})
export class TuitionFeesComponent {
  studLRN = { studLRN: localStorage.getItem('LRN') };

  constructor(private post: EnrollmentService, private route: Router) {}

  studData : any

  ngOnInit(): void {
    console.log(this.studLRN.studLRN);

    this.post.studProfile(this.studLRN.studLRN).subscribe((result: any) => {
      console.log(result);
      this.studData = result
    });
  }

  fees() {
    localStorage.setItem("enrol_id", this.studData[0].enrol_id)
    this.route.navigate(['/home/tracking/proof'])
  }
}
