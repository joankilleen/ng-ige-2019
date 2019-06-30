import {createStore} from 'redux';

export const defaultState = {
    todos: [
        {id: 1, title: 'Learn React'},
        {id: 2, title: 'Learn Redux'},
        {id: 3, title: 'Learn Angular'}
    ]
};

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

// change the state in a functional way
function changeState(state, action){
    switch (action.type) {
        case ADD_TODO:
            return {...state,  todos: state.todos.concat(action.payload)};
            break;
        case COMPLETE_TODO:
            return {...state,  todos: state.todos.map(t => t === action.payload ? {...t, completed: true} : t)};
            break;
        case REMOVE_TODO:
            return {...state,  todos: state.todos.filter(t => t !== action.payload)};
            break;
        default:
            return state;
    }
}

export const store = createStore(changeState, defaultState);

