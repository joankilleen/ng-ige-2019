lesson('about combining streams into another stream', () => {

  learn('how to merge two streams', (done) => {

    const {interval, merge} = rxjs;
    const {take, delay, map} = rxjs.operators;
    const result = [];

    const source1$ = interval(50).pipe(take(5));
    const source2$ = interval(50).pipe(take(5), map(v => v*10), delay(20));

    const target$ = merge(source1$, source2$);

    target$.subscribe(
      value => result.push(value),
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 400);

  });

  learn('how to concatenate two streams', (done) => {

    const {Observable, interval, concat} = rxjs;
    const {take} = rxjs.operators;
    const result = [];

    const source1$ = interval(50).pipe(take(5));
    const source2$ = new Observable(function (observer) {
      setTimeout(() => observer.next(10), 10);
      setTimeout(() => observer.next(20), 20);
      setTimeout(() => observer.next(30), 30);
      setTimeout(() => observer.next(40), 40);
      setTimeout(() => observer.complete(), 50);
    });

    const target$ = concat(source1$, source2$);

    target$.subscribe(
      value => result.push(value),
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 400);

  });


  learn('how to prepend and append values to a stream', (done) => {

    const {Observable} = rxjs;
    const {startWith, endWith} = rxjs.operators;
    const result = [];

    const source$ = new Observable(function (observer) {
      setTimeout(() => observer.next(10), 20);
      setTimeout(() => observer.next(20), 40);
      setTimeout(() => observer.next(30), 60);
      setTimeout(() => observer.complete(), 120); // TASK: What happens if the Observable does not complete?
    });

    const target$ = source$.pipe(
      startWith(42),
      endWith('Omega')
    );

    target$.subscribe(
      value => result.push(value),
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 120);

  });


  learn('how to combine values from two streams into a new values', (done) => {

    const {Observable, interval, zip, combineLatest} = rxjs;
    const {take, withLatestFrom} = rxjs.operators;
    const result = [];

    const source1$ = interval(50).pipe(take(5));
    const source2$ = new Observable(function (observer) {
      setTimeout(() => observer.next(10), 20);
      setTimeout(() => observer.next(20), 40);
      setTimeout(() => observer.next(30), 60);
      setTimeout(() => observer.next(40), 80);
      setTimeout(() => observer.next(50), 110);
      setTimeout(() => observer.complete(), 120);
    });

    const target$ = zip(source1$, source2$);

    // TASK: experiment with other ways to combine values
    // const target$ = combineLatest(source1$, source2$);
    // const target$ = source1$.pipe(withLatestFrom(sofurce2$));

    target$.subscribe(
      value => result.push(value),
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 400);

  });

});
