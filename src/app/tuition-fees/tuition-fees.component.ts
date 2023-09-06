import { Component, OnInit } from '@angular/core';
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
  studData: any;
  tuitionAndFees: Tuition[] = [];

  constructor(
    private post: EnrollmentService,
    private route: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.fetchStudentProfile();
  }

  fetchStudentProfile(): void {
    console.log(this.studLRN.studLRN);
    this.post.studProfile(this.studLRN.studLRN).subscribe(
      (result: any) => {
        console.log(result);
        this.studData = result;
        this.setTuitionBasedOnGrade();
      },
      (error) => {
        console.error('There was an error fetching studProfile:', error);
      }
    );
  }

  setTuitionBasedOnGrade(): void {
    const grade = this.studData[0].grade_level;
    const juniorHigh = ['7', '8', '9', '10'];
    const seniorHigh = ['11', '12'];

    if (juniorHigh.includes(grade)) {
      this.addJuniorHighTuition();
    } else if (seniorHigh.includes(grade)) {
      const sector = this.studData[0].sector;
      this.addSeniorHighTuition(sector);
    }
  }

  addJuniorHighTuition(): void {
    this.tuitionAndFees.push({
      old_acct: 0.0,
      tuition_fees: 16143.55,
      gen_fee: 7970.86,
      lms_fee: 1750.0,
      school_subsidy: 0.00,
      esc: 9000.0,
    });
  }

  addSeniorHighTuition(sector: string): void {
    const baseTuition = {
      old_acct: 0.00,
      tuition_fees: 16143.55,
      gen_fee: 7221.30,
      lms_fee: 0.0,
      school_subsidy: 4114.85,
      esc: (sector === 'Public') ? 17500.0 : 14000.0,
    };
    this.tuitionAndFees.push(baseTuition);
  }

  fees(): void {


    if(this.studData[0].payment_approval !== null)
    {
      console.log(this.tuitionAndFees);
      localStorage.setItem('enrol_id', this.studData[0].enrol_id);
      localStorage.setItem('tuition', JSON.stringify(this.tuitionAndFees));
      this.route.navigate(['/home/tracking/payment']);
    }
    else {
      console.log(this.tuitionAndFees);
      localStorage.setItem('enrol_id', this.studData[0].enrol_id);
      localStorage.setItem('tuition', JSON.stringify(this.tuitionAndFees));
      this.route.navigate(['/home/tracking/proof']);
    }
  }
}
