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

  // localStorage.setItem("LRN",result.lrn);
  // localStorage.setItem("regdate",result.regdate);
  // localStorage.setItem("Name",result.name);

  studLRN = {id:localStorage.getItem('LRN')}
  studName = {name:localStorage.getItem('Name')}

  studData:any;

  constructor(
    private route: Router,
  ) {}

  ngOnInit(): void {

    console.log(this.studLRN.id)
    console.log(this.studName.name)

  }

  logout() {
    // const confirmation = confirm("Do you want to Log-out?")
    // if(confirmation) {
      localStorage.removeItem('LRN')
      localStorage.removeItem('enrol_id')
      localStorage.removeItem('regdate')
      localStorage.removeItem('Name')

      this.route.navigate(['/login'])
    // }
  }
}
