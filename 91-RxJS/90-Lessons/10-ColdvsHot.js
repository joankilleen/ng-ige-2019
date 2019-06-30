lesson('about the characteristics of cold and hot Observables', () => {

  learn('that cold observables produce values with each subscription', (done) => {

    const {interval} = rxjs;
    const {take} = rxjs.operators;
    const result = [];

    // the interval observable contains the producer of the values
    const source$ = interval(40).pipe(take(4));

    // each subscription triggers the producer inside the observable
    // First subscription
    source$.subscribe(
      value => {
        result.push(value);
      }
    );

    setTimeout(() => {
      // Second subscription
      source$
        .subscribe(
          value => {
            result.push(value);
          }
        );
    }, 100);


    // Check at the end
    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      expect(result.length).toEqual(FILL_ME_IN);
      done();
    }, 300);
  });


  learn('that hot observables multicast values which are produced outside of the observable to different observers', (done) => {

    const {fromEvent} = rxjs;
    const {map} = rxjs.operators;
    const result = [];

    // DOM elements produce events
    const button = document.createElement('button');

    // the following observable just publishes calues produced by the DOM element
    // since hot observables publish values to multiple subscribers they are called *multicast* observables
    const source$ = fromEvent(button, 'click').pipe(
      map(value => new Date().getMilliseconds())
    );

    // First subscription
    source$
      .subscribe(
        value => {
          result.push(value);
        }
      );

    setTimeout(() => {
      // Second subscription
      source$
        .subscribe(
          value => {
            result.push(value);
          }
        );
    }, 100);

    setTimeout(() => { button.click() }, 50);
    setTimeout(() => { button.click() }, 80);
    setTimeout(() => { button.click() }, 120);
    setTimeout(() => { button.click() }, 160);

    // Check at the end
    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN); // Note: the values are not deterministic, just comment out the line ...
      expect(result.length).toEqual(FILL_ME_IN);
      done();
    }, 300);
  });


  learn('how to multicast a cold observable via a Subject', (done) => {

    const {Subject, interval, of} = rxjs;
    const {take, tap, map, takeUntil, delay} = rxjs.operators;
    const result = [];

    // the interval observable contains the producer of the values
    const source$ = interval(40).pipe(take(4));

    const subject = new Subject(); // a Subject is a observer and a observable

    source$.subscribe(
      subject // a subject is a observer
    );

    // a subject is a observable
    // First subscription
    subject.subscribe(
      value => {
        result.push(value);
      }
    );

    setTimeout(() => {
      // Second subscription
      subject
        .subscribe(
          value => {
            result.push(value);
          }
        );
    }, 100);


    // Check at the end
    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      expect(result.length).toEqual(FILL_ME_IN);
      done();
    }, 300);
  });


  learn('how to multicast a cold observable via an operator', (done) => {

    const {interval} = rxjs;
    const {take, share, publish, refCount} = rxjs.operators;
    const result = [];

    // the interval observable contains the producer of the values
    const source$ = interval(40).pipe(
      take(4),
      share(), // this turns the stream into a hot observable

      // TASK: experiment with similar operators
      // publish(),
      // refCount() // *connect()* the *published* observable automatically with the first subscription
    );

    // a subject is a observable
    // First subscription
    source$.subscribe(
      value => {
        result.push(value);
      }
    );

    setTimeout(() => {
      // Second subscription
      source$
        .subscribe(
          value => {
            result.push(value);
          }
        );
    }, 100);

    // source$.connect(); // with *publish()* the Observable starts emitting only after *connect()* is called

    // Check at the end
    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      expect(result.length).toEqual(FILL_ME_IN);
      done();
    }, 300);
  });

});
