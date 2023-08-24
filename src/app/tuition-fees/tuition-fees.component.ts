import { Component } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-tuition-fees',
  templateUrl: './tuition-fees.component.html',
  styleUrls: ['./tuition-fees.component.css']
})
export class TuitionFeesComponent {
  studLRN = { studLRN: localStorage.getItem('LRN') };

  constructor(private post: EnrollmentService) {}

  studData : any

  ngOnInit(): void {
    console.log(this.studLRN.studLRN);

    this.post.studProfile(this.studLRN.studLRN).subscribe((result: any) => {
      console.log(result);
      this.studData = result
    });
  }
}
