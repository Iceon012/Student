import { Component } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  enrol_id = { id: localStorage.getItem('enrol_id') };

  en_id:any
  images: any
  pay: any

  constructor(private post: EnrollmentService, private route: Router, private dataService: DataService) {}

  ngOnInit(): void {
    console.log(this.enrol_id.id);
    this.en_id = this.enrol_id.id;
    
    this.post.getData(this.en_id).subscribe((result: any) => {
      this.images = result.data;
      console.log(this.images);
      // this.dataService.changeData(this.images);
      
    });

    this.post.getProof(this.en_id).subscribe((payment: any) => {
      console.log(payment.data)

      this.pay = payment.data
    });
  }
}
