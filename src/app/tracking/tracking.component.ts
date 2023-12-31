import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
})
export class TrackingComponent implements OnInit {
  studGrade = {grade:localStorage.getItem('')}
  studLRN = { LRN: localStorage.getItem('LRN') };
  studName = {name:localStorage.getItem('Name')}

  studData: any;

  constructor(
    private post: EnrollmentService,
    private route: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.currentData.subscribe(data => {
      if (data) {
        console.log(data);
        this.studData = data;
        // this.handleRouting();
      }
    });

    this.post
      .studProfile(this.studLRN.LRN)
      .pipe(
        tap((result: any) => {
          console.log(result);
          this.studData = result;
          localStorage.setItem('studentData', JSON.stringify(this.studData));
          this.handleRouting();
        }),
        catchError((error) => {
          console.error('Error fetching student profile:', error);
          return of([]);
        })
      )
      .subscribe();
  }

  handleRouting() {
    // Set the local storage item once, since it's used in every condition
    localStorage.setItem('enrol_id', this.studData[0].enrol_id);

    if (this.studData[0].regapproval_date !== null) {
      this.route.navigate(['/home/tracking/approved']);
    }

    else if (this.studData[0].payment_approval !== null) {
      this.route.navigate(['/home/tracking/payment']);
    }

    else if (this.studData[0].date_of_payment !== null) {
      this.route.navigate(['/home/tracking/tuition-fees']);
    }

    else if (this.studData[0].date_register !== null) {
      this.route.navigate(['/home/tracking/studentprofile']);
    }

    else {
        this.route.navigate(['/home/tracking/studentprofile']);
    }
}

}
