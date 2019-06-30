lesson('About the Creation of Observables with Creation Functions',  () => {

  learn('that *of* creates an Observable with distinct values', () =>  {

    const {of, range} = rxjs;
    const result = [];

    const value$ = of(42, 'abc', ['a', 42 , true]);

    // TASK: Try the *range* creation function
    // const value$ = range(4,3);

    value$.subscribe(
      value => result.push(value),
    );

    expect(result).toEqual(FILL_ME_IN);
  });

  learn('that *from* converts JavaScript objects into Observables', (done) =>  {

    const {from, fromEvent} = rxjs;
    const {take} = rxjs.operators;
    const result = [];

    const value$ = from(['a', 42 , true]);

    // TASK: from a promise
    // const value$ = from(new Promise((resolve) => setTimeout(() => resolve(42), 10)));

    // TASK: from an event
    // const newButton = document.createElement('button');
    // const value$ = fromEvent(newButton, 'click').pipe(take(1));
    // setTimeout(() => newButton.click(), 0);

    value$.subscribe(
      value => result.push(value),
      error => console.log('ERROR', error),
      () => {
        expect(result).toEqual(FILL_ME_IN);
        done();
      }
    );
  });


  learn('that *interval* creates an Observable that asynchronously emits a count', (done) =>  {

    const {interval, timer} = rxjs;
    const {take} = rxjs.operators;
    const result = [];

    const value$ = interval(10).pipe(take(5));

    // TASK: Try the *timer* function
    // const value$ = timer(100);

    value$.subscribe(
      value => result.push(value),
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 200);
  });

});

lesson('About manually creating an Observable',  () => {

  learn('that an Observable closes over a value producer function (sync)', () =>  {

    const {Observable} = rxjs;
    const result = [];

    // Note: Below You can use Observable.create() instead of the constructor
    // const value$ = new Observable(function(observer){
    const value$ = new Observable(function(observer){
      observer.next('a');
      observer.next('b');
      observer.next('c');
      // observer.error('ERROR'); // TASK: emit an error
      observer.complete();
      // observer.next('42'); // TASK: try to emit a value after completion/error

    });

    value$.subscribe(
      value => result.push(value),
      error => result.push(error),
      () => result.push('COMPLETED'),
    );

    expect(result).toEqual(FILL_ME_IN);
  });

  learn('that an Observable closes over a value producer function (async)', (done) =>  {

    const {Observable} = rxjs;
    const result = [];

    const value$ = new Observable(function(observer){
      setTimeout(() => observer.next('x'), 10);
      setTimeout(() => observer.next('y'), 20);
      setTimeout(() => observer.next('z'), 30);
      // setTimeout(() => observer.error('ERROR'), 40); // TASK: emit an error
      setTimeout(() => observer.complete(), 60);
      setTimeout(() => observer.next('z'), 70); // TASK: try to emit a value after completion/error
    });

    value$.subscribe(
      value => result.push(value),
      error => result.push(error),
      () => result.push('COMPLETED'),
    );

    setTimeout(() =>  {
      expect(result).toEqual(FILL_ME_IN);
    }, 50);

    setTimeout(() =>  {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 100);
  });


});
