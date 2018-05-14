angular.module('starter.VolunteerCtrl', [])

    .controller('VolunteerCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$filter,$ionicPopup,$ionicPlatform,$ionicNavBarDelegate) {

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

        var severTime = "";
        $scope.inputType = "hidden";
        $scope.volunteerCancel = function () {
            getBackAction();
        }
        // window.addEventListener("popstate", function(e) {
        //     // window.location = 'http://www.baidu.com';
        //     var nowStr= window.location.hash;
        //     var backS = localStorage.getItem("isBackRotu");
        //     // alert("****"+window.location.hash+"----"+nowStr.indexOf("#/tab/VolunteerConfirm")+"*****"+backS);
        //     alert(nowStr);
        //     if(nowStr == "#/tab/MainVC" || ((nowStr.indexOf("#/tab/VolunteerConfirm")==0)&&backS=='1')){
        //         dd.ready(function() {
        //             dd.biz.navigation.close({
        //                 onSuccess : function(result) {
        //                     /*result结构
        //                     {}
        //                     */
        //                 },
        //                 onFail : function(err) {
        //                     alert(JSON.stringify(err))
        //                 }
        //             })
        //         });
        //     }
        // }, false);

        var getBackAction = function () {
            var stringL =  window.location.hash;
            var staticStr = "#/tab/Volunteer";
            var strEnd = "#/tab/VolunteerConfirm";
            if(staticStr == stringL){
                // dd.ready(function() {
                    dd.biz.navigation.close({
                        onSuccess: function (result) {
                            /*result结构
                            {}
                            */
                        },
                        onFail: function (err) {
                        }
                    })
                // });
            }else if(stringL == strEnd){
                $ionicViewSwitcher.nextDirection('back');
                $state.go('tab.Volunteer');
            }else{
                $ionicViewSwitcher.nextDirection("back");
                $ionicHistory.goBack();
            }
        }

        $scope.toVolunteerFeedBack = function () {
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.VolunteerFeedBack',{jsonString:JSON.stringify(myorderBean)})
        }
        $scope.toVolunteerEx = function () {
            if(localStorage.getItem("isSign") == "0"){
                showAlert("关联账号失败");
                return;
            }
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.VolunteerEx');
        }

        $scope.toVolunteerMy = function () {
            if(localStorage.getItem("isSign") == "0"){
                showAlert("关联账号失败");
                return;
            }
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.VolunteerMy');
        }
        $scope.toVolunteerOrderLine = function () {
            if(localStorage.getItem("isSign") == "0"){
                showAlert("关联账号失败");
                return;
            }
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.VolunteerOrderLine');
        }
        $scope.toVolunteerRank = function (rank) {
            if(localStorage.getItem("isSign") == "0"){
                showAlert("关联账号失败");
                return;
            }
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.VolunteerRank',{rank:rank});
        }
        $scope.toVolunteerOrderCount = function () {
            if(localStorage.getItem("isSign") == "0"){
                showAlert("关联账号失败");
                return;
            }
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.VolunteerOrderCount');
        }
        var didTime = "";
        var sumDidTime = "";
        var notDidTime = "";
        var allTime = "";
        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");
        $scope.degree = 1 * 360;
        $scope.degreeOther = 0;
        $scope.baifen = "100%"

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
                showAlert("__________"+result);
        });
        $scope.requestAuthCode = function () {

            dd.ready(function() {
                dd.runtime.permission.requestAuthCode({
                    corpId:"ding38c46ef492978e7335c2f4657eb6378f",
                    onSuccess: function (result) {
                        var code = result.code;
                        $scope.getDdUserFromAPP(code,$scope.accesstoken);
                        /*{
                            code: 'hYLK98jkf0m' //string authCode
                        }*/
                    },
                    onFail: function (err) {
                        // alert(JSON.stringify(err))
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
                        localStorage.setItem("subDepartmentName",dataJson.subDepartmentName);
                        localStorage.setItem("permissions",dataJson.permissionList);
                        if(dataJson.companyid != "00" && dataJson.companyid != "011100" && dataJson.companyid != "030000" ){
                            showAlert("目前仅对志愿者机关开放");
                            getBackAction();
                            return;
                        }
                        uuid = localStorage.getItem("uuid");
                        username = localStorage.getItem("username");
                        $scope.getSignServiceInfo();
                        //从定义左上角返回键
                        dd.biz.navigation.setLeft({
                            control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                            text: '',//控制显示文本，空字符串表示显示默认文本
                            onSuccess: function (result) {
                                //直接返回了，不在返回到原来的路由--------------用于处理基路由的时候返回问题
                                getBackAction();
                            },
                            onFail: function (err) {
                                showAlert(JSON.stringify(err));
                            }
                        });
                        //设置没有标题
                        dd.biz.navigation.setTitle({
                            title : ' ',//控制标题文本，空字符串表示显示默认文本
                            onSuccess : function(result) {
                                /*结构
                                {
                                }*/
                            },
                            onFail : function(err) {}
                        });
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
        $scope.getSignServiceInfo = function () {

            service.getSignServiceInfo(uuid, username)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;

                    if (jsonResult.status == "success") {
                        didTime = jsonResult.content.didTime;
                        sumDidTime = jsonResult.content.sumDidTime;
                        notDidTime = jsonResult.content.notDidTime;
                        allTime = jsonResult.content.allTime;
                        $scope.signRank = jsonResult.content.signRank;
                        $scope.didHour = parseInt(didTime);
                        $scope.didMin = parseInt((parseFloat(didTime) - $scope.didHour) * 60);
                        $scope.notDidHour = parseInt(notDidTime);
                        $scope.notDidMin = parseInt((parseFloat(notDidTime) - $scope.notDidHour) * 60);
                        $scope.sumDidHour = parseInt(sumDidTime);
                        $scope.sumDidMin = parseInt((parseFloat(sumDidTime) - $scope.sumDidHour) * 60);
                        $scope.baifen = "0%";
                        // if (parseFloat(allTime) < parseFloat(didTime)) {
                        //     $scope.degree = 1 * 360;
                        //     $scope.baifen = "100%"
                        // } else {
                        //     $scope.degree = parseInt((parseFloat(didTime) / parseFloat(allTime)) * 360);
                        //     $filter('number')((parseFloat(didTime) / parseFloat(allTime)) * 100, 2) + "%";
                        //     $scope.baifen = parseInt((parseFloat(didTime) / parseFloat(allTime)) * 100) + "%"
                        // }


                        if(parseFloat(allTime)<=0){
                            $scope.baifen = "0%";
                            $scope.degree= 0;
                        }else{

                            if(parseFloat(allTime) < parseFloat(didTime)){
                                $scope.degree= 360;
                            }else{
                                $scope.degree = parseInt((parseFloat(didTime) / parseFloat(allTime)) * 360);
                            }

                            $filter('number')((parseFloat(didTime) / parseFloat(allTime)) * 100, 2) + "%";
                            $scope.baifen = parseInt((parseFloat(didTime) / parseFloat(allTime)) * 100) + "%"
                        }
                        $scope.degreeOther = parseInt(360 - $scope.degree);
                        $scope.setCircle();
                        $scope.getSignList();
                    } else {
                        showAlert(jsonResult.errormsg);
                    }
                }).catch(function (result) { //捕捉错误处理

            });
        }

        $scope.setCircle = function () {
            $(document).ready(function() {
                var chart = {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                };
                var title = {
                    text: '已完成'+$scope.baifen,
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 50,
                    style: {
                        fontSize: '15px',
                    }
                };
                var tooltip = {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                    enabled:false
                };
                var plotOptions = {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        point: {                  // 每个扇区是数据点对象，所以事件应该写在 point 下面
                            events: {
                                // 默认是点击突出，这里屏蔽掉
                                click: function() {
                                    return false;
                                }
                            }
                        },

                        series: {
                            states: {
                                hover: {
                                    enabled: false
                                }
                            }
                        },
                        startAngle: -180,
                        endAngle: 180,
                        center: ['50%', '75%']
                    }
                };


                var series= [{
                    type: 'pie',
                    name: 'Browser share',
                    innerSize: '60%',
                    data: [
                        ['',$scope.degree],
                        ['',$scope.degreeOther],
                        {
                            name: 'Others',
                            y: 0.1,
                            dataLabels: {
                                enabled: false
                            }
                        }
                    ]
                }];

                var json = {};
                json.chart = chart;
                json.title = title;
                json.tooltip = tooltip;
                json.series = series;
                json.plotOptions = plotOptions;
                $('#container').highcharts(json);
            });
        }

        $scope.check = function () {
            if(localStorage.getItem("isSign") == "0"){
                showAlert("关联账号失败");
                return;
            }
            console.log(JSON.stringify(myorderBean));
            if ($scope.signType == "003"){
                showAlert("暂无预约任务");
            }else{
                if($scope.signType == "001"){
                    var endTime = new Date(myorderBean.serviceStarttimeCN).getTime();
                    var signTime = new Date(myorderBean.signIntimeCN).getTime();
                    var nowTime = new Date(severTime).getTime();
                    var now_sign = parseInt((nowTime - signTime)/(1000*60));
                    var end_now = parseInt((endTime - nowTime)/(1000*60*60));
                    if(now_sign >= 0 && end_now>=-5){

                        if(now_sign >= 60){
                            $scope.checkOut();
                        }else{
                            showAlert("未满1小时，不能签退");
                        }
                    }else{
                        showAlert("现在不在签退时间内。");
                    }
                }else if($scope.signType == "002"){
                    var today = new Date(severTime);
                    var startTime = new Date(myorderBean.serviceStarttimeCN).getTime();
                    var endTime = new Date(myorderBean.serviceStarttimeCN).getTime();
                    var nowTime = new Date(severTime).getTime();
                    var now_start = parseInt((nowTime - startTime) / (1000 * 60));
                    var end_now = parseInt((endTime - nowTime) / (1000 * 60));
                    if (now_start >= -30 && end_now >= 0) {

                        if (now_start <= 60) {
                            $scope.checkIn();
                        } else {
                            showAlert("超过开始时间1小时，不能签到");
                        }
                    } else {
                        showAlert("现在不在签到时间内。");
                    }
                }
            }
        }


        $scope.getImgFile = function(files) {
            var imgFile = files;
            var oFile = imgFile[0];
            var oFReader = new FileReader();
            var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
            if (imgFile.length === 0) {
                return;
            }

            if (!rFilter.test(oFile.type)) {
                showAlert("选择正确的图片格式!");
                return;
            }
            oFReader.readAsDataURL(oFile);
            oFReader.onload = function (ev) {
                $scope.$apply(function(){
                    qrcode.decode(ev.target.result);
                    qrcode.callback = function (data) {
                        //得到扫码的结果
                        $('.result-qrcode').append(data + '<br/>');
                        if(data == "" ||data == null ||data == undefined){
                            if($scope.signType == "002") {
                                showAlert("未匹配成功，签到失败！");
                            }else if($scope.signType == "001"){
                                showAlert("未匹配成功，签退失败！");
                            }
                            return;
                        }
                        var type="";
                        if($scope.signType == "002") {
                            type = "002";
                        }else if($scope.signType == "001"){
                            type = "001";
                        }
                        service.sign(uuid, username,$scope.jsonData.lineId,$scope.jsonData.stationId,$scope.jsonData.lineName,
                            $scope.jsonData.stationName, $scope.jsonData.servicePost, $scope.jsonData.postId,
                            $scope.jsonData.serviceStarttimeCN,$scope.jsonData.serviceEndtimeCN,type,data)
                            .then(function (result) {  //正确请求成功时处理
                                var jsonResult = result.data;
                                var nowTime = "";
                                if (jsonResult.status == "success") {
                                    nowTime = jsonResult.content;
                                    //苹果的话数据进行处理
                                    if ($scope.systemOS() == "IOS"){
                                        nowTime = nowTime.replace(/-/g,'/');
                                    }
                                    if($scope.signType == "002"){
                                        var startTime = new Date($scope.jsonData.serviceStarttimeCN).getTime();
                                        var nowTime = new Date(nowTime).getTime();
                                        var now_start = parseInt((nowTime - startTime)/(1000*60));
                                        if(now_start>0){
                                            showAlert("签到成功,您本次签到迟到了" + now_start + "分钟");
                                        }else if(now_start ==0 ){
                                            showAlert("签到成功");
                                        }else{
                                            showAlert("签到成功,您本次签到提前了" + -now_start + "分钟");
                                        }
                                    }else if($scope.signType == "001"){
                                        $scope.toVolunteerFeedBack();
                                        showAlert("签退成功");
                                    }

                                } else {
                                    showAlert(jsonResult.errormsg);
                                }

                            }).catch(function (result) { //捕捉错误处理
                            showAlert(JSON.stringify(result));
                        });

                    };
                });
            };
        };

        $scope.getSeverTime = function () {
            service.getSeverTime(uuid)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;
                    if (jsonResult.status == "success") {
                        severTime = jsonResult.content;
                        //苹果的话数据进行处理
                        if ($scope.systemOS() == "IOS") {
                            severTime = severTime.replace(/-/g, '/');
                            // console.log("******^*^*"+timeData);
                        }

                        if (severTime != "" && severTime != null) {
                            if($scope.signType == "002"){
                                var startTime = new Date(myorderBean.serviceStarttimeCN).getTime();
                                var endTime = new Date(myorderBean.serviceEndtimeCN).getTime();
                                var nowTime = new Date(severTime).getTime();
                                var now_start = parseInt((nowTime - startTime)/(1000*60));
                                var end_now = parseInt((endTime - nowTime)/(1000*60));
                                if(now_start >= -30 && end_now>=0){

                                    if(now_start <= 60){
                                        $scope.inputType = "file";
                                    }else{
                                        $scope.inputType = "hidden";
                                    }
                                }else{
                                    $scope.inputType = "hidden";
                                }
                            }
                        }else if($scope.signType == "001"){
                            var endTime = new Date(myorderBean.serviceStarttimeCN).getTime();
                            var signTime = new Date(myorderBean.signIntimeCN).getTime();
                            var nowTime = new Date(severTime).getTime();
                            var now_sign = parseInt((nowTime - signTime)/(1000*60));
                            var end_now = parseInt((endTime - nowTime)/(1000*60));
                            if(now_sign >= 0 && end_now>=-5){

                                if(now_sign >= 60){
                                    $scope.inputType = "file";

                                }else{
                                    $scope.inputType = "hidden";

                                }
                            }else{
                                $scope.inputType = "hidden";
                            }
                        }
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理

            });
        }

        var myorderBean = {
            id:"",
            serviceEndtimeCN:"",
            servicePost:"",
            serviceStarttimeCN:"",
            stationName:"",
            bespeakState:"",
            bespeakStateCN:"",
            lineId:"",
            stationId:"",
            lineName:"",
            postId:"",
            star:"",
            signIntimeCN:"",
        }
        var signList001= new Array();
        var signList005= new Array();
        $scope.signType = "003";
        $scope.checkIma = '../img/btn_scancheckin.png';
        //解析我的预约
        $scope.addandsetdata = function (jsonResult) {
            for(var i=0;i<jsonResult.content.length;i++){
                //苹果的话数据进行处理
                var timeData1 = jsonResult.content[i].serviceEndtimeCN;
                var timeData2 = jsonResult.content[i].serviceStarttimeCN;
                if ($scope.systemOS() == "IOS"){
                    timeData1 = timeData1.replace(/-/g,'/');
                    timeData2 = timeData2.replace(/-/g,'/');
                    // console.log("******^*^*"+timeData);
                }

                var ob = {
                    id:jsonResult.content[i].id,
                    serviceEndtimeCN:timeData1,
                    servicePost:jsonResult.content[i].servicePost,
                    serviceStarttimeCN:timeData2,
                    stationName:jsonResult.content[i].stationName,
                    bespeakState:jsonResult.content[i].bespeakState,
                    bespeakStateCN:jsonResult.content[i].bespeakStateCN,
                    lineId:jsonResult.content[i].lineId,
                    stationId:jsonResult.content[i].stationId,
                    lineName:jsonResult.content[i].lineName,
                    postId:jsonResult.content[i].postId,
                    star:jsonResult.content[i].star,
                    signIntimeCN:jsonResult.content[i].signIntimeCN,
                }
                if(ob.bespeakState == '001'){
                    signList001.push(ob);
                }else if(ob.bespeakState == '005'){
                    signList005.push(ob);
                }
            }

            if(signList005.length != 0){
                $scope.checkIma = '../img/btn_scancheckout.png';
                myorderBean = $scope.sort(signList005);
                $scope.signType = "001";
            }else if(signList001.length != 0){
                $scope.checkIma = '../img/btn_scancheckin.png';
                myorderBean = $scope.sort(signList001);
                $scope.signType = "002";
            }else{
                $scope.signType = "003";
                $scope.checkIma = '../img/btn_scancheckin.png';
            }
        }
        //获取我的预约
        $scope.getSignList = function () {
            service.getSignList(uuid, username, "001")
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;

                    if (jsonResult.status == "success") {
                        $scope.addandsetdata(jsonResult);
                        $scope.getSeverTime();
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理
                showAlert(JSON.stringify(result));
            });
        }


        $scope.sort = function (dataList) {
            dataList.sort(function(a,b){
                var a_start_now = new Date(a.serviceStarttimeCN).getTime() - new Date().getTime();
                if(a_start_now < 0){
                    a_start_now = -a_start_now;
                }
                var b_start_now = new Date(b.serviceStarttimeCN).getTime() - new Date().getTime();
                if(b_start_now < 0){
                    b_start_now = -b_start_now;
                }
                if(a_start_now-b_start_now>=0){
                    return -1;
                }else{
                    return 1;
                }
            });
            return dataList[0];
        }

        // $scope.signInOut = function (signType,myorderBean) {
        //     service.sign(uuid, username,myorderBean.lineId,myorderBean.stationId,myorderBean.lineName,myorderBean.stationName,myorderBean.servicePost,
        //         myorderBean.postId,myorderBean.serviceStarttimeCN,myorderBean.serviceEndtimeCN,signType)
        //         .then(function (result) {  //正确请求成功时处理
        //             var jsonResult = result.data;
        //
        //             if (jsonResult.status == "success") {
        //
        //             } else {
        //                 showAlert(jsonResult.errormsg);
        //             }
        //
        //         }).catch(function (result) { //捕捉错误处理
        //         showAlert(JSON.stringify(result));
        //     });
        // }



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


        //safari里面返回都是1280 ，目前所有320的先用1280代替
        if(window.screen.width <=1280){
            $scope.timeFont = {
                "font-size":"14px",
            };

            $scope.timeTitlt = {
                "font-size":"16px",
            };
        }else{
            $scope.timeFont = {
                "font-size":"18px",
            };

            $scope.timeTitlt = {
                "font-size":"20px",
            };
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

        // $scope.getSignServiceInfo();

        $scope.mmmty = function () {
            //钉钉api方法
                // dd.ready(function(){
                // dd.biz.util.scan({
                //     type: 'qrCode', // type 为 all、qrCode、barCode，默认是all。
                //     onSuccess: function (data) {
                //
                //         //onSuccess将在扫码成功之后回调
                //         /* data结构
                //           { 'text': String}
                //         */
                //         alert(JSON.stringify(data))
                //         var data = userService(0, 0, false);//读取全局变量
                //         var str = data.name;
                //         str=encodeURI(encodeURI(str));
                //         var  result =  data.text+ "&supervisor="+str;
                //         window.location.href = "result";
                //     },
                //     onFail: function (err) {
                //         alert(JSON.stringify(err))
                //     }
                // })


            $state.go("tab.VolunteerEx");

        }

        $scope.checkIn = function () {
            dd.biz.util.scan({
                type: 'qrCode', // type 为 all、qrCode、barCode，默认是all。
                onSuccess: function (data) {

                    //onSuccess将在扫码成功之后回调
                    /* data结构
                      { 'text': String}
                    */
                    var id = data.text;
                    if (id == null || id == "" || id == undefined) {
                        showAlert("未匹配成功，签到失败！");
                    }else {
                        service.sign(uuid, username, $scope.jsonData.lineId, $scope.jsonData.stationId, $scope.jsonData.lineName,
                            $scope.jsonData.stationName, $scope.jsonData.servicePost, $scope.jsonData.postId,
                            $scope.jsonData.serviceStarttimeCN, $scope.jsonData.serviceEndtimeCN, "002", id)
                            .then(function (result) {  //正确请求成功时处理
                                var jsonResult = result.data;
                                var nowTime = "";
                                if (jsonResult.status == "success") {
                                    nowTime = jsonResult.content;
                                    //苹果的话数据进行处理
                                    if ($scope.systemOS() == "IOS") {
                                        nowTime = nowTime.replace(/-/g, '/');
                                    }
                                    var startTime = new Date($scope.jsonData.serviceStarttimeCN).getTime();
                                    var nowTime = new Date(nowTime).getTime();
                                    var now_start = parseInt((nowTime - startTime) / (1000 * 60));
                                    if (now_start > 0) {
                                        showAlert("签到成功,您本次签到迟到了" + now_start + "分钟");
                                    } else if (now_start == 0) {
                                        showAlert("签到成功");
                                    } else {
                                        showAlert("签到成功,您本次签到提前了" + -now_start + "分钟");
                                    }

                                } else {
                                    showAlert(jsonResult.errormsg);
                                }

                            }).catch(function (result) { //捕捉错误处理
                            showAlert(JSON.stringify(result));
                        });
                    }
                },
                onFail: function (err) {
                }
            })
        }
        $scope.checkOut = function () {
            dd.biz.util.scan({
                type: 'qrCode', // type 为 all、qrCode、barCode，默认是all。
                onSuccess: function (data) {

                    //onSuccess将在扫码成功之后回调
                    /* data结构
                      { 'text': String}
                    */
                    var id = data.text;
                    if (id == null || id == "" || id == undefined) {
                        showAlert("未匹配成功，签到失败！");
                    } else {
                        service.sign(uuid, username,$scope.jsonData.lineId,$scope.jsonData.stationId,$scope.jsonData.lineName,
                            $scope.jsonData.stationName, $scope.jsonData.servicePost, $scope.jsonData.postId,
                            $scope.jsonData.serviceStarttimeCN,$scope.jsonData.serviceEndtimeCN,"001",id)
                            .then(function (result) {  //正确请求成功时处理
                                var jsonResult = result.data;
                                if (jsonResult.status == "success") {
                                    $scope.toVolunteerFeedBack();
                                    showAlert("签退成功");
                                } else {
                                    showAlert(jsonResult.errormsg);
                                }

                            }).catch(function (result) { //捕捉错误处理
                            showAlert(JSON.stringify(result));
                        });
                    }
                },
                onFail: function (err) {
                }
            });
        }

        //测试代码
        $scope.appType = true;
        $scope.getSignServiceInfo();

    });


