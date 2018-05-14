angular.module('starter.HelperOfficeCtrl', [])

    .controller('HelperOfficeCtrl', function($scope,$state,service,$rootScope,$timeout,
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

        $scope.showStatSelect = true;
        var roomName2 = "";
        var mycompanyCodeCos= "";
        var mydepartmentCodeCos= "";

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
                        $scope.roomName =  dataJson.roomCode;

                        $scope.mycompanyCode = dataJson.companyCode;
                        $scope.mydepartmentCode = dataJson.departmentCode;
                        //alert($scope.mycompanyCode +"*"+$scope.mydepartmentCode);
                        $scope.x = $scope.mycompanyCode;
                        $scope.y = $scope.mydepartmentCode;
                        // alert($scope.x+"*"+$scope.y);
                        mycompanyCodeCos = dataJson.companyCode;
                        mydepartmentCodeCos = dataJson.departmentCode;
                        roomName2 =  dataJson.roomCode;

                        if($scope.x == "010200"||$scope.x == "010300"||
                            $scope.x == "010400"||$scope.x == "010500"||
                            $scope.x == "011300"){
                            $scope.showStatSelect = true;
                        }else{
                            $scope.showStatSelect = false;
                        }

                        //网络访问
                        getCompanyAndDept();
                        //初始化
                        getLineStationWithLine("1")

                        // dd.biz.navigation.setLeft({
                        //     control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                        //     text: '',//控制显示文本，空字符串表示显示默认文本
                        //     onSuccess: function (result) {
                        //         //直接返回了，不在返回到原来的路由--------------用于处理基路由的时候返回问题
                        //
                        //         getBackAction();
                        //     },
                        //     onFail: function (err) {
                        //         showAlert(JSON.stringify(err),"close");
                        //     }
                        // });

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
        //公司
        $scope.currentCom = "010000";
        //部门
        $scope.currentDept = "0001";
        //线路
        $scope.currentLine = "";
        //站点
        $scope.currentStation = "";

        //线路数组
        $scope.LineArray = [];

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

        //$scope.y = "0001";
        $scope.w = "28";

        $scope.changeCom =  function(x) {
            $scope.currentCom = x;

            if($scope.currentCom == "010200"||$scope.currentCom == "010300"||
                $scope.currentCom == "010400"||$scope.currentCom == "010500"||
                $scope.currentCom == "011300"){
                $scope.showStatSelect = true;
            }else{
                $scope.showStatSelect = false;
            }

            // alert(x);
            for(var i = 0;i<$scope.deptArray.length;i++){
                if($scope.deptArray[i].companyCd == x){
                    $scope.currentDeptArray = $scope.deptArray[i].department;
                    $scope.y = $scope.deptArray[i].department[0].departmentCd;
                    // alert($scope.y+JSON.stringify($scope.currentDeptArray));
                }
            }

            if($scope.currentCom == mycompanyCodeCos && $scope.y == mydepartmentCodeCos){
                $scope.roomName = roomName2;
            }else{
                $scope.roomName = "";
            }
        };

        //选择部门
        $scope.changeDept = function (modelNum) {
            for(var i = 0;i<$scope.currentDeptArray.length;i++){
                if($scope.currentDeptArray[i].departmentCd == modelNum){
                    $scope.currentDept = $scope.currentDeptArray[i].departmentName;
                }
            }

            if($scope.y == mydepartmentCodeCos){
                $scope.roomName = roomName2;
            }else{
                $scope.roomName = "";
            }
        };

        //选择线路
        $scope.changeLine = function (z) {
            $scope.currentLine = z;
            getLineStationWithLine(z);
        }
        //选择站点
        $scope.changeStation = function (modelNum) {
            $scope.currentStation = modelNum;
        }

        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");


        var nameT = localStorage.getItem("name");
        //$scope.peopleName = nameT;

        $scope.computerArray = [];
        $scope.deptArray = [];
        $scope.currentDeptArray = [];


        function getCompanyAndDept() {
            service.getComputerNameAndDept(uuid,username)
                .then(function (result) {
                    var dataJson = result.data;
                    console.log(JSON.stringify(dataJson));
                    if(dataJson.status == "success"){
                        var companyA = [];
                        var deptA = [];
                        for(var i =0;i< dataJson.content.length;i++){
                            var comL = {
                                "companyCd":dataJson.content[i].companyCd,
                                "companyName":dataJson.content[i].companyName,
                            };
                            companyA.push(comL);

                            var deptL = {
                                "companyCd":dataJson.content[i].companyCd,
                                "department":dataJson.content[i].department,
                            }
                            deptA.push(deptL);
                        }

                        $scope.computerArray = companyA;
                        $scope.deptArray = deptA;
                        $scope.currentDeptArray = deptA[0].department;

                    }else{
                        showAlert("网络访问失败");
                    }
                })
                .catch(function (result) {
                    showAlert(JSON.stringify(result));
                })
        }

        service.getLineMessage(uuid,username)
            .then(function (result) {
                var dataJson = result.data;
                if(dataJson.status == "success"){
                    $scope.LineArray =dataJson.content;
                }
            })
            .catch(function (result) {

            })


        function getLineStationWithLine(z) {
            service.getLineStationMessage(uuid,username,z)
                .then(function (result) {
                    var dataJson = result.data;
                    if(dataJson.status == "success"){
                        $scope.StationArray =dataJson.content[0].stations;

                        //此处为什么要加一个 '' ！！！ 因为他么的接口给的 公司信息ID是字符串  线路给的是int 此处不转换为string 后面不识别，真他么坑爹，核对一上午代码，留个纪念
                        //$scope.we = dataJson.content[0].stations[0].id+'';

                    }
                })
                .catch(function (result) {

                })
        }

        //获取站点，访问多次
        $scope.StationArray = [];

        //提交数据
        $scope.submitMessage = function () {
            showAlert("test");

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

                var msg = $scope.peopleName+" 报修位于"+$scope.roomName+"的电脑 "+equmentTypeT+"，现象为"+$scope.description+"，请相关人员及时处理。";

                var contactM = "报修设备地点(房间号)："+$scope.roomName+"/n报修设备名称(型号)："+equmentTypeT+"/n设备故障现象(必填项)："+$scope.description;
                var submitData = {
                    contact:$scope.peopleName,
                    content:contactM,
                    departmentName:$scope.departmentName,
                    description:$scope.description,
                    lineId:$scope.currentLine,
                    model:equmentTypeT,
                    msg:msg,
                    orgId:$scope.currentCom,
                    room:$scope.roomName,
                    stationId:$scope.currentStation,
                    type:"001",
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


        $scope.isShowtf = false;
        $scope.equmentType1 = "";
        var arr = ['打印机','投影仪','扫描仪','传真机','其他'];
        $scope.showAc1 = function() {

            $scope.equmentType1 = "";

            var hideSheet = $ionicActionSheet.show({
                buttons:  [
                    { text: '<b>打印机</b>' },
                    { text: '<b>投影仪</b>'  },
                    { text: '<b>扫描仪</b>'  },
                    { text: '<b>传真机</b>'  },
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
                title : '办公设备报修',//控制标题文本，空字符串表示显示默认文本
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
        //网络访问
       // getCompanyAndDept();
        //初始化
        //getLineStationWithLine("1")
    });