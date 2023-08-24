import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
})
export class TrackingComponent implements OnInit {
  studLRN = { LRN: localStorage.getItem('LRN') };

  constructor(private post: EnrollmentService, private route: Router) {}

  studData: any;
  paymentapproved = false;
  registration_approval = false;

  ngOnInit(): void {
    this.post.studProfile(this.studLRN.LRN)
      .pipe(
        tap((result: any) => {
          this.studData = result;

          if (this.studData[0]?.regapproval_date || this.studData[0]?.payment_approval) {
            this.registration_approval = true;
            this.route.navigate(['/home/tracking/tuition-fees']);
          } else if (this.studData[0]?.regapproval_date === null) {
            this.route.navigate(['/home/tracking/studentprofile']);
          }
        }),
        catchError(error => {
          console.error("Error fetching student profile:", error);
          return of([]);
        })
      )
      .subscribe();
  }
}
