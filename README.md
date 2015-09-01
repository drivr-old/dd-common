# dd-common - [AngularJS](http://angularjs.org/) services, utilities and directives common among our projects

***

[![Build Status](https://secure.travis-ci.org/clickataxi/dd-common.png)](http://travis-ci.org/clickataxi/dd-common)

## Demo

Do you want to see these modules in action? Visit http://clickataxi.github.io/dd-common/!

## Installation

Installation is easy as dd-common has minimal dependencies - only the AngularJS is required.
After downloading dependencies (or better yet, referencing them from your favourite CDN) you need to download build version of this project. All the files and their purposes are described here: 
https://github.com/clickataxi/dd-common/tree/gh-pages#build-files
Don't worry, if you are not sure which file to take, opt for `dd-common-tpls-[version].min.js`.

When you are done downloading all the dependencies and project files the only remaining part is to add dependencies on the `dd.common` AngularJS module:

```javascript
angular.module('myModule', ['dd.common']);
```

## Supported browsers

Components from this repository are automatically tested with the following browsers:
* Chrome (stable and canary channel)
* Firefox
* IE 9 and 10
* Opera
* Safari

Modern mobile browsers should work without problems.

### Quality and stability

Components should work. All the time and in all browsers. This is why all the components have a comprehensive suite of unit tests. All the automated tests are executed on each checkin.
In fact we are fortunate enough to **benefit from the same testing infrastructure as AngularJS**!

## Support

Project's issue on GitHub should be used discuss bugs and features.

## Contributing to the project

We are always looking for the quality contributions! Please check the [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution guidelines.

### Development
#### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g grunt-cli karma`
* Install local dev dependencies: `npm install` while current directory is dd-common repo

#### Build
* Build the whole project: `grunt` - this will run `lint`, `test`, and `concat` targets
* To build modules, first run `grunt html2js` then `grunt build:module1:module2...:moduleN`

You can generate a custom build, containing only needed modules, from the project's homepage.
Alternatively you can run local Grunt build from the command line and list needed modules as shown below:

```javascript
grunt build:modal:tabs:alert:popover:dropdownToggle:buttons:progressbar
```

Check the Grunt build file for other tasks that are defined for this project.

#### TDD
* Run test: `grunt watch`
 
This will start Karma server and will continuously watch files in the project, executing tests upon every change.

#### Test coverage
Add the `--coverage` option (e.g. `grunt test --coverage`, `grunt watch --coverage`) to see reports on the test coverage. These coverage reports are found in the coverage folder.

### Customize templates

As mentioned components from this repository have all the markup externalized in templates. You might want to customize default
templates to match your desired look & feel, add new functionality etc.

The easiest way to override an individual template is to use the `<script>` directive:

```html
<script id="template/alert/alert.html" type="text/ng-template">
    <div class='alert' ng-class='type && "alert-" + type'>
        <button ng-show='closeable' type='button' class='close' ng-click='close()'>Close</button>
        <div ng-transclude></div>
    </div>
</script>
```

If you want to override more templates it makes sense to store them as individual files and feed the `$templateCache` from those partials.
For people using Grunt as the build tool it can be easily done using the `grunt-html2js` plugin. You can also configure your own template url.
Let's have a look:

Your own template url is `views/partials/ui-bootstrap-tpls/alert/alert.html`.

Add "html2js" task to your Gruntfile
```javascript
html2js: {
  options: {
    base: '.',
    module: 'ui-templates',
    rename: function (modulePath) {
      var moduleName = modulePath.replace('app/views/partials/dd-common-tpls/', '').replace('.html', '');
      return 'template' + '/' + moduleName + '.html';
    }
  },
  main: {
    src: ['app/views/partials/dd-common-tpls/**/*.html'],
    dest: '.tmp/ui-templates.js'
  }
}
```

Make sure to load your template.js file
`<script src="/ui-templates.js"></script>`

Inject the `ui-templates` module in your `app.js`
```javascript
angular.module('myApp', [
  'dd.common',
  'ui-templates'
]);
```

Then it will work fine!

For more information visit: https://github.com/karlgoldstein/grunt-html2js

### Release
* Bump up version number in `package.json`
* Commit the version change with the following message: `chore(release): [version number]`
* tag
* push changes and a tag (`git push --tags`)
* switch to the `gh-pages` branch: `git checkout gh-pages`
* copy content of the dist folder to the main folder
* Commit the version change with the following message: `chore(release): [version number]`
* push changes
* switch back to the `main branch` and modify `package.json` to bump up version for the next iteration
* commit (`chore(release): starting [version number]`) and push
* publish Bower and NuGet packages

Well done! (If you don't like repeating yourself open a PR with a grunt task taking care of the above!)
