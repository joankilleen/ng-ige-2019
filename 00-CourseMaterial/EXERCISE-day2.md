# Angular Wokshop

## Exercise 4: Angular ToDo App

Begin with the project `40-ToDoApp/01-SimpleToDo`.  
Start the application:

```
npm install
npm start
```

The project gives you a skeleton for a simple ToDo application with a single component. The component contains all the needed functionality in the TypeScript class, but the functionality is not yet connected to the template.  
Note: The component uses the `ToDoService` to store the todo items in the local storage of the browser.

### 4.1 Bind the Template to the Component

It is your task to connect the template to the component instance (TypeScript class) so that ToDo items can be created and marked as completed and the corresponding data is displayed in the UI.

### 4.2 Component Architecture

Split the single `overview` component into several components:

- `new-todo` component for the entry
- `todo-list` for the list
- `todo-item` for the display of a single item

The logic for managing should remain in the `overview` component. The new components should be simple presentation components.

**Hint:**  
Have a look at `10-demos/src/app/01-basics/03-nested-components` to see an example of parent-child components and `@Input` and `@Output` properties.



### 4.3 Routing

Introduce a second screen which shows the completed items:

- Create a new component for the second screen.
- Introduce a new url route `./done` which shows the second screen.
- Reuse components: `todo-list` and `todo-item`
- On the new screen completed items can be deleted
- Introduce navigation links to navigate between the screens



## Exercise 5: Forms

In the ToDo Application implement a proper form for the entry of a new todo.

Duplicate the component and implement it once with a template driven form and a second time with a reactive form.  
Add a validation that the text should be at least 3 characters.  
As a reference study the examples in `10-demos/src/app/02-forms/`.

*Optional:* Find out how to implement a custom validation: The text should begin with a capital letter. Try to implement that rule for the reactive and for the template driven approach.




## Exercise6: RxJS - Numberguess

Go to the directory ``

Start the server in `90-RxJS/_server`:

	npm install
	npm start

The sever picks a random number between 1 and 100. You have to guess the number.  
Send a guess to the server: 

	POST http://localhost:3456/numberguess -- Body: { "number": 42 }

Retrieve the feedback about the guess:

	GET http://localhost:3456/numberguess

The feedback	contains the `status` of the guess: `BELOW`, `ABOVE` or `SUCCESS`
	
Start the client in `99-Observables/95-NumberGuess-exercise`:

	npm install
	npm start

The client contains the boilerplate to talk to the server.	
	
### Task 1:	Stateless Client
Implement the functionality for guessing the number:

- The user can submit a guess
- The applications shows if the guess is correct or if it is above or below

*Hint:* A possible solution uses `map` and `switchMap` ...

### Task 2: Brute Force - Fast
The client should try all the numbers from 1-100 and then show the correct number.

*Hint:* To isolate a "guess" from parallel guesses you can pass a `clientId` like this:

	POST http://localhost:3456/numberguess?clientId=12345
	GET http://localhost:3456/numberguess?clientId=12345

*Hint:* A possible solution uses `map`, `mergeMap` and `filter`... `forkJoin` might also help ...	

### Task 3: Brute Force - Sequential
The client should try all the numbers one after the other starting from 1. Once the number is found, no more guesses should be sent.

*Hint:* A possible solution uses `concatMap`, `switchMap`, `map`, `filter` and `take`

### Task 4: Smart Client
The client should efficiently find the number on his own.

*Hints:* 

- The `expand` operator can be used to accomplish something like a loop with an observable.
- Try to avoid any global variables. State should be managed within the streams.
- A possible solution uses `switchMap`, `map`, `expand` and `filter`

### Task 5: Ask User for next number
The user should be asked for a new number until the correct number is found.

