App.controller('MainCtrl', function ($scope, $route) {
    $scope.$route = $route;
})

    // 测试界面
.controller('SpPageCtrl', function ($scope, $route) {
    $scope.showTitle = "温馨提示";
    $scope.showMessage = "";
    $scope.$route = $route;
    $scope.urlVideo = 'http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8';
    $scope.cancel = function() {
        //此处使用js原生方式回退
        history.back();
    }
    $scope.dataList = [{"age":10},{"age":10}];

    $(function(){
        // 默认显示
        $(".dropdown-toggle").dropdown('toggle');
    });

})


    // 党费主界面
.controller('PartyMainCtrl', function ($scope, $route,service,$filter) {

    $scope.showTitle = "温馨提示";
    $scope.showMessage = "";
    // $ionicNavBarDelegate.showBar(false);
    var ua = navigator.userAgent.toLowerCase();
    var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

    $scope.appType = false;

    if(btypeInfo == "aliapp"){
        $scope.appType = true;
    }else{
        $scope.appType = false;
    }

    // $scope.appType = true;

    $scope.$route = $route;
    // $scope.alert = function () {


    //     dd.ready(function(result) {
    //         alert('dd ready'+result);
    //
    //         dd.device.notification.alert({
    //             message: 'dd.device.notification.alert',
    //             title: 'This is title',
    //             buttonName: 'button',
    //             onSuccess: function(data) {
    //                 alert('win: ' + JSON.stringify(data));
    //             },
    //             onFail: function(err) {
    //                 alert('fail: ' + JSON.stringify(err));
    //             }
    //         });
    //     });
    //
    //     dd.error(function(err) {
    //         alert('dd error: ' + JSON.stringify(err));
    //     });
    //
    // };
    // $scope.toast = function () {



        // dd.ready(function () {
        //     dd.device.notification.confirm({
        //         message: "你爱我吗",
        //         title: "提示",
        //         buttonLabels: ['爱', '不爱'],
        //         onSuccess: function (result) {
        //             //onSuccess将在点击button之后回调
        //             /*
        //             {
        //                 buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始
        //             }
        //             */
        //         },
        //         onFail: function (err) {
        //         }
        //     })
        // });

        // dd.device.notification.toast({
        //     icon: '', //icon样式，有success和error，默认为空 0.0.2
        //     text: 'toast', //提示信息
        //     duration: 3, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
        //     delay: 0, //延迟显示，单位秒，默认0
        //     onSuccess : function(result) {
        //         /*{}*/
        //     },
        //     onFail : function(err) {}
        // })
    // }
    // $scope.scan = function () {
    //     // dd.ready(function () {
    //         dd.biz.util.scan({
    //             type: "qrCode", // type 为 all、qrCode、barCode，默认是all。
    //             onSuccess: function (data) {
    //                 alert(JSON.stringify(data));
                    //onSuccess将在扫码成功之后回调
                    /* data结构
                      { 'text': String}
                    */
                // },
            //     onFail: function (err) {
            //         alert(JSON.stringify(err));
            //     }
            // })
        // });
    // }
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
                showAlert("温馨提示",jsonResult.emsg,"0");
                // alert(jsonResult.emsg);
            }

        }).catch(function (result) { //捕捉错误处理
        showAlert("温馨提示",JSON.stringify(result),"0");
        // alert(JSON.stringify(result));
        });
    $scope.requestAuthCode = function () {
        dd.ready(function() {
            dd.runtime.permission.requestAuthCode({
                corpId: "ding4f6b70a714747da935c2f4657eb6378f",
                onSuccess: function (result) {
                    var code = result.code;
                    // alert(code);
                    $scope.getDdUserFromAPP(code,$scope.accesstoken);
                    /*{
                        code: 'hYLK98jkf0m' //string authCode
                    }*/
                },
                onFail: function (err) {
                    showAlert("温馨提示","关联账号失败","0");
                    // alert("关联账号失败");

                },
            });
        });
    }
    $scope.getDdUserFromAPP = function (code,access_token) {
        service.getDdUserFromAPP(code,access_token)
            .then(function (result) {  //正确请求成功时处理
                // var jsonResultString = JSON.stringify(result.data);
                var dataJson = result.data;
                // alert(JSON.stringify(result.data));
                if(dataJson.resultCode == 100){
                    username = dataJson.jobnumber;
                    $scope.companyCode = dataJson.companyid;
                    if(username!="" &&username != null){
                        json = {
                            myDate:myJsDate,
                            psnCode:username,
                            companyCode:$scope.companyCode
                        }
                        $scope.jsonString1 = JSON.stringify(json);
                        $scope.getStaffPartyBranch();
                    }
                }else if(dataJson.resultCode == 101){
                    showAlert("温馨提示","access_token 获取失败","0");
                    // alert("access_token 获取失败");
                }else if(dataJson.resultCode == 102){
                    showAlert("温馨提示","ticket 获取失败","0");
                    // alert("ticket 获取失败");
                }else if(dataJson.resultCode == 103){
                    showAlert("温馨提示","access_token 或 code错误","0");
                    // alert("access_token 或 code错误");
                }else if(dataJson.resultCode == 200){
                    showAlert("温馨提示","参数错误","0");
                    // alert("参数错误");
                }else if(dataJson.resultCode == 500){
                    showAlert("温馨提示","未查询到工号信息","0");
                    // alert("未查询到工号信息");
                }

            }).catch(function (result) { //捕捉错误处理

        });
    }

    var username = "";
    $scope.toWhat = 0;
    $scope.partyFly = 0;
    $scope.partyDues = "您本月党费还未缴纳";
    var date = new Date();
    var myJsDate=$filter('date')(date,'yyyy-MM');
    var json = {
        myDate:"",
        psnCode:"",
        companyCode:""
    }
    //返回上级界面
    $scope.cancel1 = function() {
        //此处使用js原生方式回退
        history.back();
    }
    $scope.getStaffPartyBranch = function () {
        // alert(username);
        service.getStaffPartyBranch(username)
            .then(function (result) {  //正确请求成功时处理
                var jsonResultString = JSON.stringify(result.data);
                var jsonResult = JSON.parse(jsonResultString);
                if (jsonResult.code == 200) {

                    $scope.psnCode = jsonResult.data.psncode;
                    $scope.partyBranchCode = jsonResult.data.partyBranchCode;
                    $scope.partyFly = jsonResult.data.partyFlg;
                    $scope.permissionList = JSON.stringify(jsonResult.data.permissionList);
                    $scope.myDate = new Date();
                    var myJsDate = $filter('date')($scope.myDate, 'yyyy-MM');
                    if ($scope.partyFly == 0) {
                        showAlert("温馨提示","目前仅对集团机关党员开放","0");
                        // alert("目前仅对党员开放");
                        $scope.href = "javascript:void(0)";
                        $scope.href1 = "javascript:void(0)";
                    } else {
                        $scope.getWagesGeneral(myJsDate, $scope.psnCode);
                        $scope.href1 = "#/partyQuery?jsonString=" + $scope.jsonString1;
                    }
                    if (!$scope.isContains($scope.permissionList, "PBM_O") && !$scope.isContains($scope.permissionList, "PBM_A")) {
                        $scope.toWhat = 0;
                        $scope.href = "javascript:void(0)";
                    } else if (!$scope.isContains($scope.permissionList, "PBM_O") && $scope.isContains($scope.permissionList, "PBM_A")) {
                        $scope.toWhat = 1;
                        var json = {
                            toWhat: $scope.toWhat,
                            partyBranchCode: $scope.partyBranchCode,
                            companyCode:$scope.companyCode
                        }
                        $scope.jsonString = JSON.stringify(json);
                        $scope.href = "#/partyPerson?jsonString=" + $scope.jsonString;
                    } else if ($scope.isContains($scope.permissionList, "PBM_O") && !$scope.isContains($scope.permissionList, "PBM_A")) {
                        $scope.toWhat = 2;
                        $scope.href = "#/partyBranch?companyCode="+$scope.companyCode;
                    } else if ($scope.isContains($scope.permissionList, "PBM_O") && $scope.isContains($scope.permissionList, "PBM_A")) {
                        $scope.toWhat = 3;
                        var json = {
                            toWhat: $scope.toWhat,
                            partyBranchCode: $scope.partyBranchCode,
                            companyCode:$scope.companyCode
                        }
                        $scope.jsonString = JSON.stringify(json);
                        $scope.href = "#/partyPerson?jsonString=" + $scope.jsonString;
                    }

                } else {
                    var jsonResultString = JSON.stringify(result.data);
                    var jsonResult = JSON.parse(jsonResultString);
                    showAlert("温馨提示",jsonResult.emsg,"0");
                    // alert(jsonResult.emsg);
                }
            }).catch(function (result) { //捕捉错误处理
            var resultData = JSON.stringify(result);
            showAlert("温馨提示",resultData,"0");
            // alert(resultData);
        });
    }

    $scope.getWagesGeneral = function (data,psnCode) {
        service.getWagesGeneral(data,psnCode)
            .then(function (result) {  //正确请求成功时处理
                var jsonResultString = JSON.stringify(result.data);
                var jsonResult = JSON.parse(jsonResultString);
                if (jsonResult.code == 200) {

                    if (jsonResult.data.partyDues == 0) {
                        $scope.partyDues = "您本月党费还未缴纳";
                    } else if (jsonResult.data.partyDues == 1) {
                        $scope.partyDues = "您本月党费已经缴纳";
                    } else {
                        $scope.partyDues = "未拉取到相关数据";
                    }
                } else {
                    var jsonResultString = JSON.stringify(result.data);
                    var jsonResult = JSON.parse(jsonResultString);
                    showAlert("温馨提示",jsonResult.emsg,"0");
                    // alert(jsonResult.emsg);
                }
            }).catch(function (result) { //捕捉错误处理
            var resultData = JSON.stringify(result);
            showAlert("温馨提示",resultData,"0");
            // alert(resultData);
        });
    }
    $scope.isContains = function (str, substr) {
        return new RegExp(substr).test(str);
    }
    $scope.clicktoParty = function () {
        if($scope.partyFly==0){
            showAlert("温馨提示","目前仅对集团机关党员开放","0");
            // alert("目前仅对党员开放");
            $scope.href = "javascript:void(0)";
            $scope.href1 = "javascript:void(0)";
        }else if($scope.partyFly!=0&&$scope.toWhat==0){
            showAlert("温馨提示","仅对支部核收人员开放","0");
            // alert("仅对支部核收人员开放");
       }
    }

    $scope.clicktoParty1 = function () {
        if($scope.partyFly==0){
            showAlert("温馨提示","目前仅对集团机关党员开放","0");
            // alert("目前仅对党员开放");
            $scope.href = "javascript:void(0)";
            $scope.href1 = "javascript:void(0)";
        }
    }

    var showAlert = function (title,messageT,typeM) {

        $scope.showTitle = title;
        $scope.showMessage = messageT;

        console.log("jquery ...");
        var message = messageT;
        dialogBox(message,
            function () {
                console.log("confirmed");
                // do something

                if(typeM == "1"){
                    dd.biz

                        .navigation.close({
                        onSuccess: function (result) {
                            /*result结构
                            {}
                            */
                        },
                        onFail: function (err) {
                        }
                    })
                }
            },
            function(){
                console.log("canceled");
                // do something
            }
        );
    }

    function dialogBox(message, yesCallback, noCallback){
        if(message){
            $('.dialog-message').html(message);
        }
        // 显示遮罩和对话框
        $('.wrap-dialog').removeClass("hide");
        // 确定按钮
        $('#confirm').click(function(){
            $('.wrap-dialog').addClass("hide");
            yesCallback();
        });
        // 取消按钮
        $('#cancel').click(function(){
            $('.wrap-dialog').addClass("hide");
            noCallback();
        });
    }


    //测试代码
    // $scope.getStaffPartyBranch();
})


    // 个人党费详情界面
