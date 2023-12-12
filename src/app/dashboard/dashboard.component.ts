import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  studLRN = {id:localStorage.getItem('LRN')}
  studName = {name:localStorage.getItem('Name')}

  constructor(private route: Router) {}

  ngOnInit(): void{
    console.log(this.studLRN.id)
    console.log(this.studName.name)
  }

  logout() {
    localStorage.removeItem('LRN')
    localStorage.removeItem('Name')
    localStorage.removeItem('enrol_id')
    localStorage.removeItem('regdate')

    this.route.navigate(['/login'])
  }

}
