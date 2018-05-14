angular.module('starter.PastyFinallyCtrl', [])

    .controller('PastyFinallyCtrl', function($scope,$state,$ionicNavBarDelegate,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$stateParams,$filter) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        dd.ready(function() {
            dd.biz.navigation.setTitle({
                title : '已确认',//控制标题文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });

        });

        var sureListString = $stateParams.sureListString;
        $scope.pastyFinallyCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }
//判断是苹果还是android
        $scope.systemOS = function () {
            var isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod|ios|os/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };

            if ( isMobile.Android() ) {
                return "android";
            }
            else if(isMobile.iOS())
            {
                return "IOS";
            }
        }
        var sureList = JSON.parse(sureListString);
        var sureList1 = new Array();
        for(var i=0;i<sureList.length;i++){
            var ob = {
                everydaySupplyId:sureList[i].everydaySupplyId,
                supplyId:sureList[i].supplyId,
                count:sureList[i].num,
                dt:sureList[i].dt,
            }
            sureList1.push(ob);
        }
        if(sureList1.length != 0 ){
            if ($scope.systemOS() == "IOS"){
                sureList1[0].dt = (sureList1[0].dt).replace(/-/g,'/');
                // console.log("******^*^*"+timeData);
            }
            $scope.dtDate = $filter('date')(new Date(sureList1[0].dt), 'yyyy年MM月dd日');
        }


        $scope.toPastyMy = function () {
            localStorage.setItem("isBackFood","1");
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.PastyMy');
        }
    });
