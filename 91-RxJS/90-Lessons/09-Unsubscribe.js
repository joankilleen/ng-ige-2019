lesson('about Patterns to unsubscribe from an Observable', () => {

  learn('hot to unsubscribe via *takeUntil*', (done) => {

    const {Subject, interval, of} = rxjs;
    const {take, tap, map, takeUntil} = rxjs.operators;
    const result = [];

    const stop$ = new Subject();

    const source$ = interval(40);

    const values$ = source$.pipe(
      takeUntil(stop$) // unsubscribe when stop$ emits a value
    );

    values$.subscribe(
      value => {
        result.push(value);
        if (result.length > 100) console.log('HUSTON, WE HAVE A LEAK!');
      }
    );

    setTimeout(() => stop$.next(), 150);

    // Check at the end
    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 200);
  });


  learn('how to unsubscribe via *takeWhile*', (done) => {

    const {Subject, interval, of} = rxjs;
    const {take, tap, map, takeWhile} = rxjs.operators;
    const result = [];

    let stop = false;

    const source$ = interval(40);

    const values$ = source$.pipe(
      takeWhile(() => stop === false)   // unsubscribe when a condition is not met
    );

    values$.subscribe(
      value => {
        result.push(value);
        if (result.length > 100) console.log('HUSTON, WE HAVE ANOTHER LEAK!');
      }
    );

    setTimeout(() => stop = true, 150);

    // Check at the end
    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 200);
  });

});
