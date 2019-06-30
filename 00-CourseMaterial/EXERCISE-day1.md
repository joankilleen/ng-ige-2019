# Exercises Angular

## Exercise 1: Creating an Angular App with the Angular CLI

### 1.1 Creating the App

Create a new Angular application (you need `@angular/cli` installed globally, see preparations):

	ng new awesome-app --defaults

Inspect the project that has been created. Try to understand the setup (where is the actual source code, where are the artifacts for deployment ...)

### 1.2 Running the App

Serving the app:

	cd awesome-app
	npm start

Navigate a Chrome or Firefox to `http://localhost:4200/`. Inspect the app. Open the browser developer tools and inspect the resources the browser actually loads over the network.


### 1.3 Debugging the App

Debug the app in Chrome:

- Open developer tools
- Open the sources tab
- Open the component sources: Hit Ctrl-P and type 'app.component.ts'
- Set a breakpoint in the constructor

Can you change the title of the component through the debugger?  
Optional: Can you debug in another browser?


### 1.4 Running the App in Internet Explorer

Navigate Internet Explorer to `http://localhost:4200/`. Inspect the app.  
What is the Problem? Can you fix it?


### 1.5 Creating a Production Build

Create the production artifacts:

	npm run build -- --prod 

Inspect the contents of `dist`.  
The content of `dist` can be served with any webserver.  
We can use `serve` as a simple webserver:

	serve dist

Open the browser developer tools and inspect the resources the browser actually loads over the network.  
What are the differences to the development build?


Note you can also serve a production build like this:

	ng serve --prod


### 1.6 Running the Tests

Execute the tests:

	npm run test

Inspect the tests in `src/app/app.component.spec.ts`.  
Modify a test so that it fails.  
Can you debug the tests?  
Can you run a single test?

Run the end-to-end tests:

	npm run e2e

Inspect the test in `e2e/app.e2e-spec.ts`.	



## Exercise 2: Creating your first Component

In the project directory from exercise 1:

	ng generate component hello

- Inspect the generated sources/changes.  
- Extend the app so that this new "hello"-component is used.
- Modify the component to display "Hello World" in the browser.  
- (optional) Write a test that checks for this behaviour.  
- (optional) Run the tests again ...  
- (optional) Extend the test in `app.component.spec.ts` so that it checks that the new component is rendered as a child component.

- Change the `hello`-component: It should have a input where you can type your name and below the input a "Greeting" with your name should be displayed.
- Try to debug by stepping into the "Augury" chrome extension
- (optional) Extend the test for the `hello`-Component so that this behaviour is checked.
- (optional) Write a end-to-end test that checks this behaviour. (Hint: `npm run e2e`, `./e2e/app.e2e-spec.ts`

### Hints
Have a look at `10-demos/src/app/01-basics/01-databinding` to see an example of data-binding.




## Exercise 3: Creating an application with routing

Create and run a new project with routing:
	
	ng new fantastic-ng --routing --defaults
	cd fantastic-ng
	ng g c first
	ng g c second
	npm start

Inspect the generated sources.  
Start the app with `npm start`
Add the routes in `src/app/app-routing.module.ts`:


	const routes: Routes = [
		{ path: 'first', component: FirstComponent  },
  		{ path: 'second', component: SecondComponent  }
  	];
  	
Test the app in the browser.  
Add a default route:

	{ path: '', pathMatch: 'full', redirectTo: 'first'  },

Add two links in the `app.component` which enable navigation between `first` and `second` component:  

	<a href="/first">First</a>
	<a href="/second">Second</a>

Test the navigation in the browser. Is it working?  
Inspect the network requests in the browser developer tools ...  
Rewrite to use the `routerLink` directive:

	<a routerLink="/first" routerLinkActive="active">First</a>
	<a routerLink="/second" routerLinkActive="active">Second</a>

Inspect the difference ...
Optional: add css to highlight the active state

Create a production build and serve it with a simple webserver:

	npm run build
	http-server dist -p 5679

Open `http://localhost:5679/` in the browser. Navigate to the second screen. 
Refresh the browser ... what went wrong?

Change to `hash-routing` by changing the following line in the `app.routing.module.ts`:

	RouterModule.forRoot(routes, {useHash: true}),


