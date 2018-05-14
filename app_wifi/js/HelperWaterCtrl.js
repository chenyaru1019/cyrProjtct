angular.module('starter.HelperWaterCtrl', [])

    .controller('HelperWaterCtrl', function($scope,$state,service,$rootScope,$timeout,$stateParams,$filter,
                                             $ionicViewSwitcher,$ionicHistory,$ionicNavBarDelegate,$ionicPopup,$ionicActionSheet) {
        //判断手机端才能使用
        // $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];
        // $scope.appType = false;

        // if(btypeInfo == "aliapp"){
        //     $scope.appType = true;
        // }else{
        //     $scope.appType = false;
        // }
        $scope.appType = true;
        $scope.helperWater = true;
        $scope.helperWater_color = "#4A90E2";
        $scope.waterHistory_color = "#3D3D3D";
        $scope.screenHeight = screen.height-70+"px";
        $scope.waterNum1 = 0;
        $scope.waterNum2 = 0;
        $scope.waterNum3 = 0;
        $scope.waterNum = 0;
        $scope.pagestart= "0";
        $scope.domore = true;
        $scope.codeFrom = "0";


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
                    showAlert(JSON.stringify(jsonResult),"close");
                }

            }).catch(function (result) { //捕捉错误处理

            showAlert(JSON.stringify(result),"close");
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
                        showAlert("关联账号失败","close");
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
                        localStorage.setItem("isSign","1");
                        localStorage.setItem("companyid",dataJson.companyid);
                        localStorage.setItem("room",dataJson.roomCode);
                        $scope.getWaterOrderList();
                        $scope.listData = dataList;
                    }else if(dataJson.resultCode == 101){
                        showAlert("access_token 获取失败","close");
                    }else if(dataJson.resultCode == 102){
                        showAlert("ticket 获取失败","close");
                    }else if(dataJson.resultCode == 103){
                        showAlert("access_token 或 code错误","close");
                    }else if(dataJson.resultCode == 200){
                        showAlert("参数错误","close");
                    }else if(dataJson.resultCode == 500){
                        showAlert("未查询到工号信息","close");
                    }

                }).catch(function (result) { //捕捉错误处理
                showAlert(JSON.stringify(result),"close");
            });
        }

        //钉钉标题与返回键设置
        dd.ready(function() {
            dd.biz.navigation.setTitle({
                title : '送水服务',//控制标题文本，空字符串表示显示默认文本
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


        $scope.getWaterOrderList = function () {
            var submitData = {
                uuid:localStorage.getItem("uuid"),
                pagestart:$scope.pagestart,
                pagemax:"20"
            };
            service.getWaterOrderList(submitData)
                .then(function (result) {
                    var dataJson = result.data;
                    if(dataJson.status == "success"){
                        dataList.length =0;
                        for(var i=0;i<dataJson.content.length;i++){
                            var codeForWater1 = 0;
                            var codeForWater2 = 0;
                            var codeForWater3 = 0;
                            for(var j=0;j<dataJson.content[i].orderDetail.length;j++){
                                if(dataJson.content[i].orderDetail[j].bottleType == 1){
                                    codeForWater1 = dataJson.content[i].orderDetail[j].count;
                                }else if(dataJson.content[i].orderDetail[j].bottleType == 2){
                                    codeForWater2 = dataJson.content[i].orderDetail[j].count;
                                }else if(dataJson.content[i].orderDetail[j].bottleType == 3){
                                    codeForWater3 = dataJson.content[i].orderDetail[j].count;
                                }
                            }
                            var createAt = dataJson.content[i].createAt;
                            if ($scope.systemOS() == "IOS"){
                                createAt = createAt.replace(/-/g,'/');
                            }
                            createAt = $filter('date')(new Date(createAt), "yyyy.MM.dd HH:mm");
                            var ob = {
                                id:dataJson.content[i].id,
                                orderName:dataJson.content[i].orderName,
                                orderMobile:dataJson.content[i].orderPhone,
                                orderPhone:dataJson.content[i].orderMobile,
                                createAt:createAt,
                                room:dataJson.content[i].room,
                                codeForWater1:codeForWater1,
                                codeForWater2:codeForWater2,
                                codeForWater3:codeForWater3,
                            }
                            dataList.push(ob);
                        }
                    }else{
                        showAlert(JSON.stringify(dataJson))
                    }
                })
                .catch(function (result) {
                    showAlert(JSON.stringify(result))
                })
        }

        $scope.getWaterOrderList_more = function () {
            var submitData = {
                uuid:localStorage.getItem("uuid"),
                pagestart:$scope.pagestart,
                pagemax:"20"
            };
            service.getWaterOrderList(submitData)
                .then(function (result) {
                    // alert(JSON.stringify(result));
                    var dataJson = result.data;
                    if(dataJson.status == "success"){
                        if(dataJson.content.length==0){
                            $scope.domore = false;
                        }else if($scope.listData.length >= 100){
                            $scope.domore = false;
                        }else {
                            for (var i = 0; i < dataJson.content.length; i++) {
                                var codeForWater1 = 0;
                                var codeForWater2 = 0;
                                var codeForWater3 = 0;
                                for (var j = 0; j < dataJson.content[i].orderDetail.length; j++) {
                                    if (dataJson.content[i].orderDetail[j].bottleType == 1) {
                                        codeForWater1 = dataJson.content[i].orderDetail[j].count;
                                    } else if (dataJson.content[i].orderDetail[j].bottleType == 2) {
                                        codeForWater2 = dataJson.content[i].orderDetail[j].count;
                                    } else if (dataJson.content[i].orderDetail[j].bottleType == 3) {
                                        codeForWater3 = dataJson.content[i].orderDetail[j].count;
                                    }
                                }
                                var createAt = dataJson.content[i].createAt;
                                if ($scope.systemOS() == "IOS"){
                                    createAt = createAt.replace(/-/g,'/');
                                }
                                createAt = $filter('date')(new Date(createAt), "yyyy.MM.dd HH:mm");
                                var ob = {
                                    id: dataJson.content[i].id,
                                    orderName: dataJson.content[i].orderName,
                                    orderMobile: dataJson.content[i].orderMobile,
                                    orderPhone: dataJson.content[i].orderPhone,
                                    createAt: createAt,
                                    room: dataJson.content[i].room,
                                    codeForWater1: codeForWater1,
                                    codeForWater2: codeForWater2,
                                    codeForWater3: codeForWater3,
                                }
                                dataList.push(ob);
                            }
                        }
                    }else{
                        showAlert(dataJson.errormsg,"close");
                    }
                })
                .catch(function (result) {
                    showAlert(JSON.stringify(result))
                })
        }

        var dataList = new Array();
        $scope.$on('$ionicView.enter', function() {
            $scope.codeFrom = $stateParams.codeFrom;
            if($scope.codeFrom == "success"){
                $scope.helperWater = true;
                $scope.helperWater_color = "#4A90E2";
                $scope.waterHistory_color = "#3D3D3D";
                $scope.screenHeight = screen.height-70+"px";
                $scope.waterNum1 = 0;
                $scope.waterNum2 = 0;
                $scope.waterNum3 = 0;
                $scope.waterNum = 0;
                $scope.pagestart= "0";
                $scope.domore = true;
                $scope.codeFrom = "0";
            }
            if(localStorage.getItem("isSign") == 1){
                $scope.getWaterOrderList();
                $scope.listData = dataList;
            }
        });
        $scope.listData = dataList;
        $scope.toWaterInput1 = function (item) {
            var ob = {
                typeCode: "history",
                codeForWater1: item.codeForWater1,
                codeForWater2: item.codeForWater2,
                codeForWater3: item.codeForWater3,
                address : item.room,
                name : item.orderName,
                telephone : item.orderMobile,
                cellphone : item.orderPhone,
            }
            var jsonString = JSON.stringify(ob);
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('tab.WaterInput',{jsonString:jsonString});
        }

        //跳转输入界面
        $scope.toWaterInput = function (item) {
            if( $scope.waterNum == 0){
                showAlert("选取不能为空");
            }else{
                var ob = {
                    typeCode:"first",
                    codeForWater1:$scope.waterNum1,
                    codeForWater2:$scope.waterNum2,
                    codeForWater3:$scope.waterNum3,
                }
                var jsonString = JSON.stringify(ob);
                $ionicViewSwitcher.nextDirection('forward');
                $state.go('tab.WaterInput',{jsonString:jsonString});
            }
        }
        //跳转历史记录界面
        $scope.toWaterHistory = function () {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('tab.WaterHistory');
        }

        $scope.changeHelperWater = function (code) {
            if(code == 0){
                $scope.helperWater = true;
                $scope.helperWater_color = "#4A90E2";
                $scope.waterHistory_color = "#3D3D3D";
            }else{
                $scope.helperWater = false;
                $scope.helperWater_color = "#3D3D3D";
                $scope.waterHistory_color = "#4A90E2";
            }

        }
        //加减计算方法
        $scope.add = function (code) {
            if(code == 1){
                $scope.waterNum1 =  $scope.waterNum1+1;
            }else if(code == 2){
                $scope.waterNum2 =  $scope.waterNum2+1;
            }else if(code == 3){
                $scope.waterNum3 =  $scope.waterNum3+1;
            }
            $scope.waterNum = $scope.waterNum1+$scope.waterNum2+$scope.waterNum3;
        }
        $scope.minus = function (code) {
            if(code == 1 && $scope.waterNum1 != 0){
                $scope.waterNum1 =  $scope.waterNum1-1;
            }else if(code == 2 && $scope.waterNum2 != 0){
                $scope.waterNum2 =  $scope.waterNum2-1;
            }else if(code == 3 && $scope.waterNum3 != 0){
                $scope.waterNum3 =  $scope.waterNum3-1;
            }
            $scope.waterNum = $scope.waterNum1+$scope.waterNum2+$scope.waterNum3;
        }

        $scope.doRefresh = function() {
            dataList.length =0;
            $scope.pagestart = "0";
            $scope.getWaterOrderList();
            $scope.listData = dataList;
            $scope.$broadcast('scroll.refreshComplete');
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 3000);
        };
        $scope.loadMore = function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.pagestart = $scope.listData.length;
            $scope.getWaterOrderList_more();
            $scope.listData = dataList;
            $timeout(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, 3000);
        }

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

        //判断是苹果还是android
        $scope.systemOS = function () {
            var isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod|ios|os/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };

            if ( isMobile.Android() ) {
                return "android";
            }
            else if(isMobile.iOS())
            {
                return "IOS";
            }
        }
    });
