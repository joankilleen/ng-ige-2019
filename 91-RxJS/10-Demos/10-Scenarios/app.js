console.log('Running example ...');

const {Observable, Subject, of, from, throwError, fromEvent, interval, merge, zip} = rxjs;
const {
  take, filter, map, tap, delay, debounceTime, scan,
  mergeMap, concatMap, switchMap, share, catchError, retry
} = rxjs.operators;
const {ajax} = rxjs.ajax;


// *********
// Parallel Fetching
// *********
// const id$ = of(1, 2, 3, 4, 5, 6, 8, 9, 10);
//
// id$
//   .pipe(
//       map(id => `https://swapi.co/api/people/${id}/`),
//       mergeMap(url => ajax.get(url))
//   )
//   .subscribe(result => console.log(result.response.name));


// *********
// Sequential Fetching
// *********
// const id$ = of(1, 2, 3, 4, 5, 6, 8, 9, 10);
//
// id$
//   .pipe(
//     map(id => `https://swapi.co/api/people/${id}/`),
//     concatMap(url => ajax.get(url))
//   )
//   .subscribe(result => console.log(result.response.name));


// *********
// Nested Fetching
// *********
// const id$ = of(1);
//
// id$
//   .pipe(
//     map(id => `https://swapi.co/api/people/${id}/`),
//     mergeMap(url => ajax.get(url)),
//     tap(personResult => console.log(`Films of ${personResult.response.name}`)),
//     mergeMap(personResult => from(personResult.response.films)),
//     // tap(personResult => console.log(personResult)),
//     mergeMap(film => ajax.get(film)),
//     map(filmResult => filmResult.response.title)
//   )
//   .subscribe(result => console.log(`  ${result}`));


// *********
// Side Effect
// *********

// let count = 0;
//
// interval(200)
//   .pipe(
//     take(10),
//     tap(v => count++),
//     filter(v => v % 2 === 0)
//   )
//   .subscribe(
//     value => console.log('Even: ' + value),
//     null,
//     () => console.log('Processed: ' + count)
//   );


// *********
// Error Handling
// *********
// of(1)
//   .pipe(
//     map(id => `https://swapi.co/api/ERROR/${id}/`),
//     mergeMap(url => ajax.get(url)),
//     filter(result => result.nonexistent.property),
//     catchError(e => of('Handled', 'More'))
//   )
//   .subscribe(
//     value => console.log(value)
//   );


// *********
// Error Handling
// *********

let count = 0;
function getData(id) {
  count++;
  if(count < 4){
    return Promise.reject('Try again')
  }
  else {
    return Promise.resolve(id + ': ' + 42)
  }
}

of(1)
  .pipe(
    mergeMap(id => getData(id)),
    retry(5)
  )
  .subscribe(
    value => console.log(value)
  );


// *********
// Debouncing
// *********
// const button = document.getElementById('clicker');
//
// fromEvent(button, 'click')
//   .pipe(
//     tap(() => console.log('Click received!')),
//     debounceTime(1000)
//   )
//   .subscribe(
//     value => console.log('Processing click ...')
//   );


// *********
// Sharing a Subscription
// *********
// const value$ = interval(200)
//   .pipe(
//     take(5),
//     share()
//   );
//
// value$.subscribe(
//   value => console.log('Subscription 1:' + value),
// );
// setTimeout(() => {
//   value$.subscribe(
//     value => console.log('Subscription 2:' + value),
//   )
// }, 450);


// *********
// Avoid Subjects
// *********
// let count = 0;
// const emitter = new Subject();
//
// const button = document.getElementById('clicker');
// button.addEventListener('click', increaseAndSignal);
//
// function increaseAndSignal() {
//   count++;
//   emitter.next(count)
// }
//
// emitter
//   .subscribe(
//     value => console.log('Current count: ' + count),
//   );

// Better:
// const button = document.getElementById('clicker');
// fromEvent(button, 'click')
//   .pipe(
//     scan((acc, val) => acc + 1, 0)
//   )
//   .subscribe(
//     value => console.log('Current count: ' + value),
//   );


// *********
// SwitchMap to avoid leaks
// *********

// const button = document.getElementById('clicker');
// const click$ = fromEvent(button, 'click');
//
// const tickWhenClick$ = click$
//   .pipe(
//     mergeMap(ev => interval(500))
//   );
//
// tickWhenClick$
//   .subscribe(function (x) {
//     console.log(x);
//   });


// Better:
const button = document.getElementById('clicker');
const click$ = fromEvent(button, 'click');

const tickWhenClick$ = click$
  .pipe(
    switchMap(ev => interval(500))
  );

tickWhenClick$
  .subscribe(function (x) {
    console.log(x);
  });
