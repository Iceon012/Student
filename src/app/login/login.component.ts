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
      console.log(result);

      if(result == 0) {
        this.err = !this.err
      }
      else {
        this.err = false
        localStorage.setItem("LRN",result);
        this.route.navigate(['/home']);
      }
    });

  }

}
