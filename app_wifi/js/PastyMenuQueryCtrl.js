angular.module('starter.PastyMenuQueryCtrl', [])

    .controller('PastyMenuQueryCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicNavBarDelegate) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.pastyMenuQueryCancel = function () {
            history.back();
        }

        var dataList = new Array();
        for(var i=0;i<8;i++){
            var ob = {
                name:"asdad",
                num:i
            }
            dataList.push(ob);
        }
        $scope.listData = dataList;

    });
