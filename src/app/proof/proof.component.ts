import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-proof',
  templateUrl: './proof.component.html',
  styleUrls: ['./proof.component.css']
})
export class ProofComponent {
  list = ['12:30 PM', '1:00 AM']
  isEditable = true

  url = "./assets/receipt.jpg";
  image: any;

  constructor( private http: HttpClient) { }


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
  
  upload() {
    console.log(this.image)
    const fd = new FormData();
    fd.append('files', this.image);
  
    this.http.post("http://localhost/Admission/saveimages.php", fd).subscribe(
      (result:any) => {
        console.log(result);
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

}
