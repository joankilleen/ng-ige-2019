const input = document.getElementById('input');
const searchButton = document.getElementById('search');
const resultList = document.getElementById('result');

const {fromEvent} = rxjs;
const {tap} = rxjs.operators;


const observable = fromEvent(input, 'keyup')
  .pipe(
    tap(event => console.log(event.target.value))
  )
  .subscribe(event => displayResults([event.target.value]));


searchButton.addEventListener('click', () => {
  const term = input.value || 'observable';
  searchWikipedia(term)
    .then(data => displayResults(data[1]));
});


function displayResults(results) {
  resultList.innerHTML = '';
  if (!results) return;
  for (let result of results) {
    const li = document.createElement('li');
    li.innerText = result;
    resultList.appendChild(li);
  }
}

function searchWikipedia(term) {
  const queryUrl = `https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&maxlag=17&search=${term}`;
  return fetch(queryUrl).then(resp => resp.json()).then(delay);
}

const DELAY = 3000;
function delay(data) {
  const term = data[0] || [];
  const delay = term === 'React' ? DELAY : 0;
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
}

/*
 Hints:
 - start with `map` to `searchWikipedia`
 - change to `flatMap`
 - `debounceTime`
 - distinctUntilChanged + map event->value
 - -> inconsistencies 3->4->3 letters -> switchMap
 */
