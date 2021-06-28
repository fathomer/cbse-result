import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private shared: SharedService) { }
  showLoader: boolean = false;
  ngOnInit(): void {
    this.shared.loadingSubject.subscribe(data => {
      this.showLoader = data;
    });
  }

}
