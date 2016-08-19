angular.module('plunker', [])

  .factory('plunkGenerator', function ($document) {

    return function (ngVersion, bsVersion, version, module, content) {

      var form = angular.element('<form style="display: none;" method="post" action="http://plnkr.co/edit/?p=preview" target="_blank"></form>');
      var addField = function (name, value) {
        var input = angular.element('<input type="hidden" name="' + name + '">');
        input.attr('value', value);
        form.append(input);
      };

      var indexContent = function (content, version) {
        return '<!doctype html>\n' +
          '<html ng-app="dd.common.demo">\n' +
          '  <head>\n' +
          '    <script src="//ajax.googleapis.com/ajax/libs/angularjs/'+ngVersion+'/angular.js"></script>\n' +
          '    <script src="//clickataxi.github.io/dd-ui/assets/ui-bootstrap-tpls-0.3.14.min.js"></script>\n' +
          '    <script src="//clickataxi.github.io/dd-common/dd-common-tpls-'+version+'.js"></script>\n' +
          '    <script src="example.js"></script>\n' +
          '    <link href="//netdna.bootstrapcdn.com/bootstrap/'+bsVersion+'/css/bootstrap.min.css" rel="stylesheet">\n' +
          '  </head>\n' +
          '  <body>\n\n' +
          content + '\n' +
          '  </body>\n' +
          '</html>\n';
      };

      var scriptContent = function(content) {
        return "angular.module('dd.common.demo', ['dd.common']);" + "\n" + content;
      };

      addField('description', 'http://clickataxi.github.io/dd-common/');
      addField('files[index.html]', indexContent(content.markup, version));
      addField('files[example.js]', scriptContent(content.javascript));

      $document.find('body').append(form);
      form[0].submit();
      form.remove();
    };
  })

  .controller('PlunkerCtrl', function ($scope, plunkGenerator) {

    $scope.content = {};

    $scope.edit = function (ngVersion, bsVersion, version, module) {
      plunkGenerator(ngVersion, bsVersion, version, module, $scope.content);
    };
  })

  .directive('plunkerContent', function () {
    return {
      link:function (scope, element, attrs) {
        scope.content[attrs.plunkerContent] = element.text().trim();
      }
    }
  });