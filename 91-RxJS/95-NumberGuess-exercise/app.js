const {of, from, range, empty, throwError, fromEvent, interval, merge, zip, forkJoin} = rxjs;
const {tap, filter, map, mapTo, pluck, delay, scan, mergeMap, switchMap, concatMap, take, takeUntil, takeWhile, takeLast, expand} = rxjs.operators;
const {ajax} = rxjs.ajax;

const API_URL = 'http://localhost:3456/numberguess';

const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const resultText = document.getElementById('result');

resetButton.addEventListener('click', resetGame);


fromEvent(submitButton, 'click')
  .pipe(
    map(() => guessInput.value),
    tap(value => console.log(`Guessing: ${value}`))
  )
  .subscribe(
    r => printresult(r)
  );


function resetGame() {
  ajax.post(API_URL + '/reset')
    .subscribe(r => printresult(r));
}

function printresult(message) {
  console.log('VALUE', message);
  resultText.innerText = JSON.stringify(message, null, 5);
}


