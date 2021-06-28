import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loadingSubject: Subject<any> = new Subject<any>();
  constructor() { }
}
