import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CounterService {

  private _count = 0; //tslint:disable-line
  private counterHandle: number;

  get count() {
    return this._count;
  }

  increment() {
    this._count++;
    console.log('Service: counter increased: ' + this._count);
  }

  start() {
    this.counterHandle = setInterval(() => this.increment(), 1000);
  }

  stop() {
    clearInterval(this.counterHandle);
  }


}

