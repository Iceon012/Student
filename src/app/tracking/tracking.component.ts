import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import {  of } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
})
export class TrackingComponent implements OnInit {
  studLRN = { LRN: localStorage.getItem('LRN') };

  subscription: any;

  constructor(private post: EnrollmentService, private route: Router, private dataService: DataService) {}

  studData: any;

  ngOnInit(): void {

    this.dataService.currentData.subscribe(data => {
      if (data) {
        console.log(data);
        this.studData = data
      }
    });

    // console.log(this.subscription)
    this.post
      .studProfile(this.studLRN.LRN)
      .pipe(
        tap((result: any) => {
          this.studData = result;
          console.log(this.studData);

          if (this.studData[0]?.date_of_payment != null) {

            localStorage.setItem('enrol_id', this.studData[0].enrol_id);
            this.route.navigate(['/home/tracking/proof']);
          } 
          // else if (
          //   this.studData[0]?.regapproval_date ||
          //   this.studData[0]?.payment_approval
          // ) {
          //   this.registration_approval = true;
          //   this.route.navigate(['/home/tracking/tuition-fees']);
          // } else if (this.studData[0]?.regapproval_date === null) {
          //   this.route.navigate(['/home/tracking/studentprofile']);
          // }
        }),
        catchError((error) => {
          console.error('Error fetching student profile:', error);
          return of([]);
        })
      )
      .subscribe();
  }
}
