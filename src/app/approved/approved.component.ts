import { Component } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent {

  schedData: any
  studLRN = { studLRN: localStorage.getItem('LRN') };
  enrol_id = { id: localStorage.getItem('enrol_id') };
  studName = {name:localStorage.getItem('Name')}
  studentData = {data:localStorage.getItem('studentData')}

  dataStud : any

  Mon : any
  Tues : any
  Wed : any
  Thurs : any
  Fri : any


  constructor(private get: EnrollmentService) {

  }
  ngOnInit(): void {
    this.dataStud =  this.studentData.data
    ? JSON.parse(this.studentData.data)
    : [];
    console.log(this.studLRN.studLRN, this.studName.name, this.dataStud)
    this.get.getSchedule(this.studLRN.studLRN).subscribe((result:any) => {
      console.log(result)
      this.schedData = result

      this.Mon = this.schedData.filter((item:any) => item.day == 'Mon')
      console.log(this.Mon)
      this.Tues = this.schedData.filter((item:any) => item.day == 'Tues')
      console.log(this.Tues)
      this.Wed = this.schedData.filter((item:any) => item.day == 'Wed')
      console.log(this.Wed)
      this.Thurs = this.schedData.filter((item:any) => item.day == 'Thurs')
      console.log(this.Thurs)
      this.Fri = this.schedData.filter((item:any) => item.day == 'Fri')
      console.log(this.Fri)


    })
  }

}
