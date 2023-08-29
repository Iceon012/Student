import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { EnrollmentService } from '../enrollment.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-proof',
  templateUrl: './proof.component.html',
  styleUrls: ['./proof.component.css']
})
export class ProofComponent {
  list = ['12:30 PM', '1:00 AM']
  isEditable = true

  enrol_id = {id:localStorage.getItem("enrol_id")};

  url = "./assets/receipt.jpg";
  image: any
  selectedFile: any
  uploading: any
  progress: any
  images: any
  en_id : any

  constructor( private http: HttpClient, private post: EnrollmentService, private dataService: DataService) { }

  ngOnInit(): void {
    console.log(this.enrol_id.id)
    this.post.getData(this.enrol_id.id).subscribe((result:any)=>{
      this.images = result;
      console.log(result.data);

      this.dataService.changeData(result.data);

      });
  }


  onFileSelected(e:any) {
    console.log(e)
    if(e.target.files) {
      console.log(e.target.files)
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (event: any)=>{
        this.url = event.target.result;
      }

      this.image = e.target.files[0];
      console.log(this.image)
    }
  }

  

  //View
  onPost() {
    console.log(this.image.name)
    const fd = new FormData();
    if (this.image.name != null) {
      console.log(this.image.name);
      this.uploading = true;

      fd.append('files', this.image);
      fd.append('enrol_id', this.en_id);
      console.log(fd);

      this.http
        .post('http://localhost/nlacacademy/uploadPayment.php', fd, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe((event: any) => {
          console.log(event);
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = (event.loaded / event.total) * 100;
            console.log(this.progress)
            this.ngOnInit()
          }
          if (event.type == HttpEventType.Response) {
            this.images = event.body.pics;
            console.log(event);
          }
        });
        
    }   
  }

}
