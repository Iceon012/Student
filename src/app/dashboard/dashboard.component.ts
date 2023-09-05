import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  studLRN = {id:localStorage.getItem('LRN')}

  
  ngOnInit(): void{
    console.log(this.studLRN.id)
  }

}
