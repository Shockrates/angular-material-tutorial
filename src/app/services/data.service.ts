import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subjectNotifier: Subject<void> = new Subject<void>();

  constructor() { }

  notifyAboutChange() {
    this.subjectNotifier.next();
  }
}
