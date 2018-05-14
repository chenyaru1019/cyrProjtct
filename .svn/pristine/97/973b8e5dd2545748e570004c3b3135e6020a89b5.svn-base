angular.module('starter.WifiFixCtrl', [])

    .controller('WifiFixCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$ionicPopup,$ionicNavBarDelegate) {
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

        $scope.wifiFixCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }
        var uuid = localStorage.getItem("uuid");
        $scope.hrefFix = "javascript:void(0)";
        service.getWifiDownloadUrl(uuid)
            .then(function (result) {  //正确请求成功时处理

                var jsonResult = result.data;
                console.log(JSON.stringify(result));

                if(jsonResult.status == "success"){
                    $scope.hrefFix = jsonResult.content;
                }else{
                    showAlert(jsonResult.errormsg);
                }

            }).catch(function (result) { //捕捉错误处理

        });
        $scope.clickFix = function () {
            if($scope.hrefFix == "javascript:void(0)"){
                showAlert("下载地址获取失败，请刷新重试");
            }
        }
        // 一个提示对话框
        var showAlert = function(title) {
            var alertPopup = $ionicPopup.alert({

                title: '', // String. 弹窗的标题。
                subTitle: '', // String (可选)。弹窗的子标题。
                template: '<div style="width: 100%;text-align: center;font-size: 18px">'+title+'</div>', // String (可选)。放在弹窗body内的html模板。
                templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
                okText: '确定', // String (默认: 'OK')。OK按钮的文字。
                okType: 'button-positive', // String (默认: 'button-positive')。OK按钮的类型。
            });
            alertPopup.then(function(res) {
                console.log('*********点击确定');
            });
        };
    });
