import { Component } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent {

  studLRN = {studLRN:localStorage.getItem("LRN")};

  referenceData : any;

  constructor(private post: EnrollmentService) {}

  ngOnInit(): void {
    console.log(this.studLRN.studLRN)

    this.post.studOne(this.studLRN.studLRN).subscribe((result: any) => {
      console.log(result)
      this.referenceData = result
    });
  }

}
