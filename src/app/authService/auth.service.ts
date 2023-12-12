import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false

  isAuthenticated() {
    if(localStorage.getItem('LRN') != undefined) {
      this.isLogin = true
    }
    return this.isLogin;
  }
}
