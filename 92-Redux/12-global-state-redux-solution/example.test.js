import {store, ADD_TODO, COMPLETE_TODO, REMOVE_TODO} from './state';

test('change state in a functional way', () => {
  expect(store.getState().todos.length).toBe(3);

  const newToDo = {id: Math.random(), title: 'Learn functional JavaScript'};
  let action = {type: ADD_TODO, payload: newToDo};
  store.dispatch(action);

  expect(store.getState().todos.length).toBe(4);

  action = {type: COMPLETE_TODO, payload: store.getState().todos[2]};
  store.dispatch(action);

  expect(store.getState().todos[2].completed).toBe(true);

  action = {type: REMOVE_TODO, payload: store.getState().todos[2]};
  store.dispatch(action);

  expect(store.getState().todos.length).toBe(3);

});
