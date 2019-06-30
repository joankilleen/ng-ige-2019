console.log('Running example ...');

/// API:
// http://localhost:3456/todos
// https://swapi.co/api/people/1/
// // importing Rx
// const {of, from, throwError, fromEvent, interval, merge, zip} = rxjs;
// const {filter, map, delay, mergeMap} = rxjs.operators;
// const {ajax} = rxjs.ajax;

// ***
// Synchronous Observables:
// ***

const {Observable, of, from, throwError, fromEvent, interval, merge, zip} = rxjs;

of(1, 2, 3, 4, 5)
  .subscribe(
    value => console.log(value),
  );
console.log('Done 1');


from(['a', 'b', 'c', 'd'])
  .subscribe(
    value => console.log(value),
  );
console.log('Done 2');


const syncValue$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

syncValue$
  .subscribe(
    x => console.log(x),
  );
console.log('Done 3');


// ***
// Asynchronous Observables:
// ***

interval(1000)
  .subscribe(
    value => console.log('Observable 4: ' + value),
  );
console.log('Done 4');


const button = document.getElementById('clicker');

fromEvent(button, 'click')
  .subscribe(
    value => console.log('Clicked: ' + value),
  );

const asyncValue$ = new Observable(observer => {
  setTimeout(() =>  observer.next('hi - ' + new Date()), 1000);
  setTimeout(() =>  observer.next('hi - ' + new Date()), 2000);
  setTimeout(() =>  observer.next('hi - ' + new Date()), 3000);
});

asyncValue$.subscribe(x => console.log(x));
