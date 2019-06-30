const {of, from, range, empty, throwError, fromEvent, interval, merge, zip, forkJoin} = rxjs;
const {tap, filter, map, mapTo, pluck, delay, scan, mergeMap, switchMap, concatMap, take, takeUntil, takeWhile, takeLast, expand} = rxjs.operators;
const {ajax} = rxjs.ajax;

const API_URL = 'http://localhost:3456/numberguess';

const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const resultText = document.getElementById('result');

resetButton.addEventListener('click', resetGame);

//********* Task 1 **********/
fromEvent(submitButton, 'click')
  .pipe(
    map(() => guessInput.value),
    switchMap(value => ajax.post(API_URL, {number: value})),
    switchMap(() => ajax.get(API_URL)),
    map(result => result.response)
  )
  .subscribe(
    r => printresult(r)
  );

//********* Task 2 - Passing Context Data through the stream**********/
// fromEvent(submitButton, 'click')
//   .pipe(
//     switchMap(() => range(1, 100)),
//     tap(number => console.log('Guessing', number)),
//     mergeMap(number => ajax.post(API_URL + `?clientId=${number}`, {number: number}).pipe(map(() => number))),
//     mergeMap(number => ajax.get(API_URL + `?clientId=${number}`).pipe(map(result => ({
//       number: number,
//       response: result.response
//     })))),
//     filter(result => result.response.status === 'SUCCESS')
//   )
//   .subscribe(
//      // r =>  printresult(r),
//      r =>  printresult(r.number),
//   );

//********* Task 2 - Using ForkJoin to pass context **********/
// fromEvent(submitButton, 'click')
//   .pipe(
//     switchMap(() => range(1, 100)),
//     mergeMap(number => forkJoin(of(number), ajax.post(API_URL + `?clientId=${number}`, {number}))),
//     mergeMap(([number]) => forkJoin(of(number), ajax.get(API_URL + `?clientId=${number}`))),
//     filter(([number, result]) => result.response.status === 'SUCCESS')
//   )
//   .subscribe(
//     ([number]) => printresult(number),
//   );

//********* Task 3 - Sequential guesses **********/
// fromEvent(submitButton, 'click')
//   .pipe(
//     switchMap(() => range(1, 100)),
//       concatMap(number => sendGuessAndGetResult(number)),
//       filter(result => result.response.status === 'SUCCESS'),
//       take(1)
//     )
//     .subscribe(
//       // result => printresult(result),
//       result => printresult(result.number),
//     );
//
//
// function sendGuessAndGetResult(number) {
//   return ajax.post(API_URL, {number})
//     .pipe(
//       switchMap(() => ajax.get(API_URL)),
//       map(result => ({
//         number,
//         response: result.response
//       })));
// }

//********* Task 4 - Smart client **********/
// const initialState = {
//   lowLimit: 1,
//   highLimit: 100,
//   guess: 51
// };
//
// fromEvent(submitButton, 'click')
//   .pipe(
//     switchMap(() => sendGuessAndCalculateNextState(initialState)),
//     expand(({nextState}) => {
//       return nextState ? sendGuessAndCalculateNextState(nextState) : empty()
//     }),
//     filter(({response}) => response.status === 'SUCCESS')
//   )
//   .subscribe(
//     // result => printresult(result),
//     result => printresult(result.currentState.guess),
//   );
//
//
// function sendGuessAndCalculateNextState(currentState) {
//   return ajax.post(API_URL, {number: currentState.guess})
//     .pipe(
//       switchMap(() => ajax.get(API_URL)),
//       map(result => {
//
//         console.log('Calculating next state', currentState, result.response.status);
//
//         let nextState;
//         if (result.response.status === 'BELOW'){
//           nextState = {
//             lowLimit: currentState.guess,
//             highLimit: currentState.highLimit,
//             guess: Math.ceil((currentState.guess + currentState.highLimit) / 2)
//           }
//         }
//         else if (result.response.status === 'ABOVE'){
//           nextState = {
//             lowLimit: currentState.lowLimit,
//             highLimit: currentState.guess,
//             guess: Math.ceil((currentState.lowLimit + currentState.guess) / 2)
//           }
//         }
//         else {
//           nextState = null;
//         }
//
//         return {currentState, response: result.response, nextState};
//       }));
// }

//********* Task 5 - User interactions in stream **********/
// const userGuess$ = fromEvent(submitButton, 'click').pipe(map(e => guessInput.value));
//
// userGuess$
//   .pipe(
//     take(1),
//     switchMap(value => sendGuessAndCalculateNextState(value)),
//     // .pipe(
//     expand(({ response }) => {
//       // expand is the way to do recursion/looping with RxJS
//       // if we return an observable then this observable is projected back into the source stream
//       // -> returning an empty observable will end the loop
//       return response ? userGuess$.pipe(take(1), switchMap(userGuess => sendGuessAndCalculateNextState(userGuess))) : empty()
//       // DEMO: Alternatively use use the browser prompt (see block below)
//     })
//     // filter(({response}) => response.status === 'SUCCESS')
//   )
//   .subscribe(result => {
//     const message = result.response ? `Guess is ${result.response}. Please enter next guess!` : 'Bravo!';
//     printresult(message);
//   });
//
// function sendGuessAndCalculateNextState(userGuess) {
//   return ajax.post(API_URL, { number: userGuess }).pipe(
//     switchMap(() => ajax.get(API_URL)),
//     map(result => {
//       console.log('Server response', userGuess, result.response.status);
//
//       let response = null;
//       if (result.response.status !== 'SUCCESS') {
//         response = result.response.status;
//       }
//
//       return { guess: userGuess, response };
//     })
//   );
// }
//
// // DEMO: Expand using the browser prompt
// // expand(({ response }) => {
// //   return response
// //     ? of(1)
// //         .pipe(
// //           map(() => {
// //             return prompt(`Value is ${response}. Next Guess ...`);
// //           }),
// //           switchMap(userGuess => sendGuessAndCalculateNextState(userGuess))
// //         )
// //     : empty();
// // })

function resetGame() {
  ajax.post(API_URL + '/reset').subscribe(r => printresult(r));
}

function printresult(message) {
  console.log('VALUE', message);
  resultText.innerText = JSON.stringify(message, null, 5);
}
