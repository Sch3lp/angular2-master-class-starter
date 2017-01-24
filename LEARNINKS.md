# Angular masterclass

## Compilation times
platformBrowserDynamic uses "just-in-time compilation"

to improve speed, use pre-compilation and use a different platform-Browser

## props vs. attributes
Attributes are always strings, whereas properties can be objects.

That's why [title] semantically defines you want to access the **property** instead of the **attribute** of an element.

## Angular 2 user decides how values are bound
In contrast to AngularJS (angular 1).

## `*ngFor` asterisk
`*` indicates a structural directive, meaning the template will be dynamically changed

## `@Injectable` is not the same as Springs `@Component`
Something about type preservation for TypeScript?

## Providers
```
providers: [
    ContactsService
]
```
is a shorthand for
```
providers: [
    { provide: ContactsService, useClass: ContactsService }
]
```
`provide: ...` says which _Token_ to use, like Springs `@Bean(name="derp")`.

`useClass: ...` would then be something like Springs `@Qualified("derp")`.

## ?. is angular specific
Not TypeScript specific!

## img src url's that get dynamically asynchronously filled in cause 404's
Even using the _safe navigation_ causes this: `<img [src]='contact?.name'>`.

### Solution
Add a fallback: `<img [src]="contact?.name || ''">`

## Modules come with their own Providers
And when you add a module to your `@NgModule imports`, it will add the providers of that module to your `@NgModule providers`.

## Explicit two-way binding
```
<input [value]="name"
  (input)="name=$event.target.value">
```

## ngModel comes with FormsModule
.

## Stateless methods!
Prefer stateless methods, so pass a `Contact` to your save method instead of depending on internal state.

## OpaqueToken instead of own class
Provides proper error messages

## Use relative urls for routing
Because you'd want to protect your fellow devs of routing to non existing paths.

So you can do it the `Elm` way, but it's going to be easier if you simply use relative urls.

## Dealing with optional state in a component
Use nav guard + resolvers instead of `?.` everywhere.

Don't even load/`init` the page when the required state isn't available yet.

## Composable in relation to Observables
_Composable_ means e.g. waiting for multiple calls to finish and THEN do something. 

This is something you can't do with regular (DOM) event handlers

## Singular operation in relation to Observables
_Singular_ means being able to get both a _success_ and _failed_ result.

## Non-singular operations in relation to Observables
Basically means _infinite stream_ handling (e.g. mouseMoved Event), also applies to Observables.

## Observables are like Streams in Java
.

## Push vs. Pull
Not explained in course but still important: Pull == blocking. Push == non-blocking

## Subject over Observable.fromEvent('click','domElement')
Because `.fromEvent` tightly couples your code to the DOM, and we're trying desperately to avoid that.

## debounceTime enables making better decisions
Because you can wait for a _natural_ time interval, after which you'll have more knowledge to make a better decision.

In our case it was waiting for a user to have typed what he was trying to search for.

## A `Subject` is actually an `Observable`
So you can use it as such and pass it to methods that takes an `Observable` as an argument.

## Presentation, Business, View Components
This is an Angular2 Architecture perception (and lingo) of ThoughtRam!

### Presentation Components
Are not the same as a `Presenter` in the `MVP` design pattern.

Don't try to make an analogy with `MVP`.

## Relativity while using router.navigate in `ViewComponent`s
`[routeLink]` automatically sets up the `router` to work with relative urls.

And when you don't use `[routeLink]` but programmatically navigate, 
you'll have to pass in an `extraOptions` object literal where you tell it to route relatively:
```
{ relativeTo: this.route }
```
## App reacting in a weird way?
Commenting out the wildcard route in `app.routes` can be helpful.

## Best practice: use `@Host` on component injection
Use it to be more specific about which component to inject.

## QueryList is also an Observable
Makes it easier to use, you can also react to `.changes` Observable when content gets pushed by a server.
Take care to still subscribe to `.changes` in the `ngAfterOnInit`, otherwise the `QueryList`'ll be undefined.

## $ convention
Append `$` to variable names to denote a `Stream` or `Observable`.