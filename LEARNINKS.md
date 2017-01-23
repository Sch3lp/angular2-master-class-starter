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
Even using the _url safe param_ causes this: `<img [src]='contact?.name'>`.

### Solution
Add a fallback: `<img [src]="contact?.name || ''">`

## Modules come with their own Providers
And when you add a module to your `@NgModule imports`, it will add the providers of that module to your `@NgModule providers`.