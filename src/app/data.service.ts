import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new BehaviorSubject<any>(null);
  currentData = this.dataSubject.asObservable();

  changeData(data: any): void {
    this.dataSubject.next(data);
  }

}
