import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  studData:any;

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
  }

  logout() {
    // const confirmation = confirm("Do you want to Log-out?")
    // if(confirmation) {
      localStorage.removeItem('LRN')
      localStorage.removeItem('enrol_id')
      localStorage.removeItem('regdate')
      this.route.navigate(['login'])
    // }
  }
}
