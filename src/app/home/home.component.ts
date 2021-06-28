import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private shared: SharedService) {}

  ngOnInit(): void {}

  showLoader(): void {
    this.shared.loadingSubject.next(true);
    setTimeout(() => {
      this.shared.loadingSubject.next(false);
    }, 5000);
  }
}
