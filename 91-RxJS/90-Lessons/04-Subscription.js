lesson('About the Subscription and unsubscribing from Observables',  () => {

  learn('how to stop observing an Observable', (done) => {

    const {interval} = rxjs;
    const {take} = rxjs.operators;
    const result = [];

    const value$ = interval(100).pipe(take(5)); // creates an Observable which asynchronously emits 5 values

    const subscription = value$.subscribe(
      value => result.push(value),
      error => result.push(error),
      () => result.push('COMPLETED')
    );

    expect(subscription.closed).toEqual(FILL_ME_IN);

    setTimeout(() => subscription.unsubscribe(), 250);

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      expect(subscription.closed).toEqual(FILL_ME_IN);
      done();
    }, 600);

  });

  learn('a subscription is closed on completion', (done) => {

    const {interval} = rxjs;
    const {take} = rxjs.operators;
    const result = [];

    const value$ = interval(20).pipe(take(3)); // creates an Observable which asynchronously emits 5 values

    const subscription = value$.subscribe(
      value => result.push(value),
      error => result.push(error),
      () => result.push('COMPLETED')
    );

    expect(subscription.closed).toEqual(FILL_ME_IN);

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      expect(subscription.closed).toEqual(FILL_ME_IN);
      done();
    }, 100);

  });

  learn('a subscription is closed on error', (done) => {

    const {Observable} = rxjs;

    const value$ = new Observable(function(observer){
      setTimeout(() => observer.next('x'), 10);
      setTimeout(() => observer.next('y'), 20);
      setTimeout(() => observer.error('ERROR'), 30);
    });


    const subscription = value$.subscribe(
      value => result.push(value),
    );

    expect(subscription.closed).toEqual(FILL_ME_IN);

    setTimeout(() => {
      expect(subscription.closed).toEqual(FILL_ME_IN);
      done();
    }, 100);

  });


  learn('a subscription is a potential leak if the Observable does not complete', (done) => {

    const {interval} = rxjs;
    const {take} = rxjs.operators;
    const result = [];

    const value$ = interval(20); // creates an Observable which never completes

    const subscription = value$.subscribe(
      value => {
        if (result.length > 100) console.log('HUSTON, WE MIGHT HAVE A LEAK!!!');
        result.push(value)
      },
    );


    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      expect(subscription.closed).toEqual(FILL_ME_IN);
      done();
    }, 100);

    // TODO: Inspect the browser console:
    // -> the Observable continues to trigger the Observer forever ...
  });

  learn('that some observables do complete others do not complete', (done) => {

    const {of, from, fromEvent, interval, timer} = rxjs;

    let ofCompleted = false;
    let fromCompleted = false;
    let fromEventCompleted = false;
    let fromPromiseCompleted = false;
    let intervalCompleted = false;
    let timerCompleted = false;

    let newButton = document.createElement('button');

    const of$ = of(1, 2, 3, 'x', 'y', 'z');
    const from$ = from(['R', 'x', 'J', 'S']);
    const fromEvent$ = fromEvent(newButton, 'click');
    const fromPromise$ = from(new Promise(resolve => setTimeout(resolve, 40)));
    const interval$ = interval(20);
    const timer$ = timer(20);

    of$.subscribe(() => {}, () => {}, () => ofCompleted = true);
    from$.subscribe(() => {}, () => {}, () => fromCompleted = true);
    fromEvent$.subscribe(() => {}, () => {}, () => fromEventCompleted = true);
    fromPromise$.subscribe(() => {}, () => {}, () => fromPromiseCompleted = true);
    interval$.subscribe(() => {}, () => {}, () => intervalCompleted = true);
    timer$.subscribe(() => {}, () => {}, () => timerCompleted = true);

    newButton.click();

    // Note: If you get an Obervable from an API, then it is not obvious
    // if it is going to complete or not ...
    setTimeout(() => {
      expect(ofCompleted).toEqual(FILL_ME_IN);
      expect(fromCompleted).toEqual(FILL_ME_IN);
      expect(fromEventCompleted).toEqual(FILL_ME_IN);
      expect(fromPromiseCompleted).toEqual(FILL_ME_IN);
      expect(intervalCompleted).toEqual(FILL_ME_IN);
      expect(timerCompleted).toEqual(FILL_ME_IN);
      done();
    }, 100);
  });

});
