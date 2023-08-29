import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

export interface Tuition {
  old_acct: number;
  tuition_fees: number;
  gen_fee: number;
  lms_fee: number;
  school_subsidy: number;
  esc: number;
}

@Component({
  selector: 'app-tuition-fees',
  templateUrl: './tuition-fees.component.html',
  styleUrls: ['./tuition-fees.component.css'],
})
export class TuitionFeesComponent implements OnInit {
  studLRN = { studLRN: localStorage.getItem('LRN') };

  // @Output() dataToParent = new EventEmitter<string>();

  tuition: any

  studData: any;
  tuitionAndFees: Tuition[] = []; // initialize the array

  constructor(private post: EnrollmentService, private route: Router, private dataService: DataService) {}

  ngOnInit(): void {
    console.log(this.studLRN.studLRN);

    this.post.studProfile(this.studLRN.studLRN).subscribe(
      (result: any) => {
        console.log(result);
        this.studData = result;
        // Grade level check
        if (
          this.studData[0].grade_level === '7' ||
          this.studData[0].grade_level === '8' ||
          this.studData[0].grade_level === '9' ||
          this.studData[0].grade_level === '10'
        ) {
          // Corrected how you add data to the tuitionAndFees array
          this.tuitionAndFees.push({
            old_acct: 0.0,
            tuition_fees: 16143.55,
            gen_fee: 7970.86,
            lms_fee: 1750.0,
            school_subsidy: 0.00,
            esc: 9000.0,
          });
        } else if (
          this.studData[0].grade_level === '11' ||
          this.studData[0].grade_level === '12'
        ) {
          // Corrected how you add data to the tuitionAndFees array
          
            if(this.studData[0].sector === 'Public') {
              this.tuitionAndFees.push({
                old_acct: 0.00,
                tuition_fees: 16143.55,
                gen_fee: 7221.30,
                lms_fee: 0.0,
                school_subsidy: 4114.85,
                esc: 17500.0,
              });
            }
            else {
              this.tuitionAndFees.push({
                old_acct: 0.00,
                tuition_fees: 16143.55,
                gen_fee: 7221.30,
                lms_fee: 0.0,
                school_subsidy: 4114.85,
                esc: 14000.0,
              });
            }
        }
      },
      (error) => {
        console.error('There was an error fetching studProfile:', error);
      }
    );
  }

  fees() {
    localStorage.setItem('enrol_id', this.studData[0].enrol_id);
    this.route.navigate(['/home/tracking/proof']);

    this.dataService.changeData(this.studData);
  }
}
