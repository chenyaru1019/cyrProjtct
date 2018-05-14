angular.module('starter.BusCtrl', [])

    .controller('BusCtrl', function($ionicNavBarDelegate,$scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,noSigns,$ionicPopup) {

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

        $scope.busCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }

        var dataList = new Array();
        var uuid = localStorage.getItem("uuid");

        service.getDdFromAPP()
            .then(function (result) {  //正确请求成功时处理
                // var jsonResultString = JSON.stringify(re sult.data);
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
                        localStorage.setItem("isSign","1");
                        localStorage.setItem("companyid",dataJson.companyid);
                        uuid = localStorage.getItem("uuid");
                        $scope.getbus(0);

                        // //设置没有标题
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


        $scope.getbus = function (pagestart) {
            service.getbus(uuid,pagestart)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;

                    if (jsonResult.status == "success") {
                        $scope.addandsetdata(jsonResult);
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理

            });
        }
        $scope.listData = dataList;

        $scope.addandsetdata = function (jsonResult) {
            for (var i = 0; i < jsonResult.content.length; i++) {

                var strs = new Array();
                var strContent = new Array();
                strs = jsonResult.content[i].content.split("\n"); //字符分割
                for (var j = 0; j < strs.length; j++) {
                    var contentOb = {
                        lineText: strs[j]
                    }
                    strContent.push(contentOb);
                }
                var image = "../img/ic_shuttlebus.png";
                if (jsonResult.content[i].title.indexOf("列车") != -1 || jsonResult.content[i].title.indexOf("地铁") != -1 ||
                    jsonResult.content[i].title.indexOf("火车") != -1 || jsonResult.content[i].title.indexOf("晚班车") != -1) {
                    image = "../img/ic_shmetro.png";
                }
                var object = {
                    content: strContent,
                    dt: jsonResult.content[i].dt,
                    id: jsonResult.content[i].id,
                    title: jsonResult.content[i].title,
                    image: image
                }
                dataList.push(object);
            }
        }

        $scope.doRefresh = function() {
            if (localStorage.getItem("isSign") == "0") {
                showAlert("未成功关联账号");
                return;
            }
            service.getbus(uuid,"0")
                .then(function (result) {
                    var jsonResult = result.data;

                    console.log(JSON.stringify(jsonResult));

                    dataList.length = 0;
                    $scope.addandsetdata(jsonResult);
                    $scope.$broadcast('scroll.refreshComplete');
                })
                .catch(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 5000);
        };
        $scope.domore = true;
        $scope.loadMore = function() {
            if (localStorage.getItem("isSign") == "0") {
                showAlert("未成功关联账号");
                return;
            }
            service.getbus(uuid,$scope.listData.length)
                .success(function (result) {
                    var jsonResult = result;
                    if(jsonResult.content.length == 0){
                        $scope.domore = false;
                    }else if($scope.listData.length >= 100){
                        $scope.domore = false;
                    }
                    $scope.addandsetdata(jsonResult);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
                .finally(function() {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            $timeout(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, 3000);
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

        // $scope.getbus("0");
    });
