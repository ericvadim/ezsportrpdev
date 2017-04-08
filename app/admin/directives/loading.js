'use strict';

angular
    .module('app')
    .directive('loading', function () {
        var directive = {};

        directive.restrict = 'E';

        var html = '<div class="loading-sheath {{visible?\'show\':\'hide\'}}">';
        html += '<div class="icon">';
        html += '<i class="fa fa-refresh fa-3x fa-spin"></i>';
        html += '</div>';
        html += '</div>';

        directive.template = html;

        directive.scope = {
            visible: "="
        };

        directive.link = function (scope, element, attrs) {

        };
        return directive;
    });
