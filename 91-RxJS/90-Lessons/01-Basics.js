lesson('About Expectations',  () => {

  learn('how RxJs is structuered when loading as UMD bundle directly into the browser', () => {

    // When loaded as an UMD bundle, RxJs declares a global variable 'rxjs' on the window
    const globalRxJsInstance = FILL_ME_IN;
    expect(globalRxJsInstance).toBeDefined();

    // the global 'rxjs' object has properties for
    // - creation functions like: of, from, interval. fromEvent
    // - combination functions like: merge, concat, zip

    const interval = FILL_ME_IN;
    const merge = FILL_ME_IN;

    expect(interval).toBeDefined();
    expect(merge).toBeDefined();
  });

  learn('how to check a synchronous observable', () => {

    const {of} = rxjs;

    const result = [];

    of(1, 2, 3, 4, 5)
      .subscribe(
        v => result.push(v)
      );


    expect(result).toEqual(FILL_ME_IN);
  });

  learn('how to check an asynchronous observable on completion', (done) => {

    const {interval} = rxjs;
    const {take} = rxjs.operators;

    const result = [];

    function checkExpectation() {
      expect(result).toEqual(FILL_ME_IN);
      done(); // signal that the test is finished
    }

    interval(10) // creates an observable that emits a count every 10ms
      .pipe(
        take(5)
      )
      .subscribe(
        v => { result.push(v); console.log('pushing', result);},
        e => console.log('ERROR', e),
        () => checkExpectation() // check expectation when the observable completes
      );
  });



  learn('how to check an asynchronous observable with timeouts', (done) => {

    const {interval} = rxjs;
    const {take} = rxjs.operators;

    const result = [];

    interval(10) // creates an observable that emits a count every 10ms
      .pipe(
        take(2)
      )
      .subscribe(
        v => { result.push(v); console.log('pushing', result);},
      );


    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN); // check emitted values after 15ms
    }, 15);

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN); // check emitted values after 25ms
      done();
    }, 25);
  });

});
