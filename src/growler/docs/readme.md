Growler is an <a href="https://github.com/JanStevens/angular-growl-2" target="_blank">angular-growl-2</a> wrapper with additional functionality. It supports all the standard angular-growl methods, like `error`, `info`, `warning`, `success` and some extension methods.

### Growler extension methods ###

  * `clearAll()`
  :
  Clears all of the alerts.

  * `clearErrors()`
  :
  Clears all of the error alerts.

  * `clearWarnings()`
  :
  Clears all of the warning alerts.

  * `clearInfos()`
  :
  Clears all of the info alerts.

  * `clearSuccesses()`
  :
  Clears all of the success alerts.


In addition to that, it is possible to make an alert permanent, completely ignoring all of the above methods. To do this a flag `isPermanent: true` needs to be passed to one of the growl methods.