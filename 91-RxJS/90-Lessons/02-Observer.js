lesson('About Observing',  () => {

  learn('how an Observable is typically observed', (done) => {

    const {interval} = rxjs;
    const {take} = rxjs.operators;
    const result = [];


    const value$ = interval(10).pipe(take(5)); // creates an Observable which asynchronously emits 5 values

    // Observe the Observable by passing three functions to *subscribe*
    // This is the most common case how to consume Observables
    value$.subscribe(
      value => result.push(value),
      error => result.push(error), // TASK: Comment out the error handler
      () => result.push('COMPLETED') // TASK: Commnet out the complete handler
    );

    setTimeout(() => {
      expect(result).toEqual(FILL_ME_IN);
      done();
    }, 200);

  });

  learn('how to Observe with an explicit Observer', (done) => {

    const {interval} = rxjs;
    const {take} = rxjs.operators;
    const result = [];

    const value$ = interval(10).pipe(take(5)); // creates an Observable which asynchronously emits 5 values

    const observer = {
      result: [],
      next: function(value){this.result.push(value * 2)},
      error: function(value){this.result.push(value)}, // TASK: Comment out the error handler
      complete: function(){this.result.push('COMPLETED')} // TASK: Comment out the complete handler
    };

    // Observe the Observable by passing an Observer
    value$.subscribe(observer);

    setTimeout(() => {
      expect(observer.result).toEqual(FILL_ME_IN);
      done();
    }, 200);

  });



});
