angular.module('starter.PastyMyQueryCtrl', [])

    .controller('PastyMyQueryCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$stateParams,$ionicPopup,$ionicNavBarDelegate) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.pastyMyQueryCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }

        var detail = $stateParams.detail;
        $scope.date = $stateParams.supplyDt;
        $scope.money = 0;

        var detailJson = JSON.parse(detail);
        var orderId = "";
        var dataList = new Array();
        for(var i=0;i<detailJson.length;i++){
            var object = {
                orderId:detailJson[i].orderId,
                mealCount:detailJson[i].mealCount,
                mealName:detailJson[i].mealName,
                price:detailJson[i].price,
            }
            orderId = object.orderId;
            dataList.push(object);
        }
        $scope.listData = dataList;
        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");
        $scope.cancelPasty = function () {
            service.createCancelOrder(uuid,username,orderId)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;
                    console.log(JSON.stringify(result.data));
                    if (jsonResult.status == "success") {
                        showAlert("成功取消订单");
                        $scope.pastyMyQueryCancel();
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理

            });
        }

        for(var i=0;i<dataList.length;i++){
            $scope.money = $scope.money + dataList[i].mealCount * dataList[i].price;
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
