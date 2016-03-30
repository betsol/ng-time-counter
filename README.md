# betsol-ng-time-counter

[![Bower version](https://badge.fury.io/bo/betsol-ng-time-counter.svg)](http://badge.fury.io/bo/betsol-ng-time-counter)
[![npm version](https://badge.fury.io/js/betsol-ng-time-counter.svg)](http://badge.fury.io/js/betsol-ng-time-counter)


A very minimalistic time-counter directive for Angular.js (`^1.2.29`).

It will do it's work and will not stand in your way!

> —» [DEMO][demo] «—


## Features

- Can be used as a countdown timer as well as forward-counting one
- It transcludes a part of your own HTML, so the view could be fully customized
- Update interval is configurable
- It doesn't contain any national strings, so you could fully internationalize it,
  using approach, selected in your own application
- Finish callback for countdown timers is available
- Target date and counting direction could be changed dynamically,
  the component will update itself accordingly


## Installation

### Install library with *npm*

`npm i -S betsol-ng-time-counter`


### Install library with *Bower*

`bower install --save betsol-ng-time-counter`


### Add library to your page

``` html
<script src="/node_modules/betsol-ng-time-counter/dist/betsol-ng-time-counter.js"></script>
```

You should use minified version (`betsol-ng-time-counter.min.js`) in production.


### Add dependency in your application's module definition

``` javascript
var application = angular.module('application', [
  // ...
  'betsol.timeCounter'
]);
```


## Usage

Add `bs-time-counter` directive to one of your container elements.

Provide reference to a `Date` object instance using `date` attribute of the same element.

Optionally, provide the counting direction using `direction` attribute, which could be set to either `up` or `down`.
Skip this attribute to use auto-detection mechanism, i.e. future date will make the timer a countdown one,
while past date will make it a forward-counting one.

Use scope properties from [this table](#exposed-scope-properties) to display time unit values inside of your container.


### Example

```html
<div ng-controller="MyCtrl as vm">
    <ul bs-time-counter date="vm.futureDate" direction="'down'">
        <li>{{ hours }} hours</li>
        <li>{{ minutes }} minutes</li>
        <li>{{ seconds }} seconds</li>
    </ul>
</div>
```

```js
angular
  .module('application', [
    'betsol.timeCounter'
  ])
  .controller('MyCtrl', function () {
    var vm = this;
    vm.futureDate = new Date('2026-08-16T06:17:00');
  })
;
```

Please see [the demo][demo] for more examples and features.


## API

### Directive options

<table>
    <tr>
        <th>Option</th>
        <th>Dynamic</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>date</td>
        <td>Yes</td>
        <td>
            Current date
        </td>
        <td>
            A reference to the <code>Date</code> object instance, current date is used when skipped.
        </td>
    </tr>
    <tr>
        <td>direction</td>
        <td>Yes</td>
        <td>
            Auto-detect
        </td>
        <td>
            Counter direction, either <code>up</code> or <code>down</code>. Will be inferred from the date if not set.
            Please see the <a href="#usage">usage</a> section.
            If you want to pass it as a string in your template, make sure to surround it with single quotes.
        </td>
    </tr>
    <tr>
        <td>interval</td>
        <td>No</td>
        <td>
            One second
        </td>
        <td>How often to update the counter? In milliseconds.</td>
    </tr>
    <tr>
        <td>onFinish</td>
        <td>Yes</td>
        <td>
            Do nothing
        </td>
        <td>An expression that will be evaluated when the countdown timer reaches zero.</td>
    </tr>
</table>

> Dynamic properties are watched by the directive, therefore the directive
> will update itself when their value will change.

> If you want to pass a constant directly to a dynamic property from the template
> you will have to surround the value in single quotes.


### Exposed scope properties

| Scope Property | Description
| -------------- | -----------------------------------
| years          | Time unit value for *years*
| months         | Time unit value for *months*
| days           | Time unit value for *days*
| hours          | Time unit value for *hours*
| minutes        | Time unit value for *minutes*
| seconds        | Time unit value for *seconds*
| milliseconds   | Time unit value for *milliseconds*


## FAQ

### How do I add leading zeroes to time unit values?

You could easily write your own filter for this or use some third-party module.

```html
<ul bs-time-counter date="vm.someDate">
    <!-- Just apply your filter to a time unit scope property -->
    <li>{{ hours|addLeadingZeroes }} hours</li>
</ul>
```

Please see [this question](http://stackoverflow.com/q/17648014/1056679) on Stack Overflow
about padding filters.


### How do I pluralize/localize time unit labels?

This module doesn't provide any national strings for time unit labels, so you could use
your own labels with pluralization and internationalization, it's totally up to you!

> @todo: provide an example


### Why «X» feature is not provided?

We've specifically tried to make this module as minimalistic as possible.
It will do it's work and will not stand in your way!

However, if you think some feature DOES belong to this module,
please [create an issue][new-issue] for this. We will look into it.


## Changelog

Please see the [changelog][changelog] for list of changes.


## Feedback

If you have found a bug or have another issue with the library —
please [create an issue][new-issue].

If you have a question regarding the library or it's integration with your project —
consider asking a question at [StackOverflow][so-ask] and sending me a
link via [E-Mail][email]. I will be glad to help.

Have any ideas or propositions? Feel free to contact me by [E-Mail][email].

Cheers!


## Developer guide

Fork, clone, create a feature branch, implement your feature, cover it with tests, commit, create a PR.

Run:

- `npm i` to initialize the project
- `gulp build` to re-build the dist files
- `gulp test` or `karma start` to test the code

Do not add dist files to the PR itself.
We will re-compile the module manually each time before releasing.


## Support

If you like this library consider to add star on [GitHub repository][repo-gh].

Thank you!


## License

The MIT License (MIT)

Copyright (c) 2016 Slava Fomin II, BETTER SOLUTIONS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

  [changelog]: changelog.md
  [so-ask]:    http://stackoverflow.com/questions/ask?tags=angularjs,javascript
  [email]:     mailto:s.fomin@betsol.ru
  [new-issue]: https://github.com/betsol/ng-time-counter/issues/new
  [gulp]:      http://gulpjs.com/
  [repo-gh]:   https://github.com/betsol/ng-time-counter
  [demo]:      http://betsol.github.io/ng-time-counter/
