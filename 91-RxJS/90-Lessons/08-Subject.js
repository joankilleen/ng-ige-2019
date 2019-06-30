lesson('about Subjects', () => {

  learn('how to manually emitting values with a Subject', (done) => {

    const {Subject, interval, of} = rxjs;
    const {take, tap, map} = rxjs.operators;
    const result1 = [];
    const result2 = [];

    // A subject is a observer and a observable at the same time
    const subject = new Subject();

    subject.subscribe(
      value => result1.push(value)
    );

    // Emit some values via the Subject
    setTimeout(() => {subject.next(42)}, 50); // calling *next()* emits a new value to the subscriber
    setTimeout(() => {subject.next(43)}, 80);

    // add a second observer after the first event was emitted
    setTimeout(() => {
      subject.subscribe(
        value => result2.push(value)
      );
    }, 60);

    // Check after first subscription
    setTimeout(() => {
      expect(result1).toEqual(FILL_ME_IN);
      expect(result2).toEqual(FILL_ME_IN);
    }, 20);

    // Check after first subscription
    setTimeout(() => {
      expect(result1).toEqual(FILL_ME_IN);
      expect(result2).toEqual(FILL_ME_IN);
    }, 70);

    // Check at the end
    setTimeout(() => {
      expect(result1).toEqual(FILL_ME_IN);
      expect(result2).toEqual(FILL_ME_IN);
      done();
    }, 100);
  });


  learn('that a BehaviorSubject is a Subject that always has a value', (done) => {

    const {BehaviorSubject, interval, of} = rxjs;
    const {take, tap, map} = rxjs.operators;
    const result1 = [];
    const result2 = [];

    // A subject is a observer and a observable at the same time
    const subject = new BehaviorSubject(0); // A BehaviorSubject needs an initial value

    subject.subscribe(
      value => result1.push(value)
    );

    // Emit some values via the Subject
    setTimeout(() => {subject.next(42)}, 50); // calling *next()* emits a new value to the subscriber
    setTimeout(() => {subject.next(43)}, 80);

    // add a second observer after the first event was emitted
    setTimeout(() => {
      subject.subscribe(
        value => result2.push(value)
      );
    }, 60);

    // Check after first subscription
    setTimeout(() => {
      expect(result1).toEqual(FILL_ME_IN);
      expect(result2).toEqual(FILL_ME_IN);
    }, 20);

    // Check after first subscription
    setTimeout(() => {
      expect(result1).toEqual(FILL_ME_IN);
      expect(result2).toEqual(FILL_ME_IN);
    }, 70);

    // Check at the end
    setTimeout(() => {
      expect(result1).toEqual(FILL_ME_IN);
      expect(result2).toEqual(FILL_ME_IN);
      done();
    }, 100);
  });

});


