import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { EnrollmentService } from '../enrollment.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proof',
  templateUrl: './proof.component.html',
  styleUrls: ['./proof.component.css'],
})
export class ProofComponent {
  isOpen = false;
  viewImg: any;


  // Emit an event when approval is done
  @Output() approved = new EventEmitter<void>();

  isEditable = true;

  enrol_id = { id: localStorage.getItem('enrol_id') };
  storedArray = { tuition: localStorage.getItem('tuition') };

  url: any;
  image: any;
  tuitionData: any;
  selectedFile: any;
  uploading: any;
  progress: any;
  images: any;
  en_id: any;
  proof: any;
  payment: any;

  showBTN = false;

  constructor(
    private http: HttpClient,
    private post: EnrollmentService,
    private route: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.post.getProof(this.enrol_id.id).subscribe((result: any) => {
      console.log(result.data);
      this.images = result.data;
    });

    this.tuitionData = this.storedArray.tuition
      ? JSON.parse(this.storedArray.tuition)
      : [];

    console.log(this.enrol_id.id);
    console.log(this.tuitionData);

    this.post.getData(this.enrol_id.id).subscribe((result: any) => {
      this.dataService.changeData(result.data);
    });
  }

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

  paymentData(event: any) {
    console.log(event.target.value)
    this.payment = event.target.value
  }

  //View
  onPost() {
    console.log(this.image.name);
    const fd = new FormData();
    if (this.image.name != null) {
      console.log(this.image.name);
      this.uploading = true;

      fd.append('files', this.image);
      fd.append('enrol_id', this.enrol_id?.id?.toString() || '');
      fd.append('payment', this.payment)


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
            console.log(this.progress);
            this.ngOnInit();
          }
          if (event.type == HttpEventType.Response) {
            this.images = event.body.pics;
            this.ngOnInit();
            console.log(event);
            this.showBTN = false
            this.url = null
          }
        });
    }
  }

  viewImage(img: any) {
    this.isOpen = true;
    this.viewImg = img;
    console.log(img);
  }

  openModal(): void {
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
  }

  approve(): void {
    // Handle approval logic here, if any.
    this.approved.emit();
    this.closeModal();
  }
}