.controller('PartyQueryCtrl', function ($scope, $route,service,$routeParams) {
    $scope.showTitle = "温馨提示";
    $scope.showMessage = "";
    var ua = navigator.userAgent.toLowerCase();
    var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

    $scope.appType = false;

    if(btypeInfo == "aliapp"){
        $scope.appType = true;
    }else{
        $scope.appType = false;
    }

    var jsonString = $routeParams.jsonString;
    var json = JSON.parse(jsonString);

    $scope.$route = $route;
    $scope.noPayParty = 10;
    $scope.dataArray = [
        {time:"01月",num:"**元",text:"已缴纳",color:"#eeeeee"},
        {time:"02月",num:"**元",text:"未缴纳",color:"#dd222d"}
        ];
    $scope.cancel2 = function() {
        //此处使用js原生方式回退
        history.back();
    }
    //选中某一个
    $scope.choseYear = function (year) {
        // $scope.noPayParty = year;
        // document.getElementById("myText").innerText = "*你有共计"+year+"元党费未缴纳";
        // console.log("----------");
        $scope.getWagesDetail(year+"-01",json.psnCode,json.companyCode);
    }

    // function choseYear(year) {
    //     alert(year);
    // }

    $scope.giveMoney = function (dataMessage) {
        // alert(JSON.stringify(dataMessage));
    }

    var year=new Date().getFullYear(); //获取当前年份
    var sel = document.getElementById ('sel');//获取select下拉列表
    for ( var i = 0; i < 10; i++)//循环添加2006到当前年份加3年的每个年份依次添加到下拉列表
    {
        var option = document.createElement ('option');
        var yearOne = year-i;
        option.value = yearOne;
        var txt = document.createTextNode (yearOne);
        option.appendChild (txt);
        sel.appendChild (option);
    }


    //获取网络数据
    $scope.getWagesDetail = function (time,psnCode,companyCode) {
        service.getWagesDetail(time,psnCode,companyCode)
            .then(function (result) {
                var jsonResultString = JSON.stringify(result.data);
                var jsonResult = JSON.parse(jsonResultString);
                // alert(jsonResultString);
                if (jsonResult.code == 200){
                    var dataList = jsonResult.data;
                    $scope.noPayParty = dataList.partyDuesNotPay;
                    var listD = new Array();
                    for (var i = 0;i<dataList.partyDues.length;i++){
                        var color0 = "";
                        var text0 = "";
                        if(dataList.partyDues[i].UCHECK == "1"){
                            color0 =  "#eeeeee";
                            text0 = "已缴纳";
                        }else if(dataList.partyDues[i].UCHECK == "0"){
                            color0 =  "#dd222d";
                            text0 = "未缴纳";
                        }else{
                            color0 =  "#dd222d";
                            text0 = "未缴纳";
                        }
                        var listOne = {time:dataList.partyDues[i].MONTH,num:dataList.partyDues[i].DUES,text:text0,color:color0};
                        listD.push(listOne);
                    }
                    $scope.dataArray = listD;
                }else{
                    var jsonResultString = JSON.stringify(result.data);
                    var jsonResult = JSON.parse(jsonResultString);
                    showAlert("温馨提示",jsonResult.emsg,"0");
                    // alert(jsonResult.emsg);
                }
            }).catch(function (result) {
            showAlert("温馨提示",JSON.stringify(result),"0");
            // alert(JSON.stringify(result));
        })
    }

    $scope.getWagesDetail(year+"-01",json.psnCode,json.companyCode);

    var showAlert = function (title,messageT,typeM) {

        $scope.showTitle = title;
        $scope.showMessage = messageT;

        console.log("jquery ...");
        var message = messageT;
        dialogBox(message,
            function () {
                console.log("confirmed");
                // do something

                if(typeM == "1"){
                    dd.biz

                        .navigation.close({
                        onSuccess: function (result) {
                            /*result结构
                            {}
                            */
                        },
                        onFail: function (err) {
                        }
                    })
                }
            },
            function(){
                console.log("canceled");
                // do something
            }
        );
    }

    function dialogBox(message, yesCallback, noCallback){
        if(message){
            $('.dialog-message').html(message);
        }
        // 显示遮罩和对话框
        $('.wrap-dialog').removeClass("hide");
        // 确定按钮
        $('#confirm').click(function(){
            $('.wrap-dialog').addClass("hide");
            yesCallback();
        });
        // 取消按钮
        $('#cancel').click(function(){
            $('.wrap-dialog').addClass("hide");
            noCallback();
        });
    }

})


    // 支部中人员党费详情界面
