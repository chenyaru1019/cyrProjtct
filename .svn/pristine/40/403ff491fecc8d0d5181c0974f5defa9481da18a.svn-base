angular.module('starter.HelperPropertyCtrl', [])

    .controller('HelperPropertyCtrl', function($scope,$state,service,$rootScope,$timeout,
                                               $ionicViewSwitcher,$ionicHistory,$ionicNavBarDelegate,$ionicPopup,$ionicActionSheet) {
        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];
        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");


        var nameT = localStorage.getItem("name");
        //$scope.peopleName = nameT;


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
                        uuid = localStorage.getItem("uuid");
                        username = localStorage.getItem("username");

                        $scope.peopleName = dataJson.name;
                        $scope.roomName = dataJson.roomCode;

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



        //设备地点
        $scope.roomName = "";
        //设备型号
        $scope.equmentType = "";
        //报修人
        $scope.peopleName = "";
        //设备故障描述
        $scope.description = "";


        //提交数据
        $scope.submitMessage = function () {

            // //设备地点
            // $scope.roomName = "";
            // //设备型号
            // $scope.equmentType = "";
            // //报修人
            // $scope.peopleName = "";
            // //设备故障描述
            // $scope.description = "";
            // //公司
            // $scope.currentCom = "";
            // //部门
            // $scope.currentDept = "";
            // //线路
            // $scope.currentLine = "";
            // //站点
            // $scope.currentStation = "";

            var submitBool = true;

            if($scope.peopleName.length<=0){
                showAlert("请输入报修人信息");
                submitBool = false;
            }else if($scope.roomName.length<=0){
                showAlert("请输入房间号");
                submitBool = false;
            }else if($scope.equmentType.length<=0){
                showAlert("请输入设备名称");
                submitBool = false;
            }else if($scope.description.length<=0){
                showAlert("请输入故障现象");
                submitBool = false;
            }

            if(submitBool){
                var equmentTypeT = "";
                if($scope.equmentType == "其他"){
                    equmentTypeT = $scope.equmentType1;
                }else{
                    equmentTypeT = $scope.equmentType;
                }

                var msg = $scope.peopleName+" 报修位于"+$scope.roomName+"的物业设备 "+equmentTypeT+"，现象为"+$scope.description+"，请相关人员及时处理。";

                var contactM = "报修设备地点(房间号)："+$scope.roomName+"/n报修设备名称(型号)："+equmentTypeT+"/n设备故障现象(必填项)："+$scope.description;
                var submitData = {
                    contact:$scope.peopleName,
                    content:contactM,
                    msg:msg,
                    type:"003",
                    username:username,
                    uuid:uuid
                };

                service.submitComputerMessage(submitData)
                    .then(function (result) {
                        // alert(JSON.stringify(result));
                        var dataJson = result.data;
                        if(dataJson.status == "success"){
                            showAlert("报修提交成功","close");
                        }
                    })
                    .catch(function (result) {
                        alert(JSON.stringify(result))
                    })
            }



        };

        // 一个提示对话框
        var showAlert = function(title,type) {
            var alertPopup = $ionicPopup.alert({

                title: '', // String. 弹窗的标题。
                subTitle: '', // String (可选)。弹窗的子标题。
                template: '<div style="width: 100%;text-align: center;font-size: 18px">'+title+'</div>', // String (可选)。放在弹窗body内的html模板。
                templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
                okText: '确定', // String (默认: 'OK')。OK按钮的文字。
                okType: 'button-positive' // String (默认: 'button-positive')。OK按钮的类型。
            });
            alertPopup.then(function(res) {
                if(type == localStorage.getItem("getBack")){                   //正式环境需要改回去
                    dd.biz.navigation.close({
                        onSuccess: function (result) {
                            /*result结构
                            {}
                            */
                        },
                        onFail: function (err) {
                        }
                    })
                }
            });
        };

        $scope.isShowtf = false;
        $scope.equmentType1 = "";
        var arr = ['电梯','灯具','门','洗手间','其他'];
        $scope.showAc1 = function() {

            $scope.equmentType1 = "";

            var hideSheet = $ionicActionSheet.show({
                buttons:  [
                    { text: '<b>电梯</b>' },
                    { text: '<b>灯具</b>'  },
                    { text: '<b>门</b>'  },
                    { text: '<b>洗手间</b>'  },
                    { text: '<b>其他</b>'  }
                ],
                titleText: '报修设备(必填)',
                buttonClicked: function(index) {
                    $scope.equmentType = arr[index];
                    if(index==4){
                        $scope.isShowtf = true;
                    }else{
                        $scope.isShowtf = false;
                    }
                    return true;
                }
            });

        };

        dd.ready(function() {
            dd.biz.navigation.setTitle({
                title : '物业设备报修',//控制标题文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });

            dd.ui.webViewBounce.disable();

            dd.biz.navigation.setLeft({
                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                text: '',//控制显示文本，空字符串表示显示默认文本
                onSuccess: function (result) {
                    //直接返回了，不在返回到原来的路由--------------用于处理基路由的时候返回问题
                    dd.biz.navigation.close({
                        onSuccess: function (result) {
                            /*result结构
                            {}
                            */
                        },
                        onFail: function (err) {
                        }
                    });

                },
                onFail: function (err) {
                    //showAlert(JSON.stringify(err));
                }
            });

        });


        //测试代码
        //$scope.appType = true;

    });
