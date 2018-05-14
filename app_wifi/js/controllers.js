var app = angular.module('starter.controllers', ['ionic-datepicker'] ,function ($provide) {
  $provide.provider('providerServices01',function () {
    this.$get = function () {
      return {
        message:'this is providerServices01'
      }
    }
  });

  $provide.provider('providerServices02',function () {
    this.$get = function () {
      var _name = '';
      var service = {};

      service.setName = function (name) {
        _name = name;
      };
      service.getName = function () {
        return _name;
      };
      return service;

    }
  });

});

// app.config(function($httpProvider) {
//
//     $httpProvider.defaults.transformRequest = function (obj) {
//         var str = [];
//         for (var p in obj) {
//             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//         }
//         return str.join("&");
//     }
// });

app.controller('abcCtrl', function($scope) {

  $scope.abc = function () {
      alert("火热开发中");
  };
});


