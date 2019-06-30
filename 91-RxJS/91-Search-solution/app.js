const input = document.getElementById('input');
const searchButton = document.getElementById('search');
const resultList = document.getElementById('result');

const {fromEvent} = rxjs;
const {tap, map, switchMap, mergeMap, debounceTime, distinctUntilChanged} = rxjs.operators;


const observable = fromEvent(input, 'keyup')
  .pipe(
    map(e => e.target.value),
    debounceTime(500),
    tap(console.log),
    distinctUntilChanged(),
    switchMap(data => searchWikipedia(data)),
  )
  .subscribe(data => displayResults(data[1]));


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


/* solution */
// start with map -> the stream contains promises and not the resolved result -> flatMap
// introduce debounceTime
// introduce distinctUntilChanged -> does not work, because the event is changed every time -> map to value at the beginning
// show out of order problem with search term with even length (Ang -> Angu - > Angul) -> switchMap

