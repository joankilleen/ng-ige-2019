lesson('about transforming a stream into another stream', () => {

  learn('how to map each input values to a new output value', (done) => {

    const {interval} = rxjs;
    const {take, map} = rxjs.operators;
    const result = [];

    const source$ = interval(20).pipe(take(5)); // creates an Observable which asynchronously emits 5 values

    const target$ = source$.pipe(
      map(value => value * value),
      // TASK: experiment with some other mappings, several mappings can be chained
      // map(value => value + 1),
      // map(value => 'https://swapi.co/api/people/' + value),
      // map(value => new Date()),
    );

    target$.subscribe(
      value => result.push(value),
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 200);

  }, 10000); // this sets the async timeout


  learn('how to only pass certain values from the input to the output', (done) => {

    const {interval} = rxjs;
    const {take, filter} = rxjs.operators;
    const result = [];

    const source$ = interval(20).pipe(take(5)); // creates an Observable which asynchronously emits 5 values

    const target$ = source$.pipe(
      filter(value => value < 3),
      // TASK: experiment with some other filters
      // filter(value => value % 2 === 0),
      // filter(value =>{
      //   const now = new Date();
      //   return now.getMilliseconds() % 2 === 0;
      // }),
    );

    target$.subscribe(
      value => result.push(value),
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 200);

  });


  learn('how to perform a side effect for each value in a stream', (done) => {
    const {interval} = rxjs;
    const {take, tap, map} = rxjs.operators;
    const result = [];

    const value$ = interval(20).pipe(take(5)); // creates an Observable which asynchronously emits 5 values

    let count = 0;

    value$
      .pipe(
        tap(v => console.log('Initial', v)), // Logging is a side-effect
        map(value => value * 10),
        tap(v => console.log('First transformation', v)),
        map(value => 'https://swapi.co/api/people/' + value),
        tap(v => console.log('Second transformation', v)),
        tap(() => count++) // A real side-effect that changes state
      )
      .subscribe(
        value => result.push(value),
        () => {},
        checkCount
      );

    function checkCount() {
      expect(count).toEqual(FILL_ME_IN);
      done();
    }
  });


  learn('about some more transformations operators', (done) => {

    // Have a look at:
    // https://rxjs-dev.firebaseapp.com/api
    // http://rxmarbles.com/

    const {Observable} = rxjs;
    const {take, filter, distinctUntilChanged, debounceTime, mapTo, delay, last, takeLast, scan} = rxjs.operators;
    const result = [];

    const source$ = new Observable(function (observer) {
      setTimeout(() => observer.next(1), 10);
      setTimeout(() => observer.next(2), 15);
      setTimeout(() => observer.next(2), 20);
      setTimeout(() => observer.next(2), 30);
      setTimeout(() => observer.next(3), 40);
      setTimeout(() => observer.next(3), 50);
      setTimeout(() => observer.complete(), 80);
    });

    const target$ = source$.pipe(
      distinctUntilChanged(),

      // TASK: experiment with some other operators
      // debounceTime(8),
      // mapTo(new Date().getMilliseconds()),
      // delay(170),
      // last(), // TASK: what happens if the source$ does not complete?
      // takeLast(3), // TASK: what happens if the source$ does not complete?
      // scan((accumulator, value) => accumulator + value, 0)
    );

    target$.subscribe(
      value => result.push(value),
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 200);
  })


});
