lesson('about higher-order Observables: Observables of Observables', () => {

  learn('how to create an Observable which emits other Observables', (done) => {

    const {Observable, interval, of} = rxjs;
    const {take, tap, map} = rxjs.operators;
    const result = [];

    const source$ = interval(50).pipe(take(3));

    const target$ = source$.pipe(
      map(v => of(v)),
    );

    target$.subscribe(
      value => result.push(value),
    );

    setTimeout(() => {
      expect(result.length).toEqual(FILL_ME_IN);
      result.forEach(value => expect(value instanceof Observable).toBe(FILL_ME_IN)); // check the type of every value
      done();
    }, 200);

  });


  learn('that Observables emitted by higher-order Observable omit values themselves', (done) => {

    const {Observable, interval} = rxjs;
    const {take, tap, map} = rxjs.operators;
    const result = [];

    const source$ = interval(50).pipe(take(3));

    const target$ = source$.pipe(
      map(value => value + 1),
      // mapping to observables which each emit two values
      map(value => interval(20).pipe(take(2), map(innerValue => (innerValue + 1) * (10 ** value)))),
    );

    // the target observables emits inner observables
    target$.subscribe(
      value => value.subscribe(innerValue => result.push(innerValue)) // subscribing to the inner observables
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 300);

  });


  learn('that higher-order Observable can be flattened by subscribing to the inner observables directly', (done) => {

    const {Observable, interval} = rxjs;
    const {take, tap, map, mergeMap} = rxjs.operators;
    const result = [];

    const source$ = interval(50).pipe(take(3));

    const target$ = source$.pipe(
      map(value => value + 1),
      // subscribe to the inner observables and emit their values into the target stream
      mergeMap(value => interval(20).pipe(take(2), map(innerValue => (innerValue + 1) * (10 ** value)))),
    );

    // the target contains the values emitted by the inner observables
    target$.subscribe(
      value => result.push(value)
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 300);

  });


  learn('a more "real world" use-case for higher-order Observables', (done) => {

    const {Observable, interval} = rxjs;
    const {take, tap, map, mergeMap} = rxjs.operators;
    const {ajax} = rxjs.ajax;
    const result = [];

    const currentBrowserUrl$ = interval(50).pipe(
      take(3),
      map(value => 'http://star-wars-characters.ch/' + (value + 1)),
      tap(v => console.log('CURRENT BROWSER URL', v))
    );

    const characterName$ = currentBrowserUrl$.pipe(
      map(url => url.split('/').pop()),
      map(characterId => `https://swapi.co/api/people/${characterId}/`),
      tap(apiUrl => console.log('API REQUEST', apiUrl)),
      mergeMap(apiUrl => ajax.get(apiUrl)),
      tap(response => console.log('RESPONSE', response)),
      map(result => result.response.name)
    );

    characterName$.subscribe(
      name => result.push(name),
      () => {},
      checkNames
    );

    function checkNames() {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }
  });


  learn('the difference between mergeMap, switchMap and concatMap when flattening a higher-order observable', (done) => {

    const {Observable, interval} = rxjs;
    const {take, tap, map, mergeMap, switchMap, concatMap} = rxjs.operators;
    const resultMerge = [];
    const resultSwitch = [];
    const resultConcat = [];

    const source$ = interval(40).pipe(take(3));

    function createInnerObservable(value) {
      return interval(30).pipe(take(3), map(innerValue => (innerValue + 1) * (10 ** value)));
    }

    const targetMerge$ = source$.pipe(
      map(value => value + 1),
      // subscribe to all the inner observables immediately and emit their values as they come into the target stream
      mergeMap(value => createInnerObservable(value)),
    );

    const targetSwitch$ = source$.pipe(
      map(value => value + 1),
      // subscribe only to the latest inner observable and emit its values into the target stream
      // unsubscribe from previous inner observables
      switchMap(value => createInnerObservable(value)),
    );

    const targetConcat$ = source$.pipe(
      map(value => value + 1),
      // subscribe to each of the inner observable sequentially after a previous inner observable has completed
      concatMap(value => createInnerObservable(value)),
    );

    // the target contains values emitted by the inner observables
    targetMerge$.subscribe(
      value => resultMerge.push(value) // contains all the values from all the inner observables from parallel subscriptions
    );
    targetSwitch$.subscribe(
      value => resultSwitch.push(value) // contains only values emitted by the latest inner observable
    );
    targetConcat$.subscribe(
      value => resultConcat.push(value) // contains all the values from all the inner observables from sequential subscriptions
    );


    setTimeout(() => {
      console.log(resultMerge, resultSwitch, resultConcat);
      expect(resultMerge).toEqual(FILL_ME_IN);
      expect(resultSwitch).toEqual(FILL_ME_IN);
      expect(resultConcat).toEqual(FILL_ME_IN);
      done();
    }, 400);

  });

});
