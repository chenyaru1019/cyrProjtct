angular.module('starter.PastyQuerySureCtrl', [])

    .controller('PastyQuerySureCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$stateParams,$ionicPopup,$ionicNavBarDelegate) {

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
                title : '确认预约',//控制标题文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });

        });

        var sureListString = $stateParams.sureListString;

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
        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");

        var touchOrNot = true;
        $scope.orderSure = function () {

            if(touchOrNot){
                touchOrNot = false;
                service.createOrder(uuid,username,JSON.stringify(sureList1))
                    .then(function (result) {  //正确请求成功时处理
                        var jsonResult = result.data;
                        touchOrNot = true;
                        $scope.toPastyFinally();
                        if (jsonResult.status == "success") {
                            showAlert("预定成功");
                            $scope.toPastyFinally();
                        } else {
                            showAlert(jsonResult.errormsg);
                        }

                    }).catch(function (result) { //捕捉错误处理
                    touchOrNot = true;
                });
            }else{

            }


        }

        $scope.toPastyFinally = function () {
            localStorage.setItem("isBackFood","0");
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.PastyFinally',{sureListString:sureListString});
        }
        $scope.cancelPasty = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
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
