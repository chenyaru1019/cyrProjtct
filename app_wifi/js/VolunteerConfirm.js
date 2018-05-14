angular.module('starter.VolunteerConfirmCtrl', [])

    .controller('VolunteerConfirmCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$stateParams,$ionicPopup,$ionicNavBarDelegate) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        var jsonString = $stateParams.jsonString;
        $scope.data = JSON.parse(jsonString);

        $scope.volunteerConfirmCancel = function () {
            // $ionicViewSwitcher.nextDirection("back");
            // $ionicHistory.goBack();
            localStorage.setItem("isBackRotu","1");
            $ionicViewSwitcher.nextDirection('back');
            $state.go('tab.Volunteer');
        }

        // //从定义左上角返回键
        // dd.biz.navigation.setLeft({
        //     control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        //     text: '',//控制显示文本，空字符串表示显示默认文本
        //     onSuccess : function(result) {
        //         //直接返回了，不在返回到原来的路由--------------用于处理基路由的时候返回问题
        //         $ionicViewSwitcher.nextDirection('back');
        //         $state.go('tab.Volunteer');
        //     },
        //     onFail : function(err) {}
        // });

        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");
        $scope.cancelSign = function () {
            service.deleteSign(uuid,username,$scope.data.lineId,$scope.data.stationId,$scope.data.postId,$scope.data.startTime,$scope.data.endTime)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;

                    if (jsonResult.status == "success") {
                        $scope.volunteerConfirmCancel();
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理
                showAlert(JSON.stringify(result));
            });
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

        //  confirm 对话框
        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '提示',
                template:"<div style='text-align:center;font-family: 微软雅黑;'>您是否取消预约</div>",
                buttons: [
                    { text: "<div class='myPopup'>取消</div>",
                        onTap:function(e){
                            console.log('You are not sure');
                        }
                    },
                    {text: '<div class="myPopup">确定</div>',
                        onTap:function(e){
                            $scope.cancelSign();
                            console.log('You are sure');
                        }
                    }]
            });
        };
    });
