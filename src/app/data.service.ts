import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost/nlacacademy/displayGrades.php';

  private dataSubject = new BehaviorSubject<any>(null);
  currentData = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  changeData(data: any): void {
    this.dataSubject.next(data);
  }

  getStudents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
