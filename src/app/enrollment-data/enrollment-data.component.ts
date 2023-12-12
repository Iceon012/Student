// Angular imports
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// Service imports
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-enrollment-data',
  templateUrl: './enrollment-data.component.html',
  styleUrls: ['./enrollment-data.component.css'],
})
export class EnrollmentDataComponent {
  studLRN = { studLRN: localStorage.getItem('LRN') };
  enrol_id = { id: localStorage.getItem('enrol_id') };


  @Output() dataToParent = new EventEmitter<string>();


  enrolldata = new FormGroup({
    LRN: new FormControl(this.studLRN.studLRN),
    grade: new FormControl(null),
    strand: new FormControl(null),
    guardian_name: new FormControl(null),
    contact_no: new FormControl(null),
    last_attended: new FormControl(null),
  });

  students: any;
  selectedValue: any;
  strands: any;
  alertData = false

  constructor(private post: EnrollmentService, private http: HttpClient,  private route: Router,  private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchStudentProfile();
  }

  selectedGrade(grade: any) {
    this.selectedValue = grade.target.value;
    this.updateStrandBasedOnGrade();
    console.log(this.selectedValue);
  }

  selectedStrand(strand: any) {
    console.log(strand.target.value);
  }

  onSubmitData() {
    console.log(this.enrolldata.value);
    this.post
      .updateEnrollment(this.enrolldata.value)
      .subscribe((result: any) => {
        console.log(result);
        if(result.msg == "Success") {
          this.alertData = !this.alertData
            this.onPost()
            this.showBTN = true
            // this.route.navigate(['/home/tracking/tuition-fees']);
            this.dataService.changeData(result.data);
            console.log(result)
        }
      });
  }

  getReq: any
  private fetchStudentProfile(): void {
    this.post.getRequirements(this.studLRN.studLRN).subscribe((img: any) => {
      this.getReq = img
      console.log(this.getReq)
    })
    this.post.studProfile(this.studLRN.studLRN).subscribe((result: any) => {
      this.students = result;

      console.log(this.students);

      if(this.students[0]?.regapproval_date !== null) {
        // this.route.navigate(['/home/tracking/tuition-fees'])
      }

      this.strands =
        this.students[0]?.grade_level === '11' ||
        this.students[0]?.grade_level === '12';

      if (
        !this.strands ||
        (this.selectedValue !== '11' && this.selectedValue !== '12')
      ) {
        this.enrolldata.controls['strand'].setValue(null);
      } else {
        this.enrolldata.controls['strand'].setValue(this.students[0]?.strand);
      }

      this.enrolldata.controls['grade'].setValue(this.students[0]?.grade_level);
      this.enrolldata.controls['strand'].setValue(this.students[0]?.strand);
      this.enrolldata.controls['guardian_name'].setValue(
        this.students[0]?.guardian_name
      );
      this.enrolldata.controls['contact_no'].setValue(
        this.students[0]?.contact_no
      );
      this.enrolldata.controls['last_attended'].setValue(
        this.students[0]?.last_attended
      );
    });
  }

  private updateStrandBasedOnGrade(): void {
    this.strands = this.selectedValue === '11' || this.selectedValue === '12';
    if (!this.strands) {
      this.enrolldata.controls['strand'].setValue(null);
    } else {
      this.enrolldata.controls['strand'].setValue(this.students[0]?.strand);
    }
  }

  url:any
  image: any
  showBTN = false
  uploading: any
  progress: any
  images: any


  onFileSelected(e: any) {
    console.log(e);
    if (e.target.files) {
      console.log(e.target.files);
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      this.image = e.target.files[0];
      console.log(this.image);

      if (this.image != null) {
        this.showBTN = true;
      }
    }
  }

  onPost() {
    console.log(this.image.name);
    const fd = new FormData();
    if (this.image.name != null) {
      console.log(this.image.name);
      this.uploading = true;

      fd.append('files', this.image);
      fd.append('lrn', this.studLRN?.studLRN?.toString() || '');


      console.log(fd);

      this.http
        .post('http://localhost/nlacacademy/uploadRequirements.php', fd, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe((event: any) => {
          console.log(event);
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = (event.loaded / event.total) * 100;
            console.log(this.progress);
            this.ngOnInit();
          }
          if (event.type == HttpEventType.Response) {
            this.images = event.body.pics;
            this.ngOnInit();
            console.log(event);
            this.url = null
            this.showBTN = false
          }
        });
    }
  }
}
