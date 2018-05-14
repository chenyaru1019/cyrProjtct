angular.module('starter.WaterSuccessCtrl', [])

    .controller('WaterSuccessCtrl', function($scope,$state,service,$rootScope,$timeout,
                                             $ionicViewSwitcher,$ionicHistory,$ionicNavBarDelegate,$ionicPopup,$ionicActionSheet) {
        //判断手机端才能使用
        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];
        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }
        // $scope.appType = true;

        $scope.screenHeight = screen.height+"px";

        $scope.toHelperWater = function () {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('tab.HelperWater',{codeFrom:"success"});
        }
        //钉钉标题设置
        dd.ready(function() {
            dd.biz.navigation.setTitle({
                title : ' ',//控制标题文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });
            // dd.ui.webViewBounce.disable();
        });
    });