.controller('PartyPersonCtrl', function ($scope, $route,service,$routeParams) {
    $scope.showTitle = "温馨提示";
    $scope.showMessage = "";
    var ua = navigator.userAgent.toLowerCase();
    var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

    $scope.appType = false;

    if(btypeInfo == "aliapp"){
        $scope.appType = true;
    }else{
        $scope.appType = false;
    }

    $scope.$route = $route;
    var jsonString = $routeParams.jsonString;
    var json = JSON.parse(jsonString);
    if(json.toWhat==3){
        $scope.bianchShow = true;
    }else if(json.toWhat==1){
        $scope.bianchShow = false;
    }
    var partyBranchCode = json.partyBranchCode;
    $scope.companyCode = json.companyCode;
    $scope.href = "#/partyBranch?companyCode="+$scope.companyCode;

    var dataList = new Array();
    var year=new Date().getFullYear(); //获取当前年份
    service.getPartyBranchDetail(year,partyBranchCode)
        .then(function (result) {  //正确请求成功时处理
            var jsonResultString = JSON.stringify(result.data);
            var jsonResult = JSON.parse(jsonResultString);
            if(jsonResult.code == 200){
                $scope.money = jsonResult.data.totalNotPay;
                var resultList = jsonResult.data.resultList;
                for(var i=0;i<resultList.length;i++){
                    var personMoney = 0;
                    var valueList = new Array();
                    for(var j=0;j<resultList[i].value.length;j++){
                        var uCheck = "待缴纳";
                        var uCheckColor = "#DB2521";
                        if(resultList[i].value[j].UCHECK == 0){
                            uCheck = "待缴纳";
                            var uCheckColor = "#DB2521";
                        }else{
                            uCheck = "已缴纳";
                            var uCheckColor = "#DDDDDD";
                        }
                        var valueObject = {
                            PSNCODE:resultList[i].value[j].PSNCODE,
                            PSNNAME:resultList[i].value[j].PSNNAME,
                            PBCODE:resultList[i].value[j].PBCODE,
                            PBNAME:resultList[i].value[j].PBNAME,
                            DUES:resultList[i].value[j].DUES,
                            UCHECK:uCheck,
                            PCHECK:resultList[i].value[j].PCHECK,
                            CYEAR:resultList[i].value[j].CYEAR,
                            CPERIOD:resultList[i].value[j].CPERIOD,
                            MONTH:resultList[i].value[j].MONTH,
                            DATE:resultList[i].value[j].DATE,
                            uCheckColor:uCheckColor,
                            number:i+Math.random()+j,
                        }
                        valueList.push(valueObject);
                        personMoney = personMoney+parseInt(valueObject.DUES);
                        $scope.PBNAME = resultList[i].value[0].PBNAME;
                    }
                    var object = {
                        name:resultList[i].name,
                        value:valueList,
                        personMoney:personMoney,
                    }
                    dataList.push(object);
                }
            }else{
                var jsonResultString = JSON.stringify(result.data);
                var jsonResult = JSON.parse(jsonResultString);
                showAlert("温馨提示",jsonResult.emsg,"0");
                // alert(jsonResult.emsg);
            }
        }).catch(function (result) { //捕捉错误处理
        showAlert("温馨提示",JSON.stringify(result),"0");
        // alert(JSON.stringify(result));
    });

    $scope.listData = dataList;

    $scope.cancel3 = function() {
        //此处使用js原生方式回退
        history.back();
    }

    $scope.checkPartyDuseByParty = function(date,psnCode,number,dues,UCHECK) {
        if(UCHECK == "待缴纳") {
            service.checkPartyDuseByParty(date, psnCode)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResultString = JSON.stringify(result.data);
                    var jsonResult = JSON.parse(jsonResultString);
                    if (jsonResult.code == 200) {
                        for (var i = 0; i < $scope.listData.length; i++) {
                            for (var j = 0; j < $scope.listData[i].value.length; j++) {
                                if (number == $scope.listData[i].value[j].number) {
                                    if ($scope.listData[i].value[j].UCHECK == "待缴纳") {
                                        $scope.listData[i].value[j].UCHECK = "已缴纳";
                                        $scope.listData[i].value[j].uCheckColor = "#DDDDDD";
                                    }
                                }
                            }
                        }
                        $scope.money = parseInt($scope.money) - parseInt(dues);
                    } else {
                        var jsonResultString = JSON.stringify(result.data);
                        var jsonResult = JSON.parse(jsonResultString);
                        showAlert("温馨提示",jsonResult.emsg,"0");
                        // alert(jsonResult.emsg);
                    }
                }).catch(function (result) { //捕捉错误处理
                showAlert("温馨提示",JSON.stringify(result),"0");
                // alert(JSON.stringify(result));
            });
        }
    }
    var showAlert = function (title,messageT,typeM) {

        $scope.showTitle = title;
        $scope.showMessage = messageT;

        console.log("jquery ...");
        var message = messageT;
        dialogBox(message,
            function () {
                console.log("confirmed");
                // do something

                if(typeM == "1"){
                    dd.biz

                        .navigation.close({
                        onSuccess: function (result) {
                            /*result结构
                            {}
                            */
                        },
                        onFail: function (err) {
                        }
                    })
                }
            },
            function(){
                console.log("canceled");
                // do something
            }
        );
    }

    function dialogBox(message, yesCallback, noCallback){
        if(message){
            $('.dialog-message').html(message);
        }
        // 显示遮罩和对话框
        $('.wrap-dialog').removeClass("hide");
        // 确定按钮
        $('#confirm').click(function(){
            $('.wrap-dialog').addClass("hide");
            yesCallback();
        });
        // 取消按钮
        $('#cancel').click(function(){
            $('.wrap-dialog').addClass("hide");
            noCallback();
        });
    }

})


    // 所有支部党费详情界面
