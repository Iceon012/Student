import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  err = false
  warn = false

  login = new FormGroup({
    email : new FormControl(null),
    password : new FormControl(null),
  })

  constructor(private post: EnrollmentService, private route:Router) {}

  ngOnInit(): void{
    console.log(this.login.value)
  }

  onLogin() {

    this.post.StudLogin(this.login.value).subscribe((result:any)=>{
      console.log(result.name);

      if(result.error == "err") {
        this.err = !this.err
      }
      else if(result.regdate != null) {
        this.err = false
        localStorage.setItem("LRN",result.lrn);
        localStorage.setItem("regdate",result.regdate);
        localStorage.setItem("Name",result.name);
        this.route.navigate(['/dash']);
      }
      else {
        this.err = false
        localStorage.setItem("Name",result.name);
        localStorage.setItem("LRN",result.lrn);
        this.route.navigate(['/home']);
      }
    });

  }

}
