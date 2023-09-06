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
  studLRN = { LRN: localStorage.getItem('LRN') };
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
    if (this.studData[0].date_of_payment !== null) {
      this.route.navigate(['/home/tracking/proof']);
    }
    else if (this.studData[0].date_of_payment === null) {
      this.route.navigate(['/home/tracking/tuition-fees']);
    } else if (this.studData[0].regapproval_date !== null) {
        this.route.navigate(['/home/tracking/approved']); 
    } 
}

}
