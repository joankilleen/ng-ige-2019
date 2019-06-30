import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ObservableCounterService {

  private count = 0;
  private counterSubject = new BehaviorSubject(this.count);
  public readonly counter$: Observable<number> = this.counterSubject.asObservable();
  private counterHandle: number;

  start() {
    this.counterHandle = setInterval(() => this.increment(), 1000);
  }

  stop() {
    clearInterval(this.counterHandle);
  }

  increment() {
    this.count++;
    console.log('Service: counter increased: ' + this.count);
    this.counterSubject.next(this.count);
  }


}

