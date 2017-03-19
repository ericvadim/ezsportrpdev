'use strict';

angular.module('app.admin').controller('RefereeGradesController', function (DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.standardOptions = DTOptionsBuilder
        .fromSource('api/tables/datatables.standard.json')
        .withDOM("<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
            "t" +
            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>")
        .withBootstrap();
    vm.standardColumns = [
        DTColumnBuilder.newColumn('id'),
        DTColumnBuilder.newColumn('id'),
        DTColumnBuilder.newColumn('name')
    ];

});