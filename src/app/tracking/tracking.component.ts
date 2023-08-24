import { Component } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
})
export class TrackingComponent {
  studLRN = { LRN: localStorage.getItem('LRN') };

  constructor(private post: EnrollmentService, private route: Router) {}

  studData: any;
  paymentappoved = false;
  registration_approval = false;

  ngOnInit(): void {
    // console.log(this.studLRN.studLRN);

    this.post.studProfile(this.studLRN.LRN).subscribe((result: any) => {
      this.studData = result;

      if (this.studData[0].regapproval_date != null || this.studData[0].payment_approval != null) {
        this.registration_approval = !this.registration_approval;

        this.route.navigate(['/home/tracking/tuition-fees']); 
      } 
      else if (this.studData[0].regapproval_date === null) {
        this.route.navigate(['/home/tracking/studentprofile']);
      }
    });
  }
}
