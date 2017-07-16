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

## `#` to name model and form stuff 
eg. `#derpyForm="ngForm"` to identify a form with `derpyForm`.
Also works for ngModel: `#firstName="ngModel"`. 

Just don't forget to also add the `ngModel` property... Or you'll get errors:
`There is no directive with "exportAs" set to "ngModel"`

Fy faen

## `<template>` inside `<md-hint>`
Compare:
```
{{ name.errors.required ? "Name is required." : "" }}
{{ name.errors.minlength ? "Name requires at least "+name.errors.minlength.requiredLength+" characters, but was "+name.errors.minlength.actualLength : "" }}
```
to:
```
<template [ngIf]="name.errors?.required">This field is required</template>
<template [ngIf]="name.errors?.minlength">A name must have at least {{name.errors.minlength.requiredLength}} characters</template>
```
 
## `template [ngIf]` vs. `*ngIf`

## sync + async validators are messy
Async validator doesn't allow sync validator to finish validating?

Because whenever an email address is unavailable, it will also display the message that the email address is invalid.

## There's no Type pattern matching in TypeScript T_T
Best you can get is exporting predicate functions:
```typescript
export class AvailableEmail = { msg: string };
export class UnavailableEmail = { error: string };
export type EmailAvailability = AvailableEmail | UnavailableEmail;
export function emailIsAvailable(check: EmailAvailability): check is AvailableEmail {
  return (<AvailableEmail>check).msg !== undefined;
}
```

TypeScript will then give compiler errors:
```typescript
if (emailIsAvailable(check)) {
  check.error // <-- AvailableEmail doesn't have an error property
} else {
  check.msg // <-- UnavailableEmail doesn't have a msg property
}
```

Another way is to make AvailableEmail and UnavailableEmail a Class instead of a Type, and then map the response with a constructor function:
```typescript
.map(res => res.error
  ? new UnavailableEmail(res.error)
  : new AvailableEmail(res.msg));
```

More info in [TypeScript's Advanced Types documentation](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

There are small libraries out there though: [mcz](https://github.com/shogogg/mcz), [typematch](https://github.com/thalesmello/typematch), [kasai](https://github.com/cshepp/Kasai).

## useExisting in ASYNC_VALIDATORS
[Read this](https://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html).

Most important phrase is this: _However, we already added EmailValidator to the directives property of our component, which is a provider with the useClass recipe. We want to make sure that we get the exact same instance of EmailValidator on our form control, even though, we define a new provider for it._

The validator is already added to the _directives property of our component_, because we're simply using it in the ContactsCreator component.
 
That's why we want to _useExisting_, and make sure we alias the original `EmailAvailabilityValidator`.

It's in the [solutions' commentary](https://github.com/thoughtram/angular2-master-class-solutions/commit/198e9235c49de43d383eed06faa3f6f2926fde1f#diff-2ba0d0bd8a56a22e9f0aed1b936fa497R21)


## entryComponents
`ConfirmDeactivationDialogComponent` is an entryComponent, and not just declared because:

It doesn't need a `selector`, because it gets called from a MdDialog, not via an actual html element in another Angular component that participates in Angular's rendering cycle.

Because of this, Angular's `tree-shaking` will simply not package that component. But we **know** that we actually want it packaged in our vendor.bundle.js, so we'll need to tell Angular explicitly that it's an _entryComponent_. 


## Why is route.data an Observable?
Because our ContactsEditorComponent gets reused, and it still needs to react to changes to _new Contact_ information, where before we were reacting to changes in `route.params`.









