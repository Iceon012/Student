import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-proof',
  templateUrl: './proof.component.html',
  styleUrls: ['./proof.component.css']
})
export class ProofComponent {
  list = ['12:30 PM', '1:00 AM']
  isEditable = true

  studLRN = {studLRN:localStorage.getItem("LRN")};

  url = "./assets/receipt.jpg";
  image: any
  selectedFile: any
  uploading: any
  progress: any
  images: any
  LRN : any

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.studLRN.studLRN)
    this.LRN = this.studLRN.studLRN

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
      this.onPost(e.target.files[0])

    }
  }
  

  //View
  onPost(file: any) {
    const fd = new FormData();
    if (this.selectedFile != null) {
      console.log(file);
      this.uploading = true;

      fd.append('files', file);
      fd.append('pid', this.LRN);
      console.log(fd);

      this.http
        .post('http://localhost/LRMS/saveimage.php', fd, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe((event: any) => {
          console.log(event);
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = (event.loaded / event.total) * 100;
            this.ngOnInit()
            
          }
          if (event.type == HttpEventType.Response) {
            this.images = event.body.pics;
            console.log(event);
          }
        });
        
    }

    console.log(this.selectedFile)
   
  }

}
