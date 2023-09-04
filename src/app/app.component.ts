import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  title = 'ARS';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    initFlowbite();
  }
}
