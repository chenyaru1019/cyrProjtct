angular.module('starter.WaterInputCtrl', [])

    .controller('WaterInputCtrl', function($scope,$state,service,$rootScope,$timeout,$stateParams,$ionicLoading,
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

        $scope.$on('$ionicView.enter', function() {
            $scope.jsonString = $stateParams.jsonString;
            var json = JSON.parse($scope.jsonString);
            if(json.typeCode == "first"){
                $scope.codeForWater1 = json.codeForWater1;
                $scope.codeForWater2 = json.codeForWater2;
                $scope.codeForWater3 = json.codeForWater3;
                $scope.name =localStorage.getItem("name");
                $scope.address = localStorage.getItem("room");
                $scope.telephone = "";
                $scope.cellphone = "";
            }else if(json.typeCode == "history"){
                $scope.codeForWater1 = json.codeForWater1;
                $scope.codeForWater2 = json.codeForWater2;
                $scope.codeForWater3 = json.codeForWater3;
                $scope.address = json.address;
                $scope.name = json.name;
                $scope.telephone = json.telephone;
                $scope.cellphone = json.cellphone;
            }
        });
        $scope.toWaterSuccess = function (item) {
            if($scope.address == ""){
                showAlert("配送房间不能为空")
            }else if($scope.name == ""){
                showAlert("订水人不能为空")
            }else if($scope.telephone == "" &&  $scope.cellphone == ""){
                showAlert("订水人座机与手机号不能全部为空")
            }else if($scope.cellphone.toString().length !=11){
                showAlert("订水人手机号必须为11位手机号")
            } else{
                $scope.show();
                var bottle1 = {
                    bottleType:"1",
                    count:$scope.codeForWater1,
                }
                var bottle2 = {
                    bottleType:"2",
                    count:$scope.codeForWater2,
                }
                var bottle3 = {
                    bottleType:"3",
                    count:$scope.codeForWater3,
                }
                var orderDetail = new Array();
                if($scope.codeForWater1 != 0){
                    orderDetail.push(bottle1);
                }
                if($scope.codeForWater2 != 0){
                    orderDetail.push(bottle2);
                }
                if($scope.codeForWater3 != 0){
                    orderDetail.push(bottle3);
                }
                var submitData = {
                    uuid:localStorage.getItem("uuid"),
                    room:$scope.address,
                    orderName:$scope.name,
                    orderPhone:$scope.telephone,
                    orderMobile:$scope.cellphone,
                    orderDetail:JSON.stringify(orderDetail)
                };
                service.submitWaterOrder(submitData)
                    .then(function (result) {

                        $scope.hide();
                        var dataJson = result.data;
                        if(dataJson.status == "success"){
                            $ionicViewSwitcher.nextDirection('forward');
                            $state.go('tab.WaterSuccess',item);
                            showAlert("送水信息提交成功","close");
                        }else{
                            showAlert(dataJson.errormsg,"close");
                        }
                    })
                    .catch(function (result) {
                        $scope.hide();
                        showAlert(JSON.stringify(result))
                    })
            }
        }
        $scope.screenHeight = screen.height+"px";
        $scope.codeForWater1 = 0;
        $scope.codeForWater2 = 0;
        $scope.codeForWater3 = 0;
        $scope.address = "";
        $scope.name = "";
        $scope.telwphone = "";
        $scope.celphone = "";

        //钉钉标题设置
        dd.ready(function() {
            dd.biz.navigation.setTitle({
                title : '确认提交',//控制标题文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });
            // dd.ui.webViewBounce.disable();
        });

        //加载
        $scope.show = function() {
            $ionicLoading.show({
                template: '提交中...'
            });
        };
        $scope.hide = function(){
            $ionicLoading.hide();
        };

        // 一个提示对话框
        var showAlert = function(title,type) {
            var alertPopup = $ionicPopup.alert({

                title: '', // String. 弹窗的标题。
                subTitle: '', // String (可选)。弹窗的子标题。
                template: '<div style="width: 100%;text-align: center;font-size: 18px">'+title+'</div>', // String (可选)。放在弹窗body内的html模板。
                templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
                okText: '确定', // String (默认: 'OK')。OK按钮的文字。
                okType: 'button-positive', // String (默认: 'button-positive')。OK按钮的类型。
            });
            alertPopup.then(function(res) {
            });
        };
    });