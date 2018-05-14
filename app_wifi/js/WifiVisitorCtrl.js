angular.module('starter.WifiVisitorCtrl', [])

    .controller('WifiVisitorCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$ionicNavBarDelegate) {
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

        $scope.wifiVisitoeCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }

        // //调用自定的方法
        // $scope.initQr = function () {
        //     Qrcode.init($('[node-type=qr-btn]'));
        // }
        //
        // $scope.initQr();

        $scope.scan = function () {


            //钉钉api方法
            //     dd.ready(function(){
                    dd.biz.util.scan({
                        type: 'qrCode', // type 为 all、qrCode、barCode，默认是all。
                        onSuccess: function (data) {

                            //onSuccess将在扫码成功之后回调
                            /* data结构
                              { 'text': String}
                            */
                            // alert("成功"+JSON.stringify(data));
                            var str = localStorage.getItem("name");
                            str=encodeURI(encodeURI(str));
                            var  result =  data.text+ "&supervisor="+str;
                            window.location.href = result;
                        },
                        onFail: function (err) {
                            // alert("错误"+JSON.stringify(err));
                        }
                    })
                // });
        }
    });
