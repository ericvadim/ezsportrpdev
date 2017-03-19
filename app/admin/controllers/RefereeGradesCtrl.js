'use strict';

angular.module('app.admin').controller('RefereeGradesController', function (ServerURL, $http, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    /* vm.data = [];
    $http.get(ServerURL + "grades/get").then(function (response) {
        vm.data = response.data;
        console.log(vm.data)
    });*/

    vm.standardOptions = DTOptionsBuilder
        .fromSource(ServerURL + "grades/get")
        .withDOM("<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
            "t" +
            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>")
        .withBootstrap();
    vm.standardColumns = [
        DTColumnBuilder.newColumn('id'),
        DTColumnBuilder.newColumn('grade_identifier'),
        DTColumnBuilder.newColumn('grade_name')
    ];

});