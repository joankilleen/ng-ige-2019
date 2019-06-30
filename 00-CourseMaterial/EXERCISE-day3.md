# Angular Workshop

## Exercise 7: Backend Access

The directory `40-ToDoApp/_server` contains a simple API-Server implementing basic CRUD functionality for our ToDo application.
Start the server with the following commands:

```
npm install #just once
npm start
```

You should now get an array with two todo items at the url: `http://localhost:3456/todos`.

Your task is now to access this backend API from the ToDo application:

- When the application is loaded, all the todo items should be loaded from the server
- When a todo item is added, it should be saved to the server
- When a todo item  is completed it should be updated on the server
- When a todo item  is deleted, it should be deleted from the server.

Start from `40-ToDoApp/11-Simple-ToDo-backend-exercise`.
This project already loads the  todo items from the server when the application is loaded.

The API implemented by the REST-Endpoint is described in the table below:

| HTTP-Method | URL (example)                                                | Request-Body                            | Response                    |
| ----------- | ------------------------------------------------------------ | --------------------------------------- | --------------------------- |
| GET         | http://localhost:3456/todos   *(optional query-parameter: ?completed=0 or 1)* |                                         | {data: [{*todo*},{*todo*}]} |
| GET         | http://localhost:3456/todos/1                                |                                         | {data: {*todo*} }           |
| POST        | http://localhost:3456/todos                                  | { "title": "Test", "completed": false}  | {data: {*todo*} }           |
| PUT         | http://localhost:3456/todos/1                                | { "title": "Test 2", "completed": true} | *empty*                     |
| DELETE      | http://localhost:3456/todos/1                                |                                         | *empty*                     |

Note that all responses are wrapped in a response object with a `data` property.
This is a typical security measure of JSON endpoints. See: http://stackoverflow.com/questions/3503102/what-are-top-level-json-arrays-and-why-are-they-a-security-risk

**Hint:**  
Have a look at `10-basic-constructs/src/app/03-BackendAccess/02-backend-crud` to see an implementation of how to access the todo item API endpoint.



## Exercise 8: Module Structure & Bundling

Use the Angular CLI to create a "best practice structure" for a Angular applications (she snippets from the slides):

- Create the root `AppModule` 
- Create the `CoreModule` 
- Create two feature modules 
- Create a shared module
- Add some services and some components to the modules



Make a production build and inspect the build result:

- How many bundles are there? 
- Which components and services are in which bundles? (use `webpack-bundle-analyzer`).

Add some more libraries i.e. components from `primeng` or `momentjs` ... what is the effect on the bundles?



## Exercise 9: Statemangement with a Service

Start with the ToDo Application in `40-ToDoApp/03-Simple-ToDo-backend-solution`.  
In the directory run:

	npm install
	npm start

Start the server in `40-ToDoApp/_server`:

	npm install
	npm start


Introduce a stateful service which manages the ToDos. This service should load the todos from the backend and changes should be saved back to the backend.
The components should become "stateless" and just get the todos from the service.

Optional:

- Try to set the change tracking strategy of the components to 'OnPush'.
- Try to display both lists (pending and done) on the same screen.


## Exercise 10: Intro NgRx

Inspect the app in `40-ToDoApp/06-ToDo-ngrx`.  
Try to understand the flow of component -> action -> store and also the effects.  
In the app you can't delete todo items. Implement this missing functionality by extending the store and the effects.


## Exercise 11: MobX Intro

Inspect the app in `40-ToDoApp/07-ToDo-mobx`.  
Try to understand the angular components react to data changes.  
In the app you can't delete todo items. Implement this missing functionality by extending the store.


​	