.controller('PartyBranchCtrl', function ($scope, $route,service,$routeParams) {
    $scope.showTitle = "温馨提示";
    $scope.showMessage = "";
    var ua = navigator.userAgent.toLowerCase();
    var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

    $scope.appType = false;

    if(btypeInfo == "aliapp"){
        $scope.appType = true;
    }else{
        $scope.appType = false;
    }

    $scope.$route = $route;
    var companyCode = $routeParams.companyCode;
    var dataListYes = new Array();
    var dataListNo = new Array();
    $scope.cancel4 = function() {
        //此处使用js原生方式回退
        history.back();
    }
    var year=new Date().getFullYear(); //获取当前年份
    service.getPartyBranchGeneral(year,companyCode)
        .then(function (result) {  //正确请求成功时处理
            var jsonResultString = JSON.stringify(result.data);
            var jsonResult = JSON.parse(jsonResultString);
            if(jsonResult.code == 200){

                var unfinishList = jsonResult.data.unfinishList;
                for(var i=0;i<unfinishList.length;i++){
                    var object = {
                        value : parseFloat(unfinishList[i].value),
                        name: unfinishList[i].name
                    }
                    dataListNo.push(object);
                }

                var finishList = jsonResult.data.finishList;
                for(var i=0;i<finishList.length;i++){
                    var object = {
                        name: finishList[i].name
                    }
                    dataListYes.push(object);
                }

            }else{
                var jsonResultString = JSON.stringify(result.data);
                var jsonResult = JSON.parse(jsonResultString);
                showAlert("温馨提示",jsonResult.emsg,"0");
                // alert(jsonResult.emsg);
            }
        }).catch(function (result) { //捕捉错误处理
        showAlert("温馨提示",JSON.stringify(result),"0");
        // alert(JSON.stringify(result));
    });

    $scope.listDataYes = dataListYes;
    $scope.listDataNo = dataListNo;
    var showAlert = function (title,messageT,typeM) {

        $scope.showTitle = title;
        $scope.showMessage = messageT;

        console.log("jquery ...");
        var message = messageT;
        dialogBox(message,
            function () {
                console.log("confirmed");
                // do something

                if(typeM == "1"){
                    dd.biz

                        .navigation.close({
                        onSuccess: function (result) {
                            /*result结构
                            {}
                            */
                        },
                        onFail: function (err) {
                        }
                    })
                }
            },
            function(){
                console.log("canceled");
                // do something
            }
        );
    }

    function dialogBox(message, yesCallback, noCallback){
        if(message){
            $('.dialog-message').html(message);
        }
        // 显示遮罩和对话框
        $('.wrap-dialog').removeClass("hide");
        // 确定按钮
        $('#confirm').click(function(){
            $('.wrap-dialog').addClass("hide");
            yesCallback();
        });
        // 取消按钮
        $('#cancel').click(function(){
            $('.wrap-dialog').addClass("hide");
            noCallback();
        });
    }

});
