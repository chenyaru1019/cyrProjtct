angular.module('starter.WifiCtrl', [])

    .controller('WifiCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,noSigns,$ionicPopup,$ionicNavBarDelegate) {

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

        var getBackAction = function () {
            var stringL =  window.location.hash;
            var staticStr = "#/tab/Wifi";
            if(staticStr == stringL){
                dd.ready(function() {
                    dd.ready(function () {
                        dd.biz.navigation.close({
                            onSuccess: function (result) {
                                /*result结构
                                {}
                                */
                            },
                            onFail: function (err) {
                            }
                        })
                    });
                });
            }else{
                $ionicViewSwitcher.nextDirection("back");
                $ionicHistory.goBack();
            }
        }

        $scope.wifiCancel = function () {
            getBackAction();
        }

        service.getDdFromAPP()
            .then(function (result) {  //正确请求成功时处理
                // var jsonResultString = JSON.stringify(result.data);
                var jsonResult = result.data;

                if(jsonResult.status == "success"){
                    var array = jsonResult.message;
                    if(array.length>0){
                        dd.config.timeStamp = array[0].timeStamp;
                        dd.config.nonceStr = array[0].nonceStr;
                        dd.config.signature = array[0].signature;
                        $scope.accesstoken = array[0].accesstoken;

                        $scope.requestAuthCode();
                    }
                }else{
                    var jsonResult = result.data;
                    showAlert(JSON.stringify(jsonResult));
                }

            }).catch(function (result) { //捕捉错误处理

            showAlert(JSON.stringify(result));
        });
        $scope.requestAuthCode = function () {
            dd.ready(function() {
            dd.runtime.permission.requestAuthCode({
                corpId: "ding38c46ef492978e7335c2f4657eb6378f",
                onSuccess: function (result) {
                    var code = result.code;

                    $scope.getDdUserFromAPP(code,$scope.accesstoken);
                    /*{
                        code: 'hYLK98jkf0m' //string authCode
                    }*/
                },
                onFail: function (err) {
                    showAlert("关联账号失败");
                },
            });
            });
        }
        $scope.getDdUserFromAPP = function (code,access_token) {
            service.getDdUserFromAPP(code,access_token)
                .then(function (result) {  //正确请求成功时处理
                    // var jsonResultString = JSON.stringify(result.data);
                    var dataJson = result.data;

                    if(dataJson.resultCode == 100){
                        localStorage.setItem("username",dataJson.username);
                        localStorage.setItem("uuid",dataJson.uuid);
                        localStorage.setItem("name",dataJson.name);
                        localStorage.setItem("companyid",dataJson.companyid);
                        localStorage.setItem("isSign","1");
                        //从定义左上角返回键
                        dd.biz.navigation.setLeft({
                            control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                            text: '',//控制显示文本，空字符串表示显示默认文本
                            onSuccess: function (result) {
                                //直接返回了，不在返回到原来的路由--------------用于处理基路由的时候返回问题
                                $scope.wifiCancel();
                            },
                            onFail: function (err) {
                                showAlert(JSON.stringify(err));
                            }
                        });

                        //设置没有标题
                        // dd.biz.navigation.setTitle({
                        //     title : '',//控制标题文本，空字符串表示显示默认文本
                        //     onSuccess : function(result) {
                        //         /*结构
                        //         {
                        //         }*/
                        //     },
                        //     onFail : function(err) {}
                        // });
                    }else if(dataJson.resultCode == 101){
                        showAlert("access_token 获取失败");
                    }else if(dataJson.resultCode == 102){
                        showAlert("ticket 获取失败");
                    }else if(dataJson.resultCode == 103){
                        showAlert("access_token 或 code错误");
                    }else if(dataJson.resultCode == 200){
                        showAlert("参数错误");
                    }else if(dataJson.resultCode == 500){
                        showAlert("未查询到工号信息");
                    }

                }).catch(function (result) { //捕捉错误处理
                showAlert(JSON.stringify(result));
            });
        }


        $scope.toWifiFix = function () {
            if (localStorage.getItem("isSign") == "1") {
                $ionicViewSwitcher.nextDirection('forward')
                $state.go('tab.WifiFix');
            }else{
                showAlert("未成功关联账号");
            }
        }
        $scope.toWifiVisitor = function () {
            if (localStorage.getItem("isSign") == "1") {
                $ionicViewSwitcher.nextDirection('forward')
                $state.go('tab.WifiVisitor');
            }else{
                showAlert("未成功关联账号");
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
