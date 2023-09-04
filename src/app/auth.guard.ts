import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('LRN');
  const regdate = localStorage.getItem('regdate');
  const storedArray = localStorage.getItem("tuition");

  const router = inject(Router);
  if(token || storedArray || regdate) {
    return true;
  }
  else {
    router.navigate(['login'])
    return false;
  }  
};
