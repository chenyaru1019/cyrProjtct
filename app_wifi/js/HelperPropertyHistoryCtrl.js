angular.module('starter.HelperPropertyHistoryCtrl', [])

    .controller('HelperPropertyHistoryCtrl', function($scope,$state,service,$rootScope,$timeout,
                                                      $ionicViewSwitcher,$ionicHistory,$ionicNavBarDelegate,$ionicPopup,$ionicActionSheet) {
        //判断手机端才能使用
        // $ionicNavBarDelegate.showBar(false);
        // var ua = navigator.userAgent.toLowerCase();
        // var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];
        // $scope.appType = false;
        //
        // if(btypeInfo == "aliapp"){
        //     $scope.appType = true;
        // }else{
        //     $scope.appType = false;
        // }
        $scope.appType = true;
        $scope.condition = ['全部','催单','已解决','已关闭','分派/内部转单'];
        $scope.showSearch = true;
        $scope.data = {
            clientSide: '分派/内部转单'
        };
        $scope.serverSideChange = function () {
            $scope.showSearch = true;
            console.log($scope.data.clientSide);
        };
        $scope.getToDetails = function () {
            $state.go('tab.HelperPropertyDetails');
        };
        //钉钉标题与返回键设置
        dd.ready(function() {
            dd.biz.navigation.setTitle({
                title : '报修记录',//控制标题文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });

            // dd.ui.webViewBounce.disable();

            dd.biz.navigation.setLeft({
                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                text: '',//控制显示文本，空字符串表示显示默认文本
                onSuccess: function (result) {
                    //直接返回了，不在返回到原来的路由--------------用于处理基路由的时候返回问题
                    var stringL =  window.location.hash;
                    var staticStr = "#/tab/HelperWater";
                    if(stringL.indexOf(staticStr) != -1){
                        dd.biz.navigation.close({
                            onSuccess: function (result) {
                                /*result结构
                                {}
                                */
                            },
                            onFail: function (err) {
                            }
                        });
                    }else{
                        $ionicViewSwitcher.nextDirection("back");
                        $ionicHistory.goBack();
                    }
                },
                onFail: function (err) {
                    //showAlert(JSON.stringify(err));
                }
            });

        });
    });
