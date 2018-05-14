angular.module('starter.PastyMyCtrl', [])

    .controller('PastyMyCtrl', function($scope,$state,service,$ionicNavBarDelegate,$rootScope,$timeout,$stateParams,$ionicViewSwitcher,$ionicHistory,$ionicPopup) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.pastyMyCancel = function () {
            $ionicViewSwitcher.nextDirection('back');
            $state.go('tab.Pasty');
        }


        dd.ready(function() {
            dd.biz.navigation.setTitle({
                title : '我的预订',//控制标题文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });

        });

        // //从定义左上角返回键
        // dd.biz.navigation.setLeft({
        //     control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        //     text: '',//控制显示文本，空字符串表示显示默认文本
        //     onSuccess : function(result) {
        //         //直接返回了，不在返回到原来的路由--------------用于处理基路由的时候返回问题
        //         getBackAction();
        //     },
        //     onFail : function(err) {}
        // });
        //
        //
        // var getBackAction = function () {
        //     $ionicViewSwitcher.nextDirection('back');
        //     $state.go('tab.Pasty');
        // }

        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");


        $scope.$on('$ionicView.enter', function() {
            var dataList = new Array();
            service.getOrderList(uuid,username)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;
                    if(jsonResult.status == "success"){
                        for(var i=0;i<jsonResult.content.length;i++){
                            var dataDetail = new Array();
                            for(var j=0;j<jsonResult.content[i].detail.length;j++){
                                var object = {
                                    orderId:jsonResult.content[i].orderId,
                                    orderMealId:jsonResult.content[i].detail[j].orderId,
                                    mealCount:jsonResult.content[i].detail[j].mealCount,
                                    mealName:jsonResult.content[i].detail[j].mealName,
                                    price:jsonResult.content[i].detail[j].price,
                                }
                                dataDetail.push(object);
                            }
                            var state = "";
                            if(jsonResult.content[i].states == 0){
                                state = "未领取"
                            }else if(jsonResult.content[i].states == 1){
                                state = "已领取"
                            }else{
                                state = "退单"
                            }
                            var ob = {
                                detail:JSON.stringify(dataDetail),
                                cancelDt:jsonResult.content[i].cancelDt,
                                createDt:jsonResult.content[i].createDt,
                                expireDt:jsonResult.content[i].expireDt,
                                states:state,
                                useDt:jsonResult.content[i].useDt,
                                supplyDt:jsonResult.content[i].supplyDt,
                                orderId:jsonResult.content[i].orderId,
                            }
                            dataList.push(ob);
                        }
                    }else{
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理

            });
            $scope.listData = dataList;
        });

        $scope.toPastyMyQuery1 = function (item) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('tab.PastyMyQuery',item);
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
