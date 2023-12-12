import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService)
  const router = inject(Router);

  if(auth.isAuthenticated()){
    return true
  }
  else {
    alert('Access Denied')
    router.navigate(['login'])
    return false;
  }


};
