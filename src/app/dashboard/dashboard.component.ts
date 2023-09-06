import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  studLRN = {id:localStorage.getItem('LRN')}
  studName = {name:localStorage.getItem('Name')}

  
  ngOnInit(): void{
    console.log(this.studLRN.id)
    console.log(this.studName.name)
  }

}
