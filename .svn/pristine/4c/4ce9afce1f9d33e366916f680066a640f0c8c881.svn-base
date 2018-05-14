angular.module('starter.VolunteerMyQueryCtrl', [])

    .controller('VolunteerMyQueryCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$filter,$stateParams,$ionicPopup,$ionicNavBarDelegate) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        var jsonString = $stateParams.jsonString;
        console.log(JSON.parse(jsonString));
        $scope.jsonData = JSON.parse(jsonString);
        var startTime = new Date($scope.jsonData.serviceStarttimeCN);
        $scope.date = $filter('date')(startTime, 'yyyy年MM月dd日');


        //微调标题边距
        $scope.numL = "10px";
        if(window.screen.width <=667){
            $scope.numL = "10px";
        }else{
            $scope.numL = "0px";
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
                            showAlert("未匹配成功，签到失败！");
                            return;
                        }
                        service.sign(uuid, username,$scope.jsonData.lineId,$scope.jsonData.stationId,$scope.jsonData.lineName,
                            $scope.jsonData.stationName, $scope.jsonData.servicePost, $scope.jsonData.postId,
                            $scope.jsonData.serviceStarttimeCN,$scope.jsonData.serviceEndtimeCN,"002",data)
                            .then(function (result) {  //正确请求成功时处理
                                var jsonResult = result.data;
                                var nowTime = "";
                                if (jsonResult.status == "success") {
                                    nowTime = jsonResult.content;
                                    //苹果的话数据进行处理
                                    if ($scope.systemOS() == "IOS"){
                                        nowTime = nowTime.replace(/-/g,'/');
                                    }
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

        $scope.scan = function () {


            //钉钉api方法
            //     // dd.ready(function(){
            //     dd.biz.util.scan({
            //         type: 'qrCode', // type 为 all、qrCode、barCode，默认是all。
            //         onSuccess: function (data) {
            //
            //             //onSuccess将在扫码成功之后回调
            //             /* data结构
            //               { 'text': String}
            //             */
            //
            //             var data = userService(0, 0, false);//读取全局变量
            //             var str = data.name;
            //             str=encodeURI(encodeURI(str));
            //             var  result =  data.text+ "&supervisor="+str;
            //             window.location.href = "result";
            //         },
            //         onFail: function (err) {
            //         }
            //     })
        }
        // });

        var imgData = new Array();
        for(var i=0;i<5;i++){
            var ob = {
                img:"../img/ic_star0.png",
                num:i,
            }
            imgData.push(ob);
        }
        $scope.stars = imgData;
        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");
        if($scope.jsonData.bespeakState == '002'){
            service.getSignDetail(uuid, username,$scope.jsonData.lineId,$scope.jsonData.stationId,
                $scope.jsonData.postId,$scope.jsonData.serviceStarttimeCN,$scope.jsonData.serviceEndtimeCN)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;
                    console.log(JSON.stringify(jsonResult));
                    if (jsonResult.status == "success") {
                        if(JSON.stringify(jsonResult).indexOf("content")!=-1){
                            var starNum = 100;
                            if(jsonResult.content.star != "" && jsonResult.content.star != null){
                                starNum = parseInt(jsonResult.content.star);
                            }
                            imgData.length =0;
                            for(var i=0;i<5;i++){
                                if(i<=starNum && starNum != 100){
                                    var ob = {
                                        img:"../img/ic_star1.png",
                                        num:i,
                                    }
                                    imgData.push(ob);
                                }else{
                                    var ob = {
                                        img:"../img/ic_star0.png",
                                        num:i,
                                    }
                                    imgData.push(ob);
                                }
                            }
                            $scope.suggestion = "";
                            $scope.feedback = "";
                            $scope.image1 = "";
                            $scope.image2 = "";
                            $scope.image3 = "";
                            $scope.ima1Show = false;
                            $scope.ima2Show = false;
                            $scope.ima3Show = false;
                            if(JSON.stringify(jsonResult.content).indexOf("image3")!=-1){
                                $scope.image1 = jsonResult.content.image1;
                                $scope.image2 = jsonResult.content.image2;
                                $scope.image3 = jsonResult.content.image3;
                                $scope.ima1Show = true;
                                $scope.ima2Show = true;
                                $scope.ima3Show = true;
                            }else if(JSON.stringify(jsonResult.content).indexOf("image2")!=-1){
                                $scope.image1 = jsonResult.content.image1;
                                $scope.image2 = jsonResult.content.image2;
                                $scope.ima1Show = true;
                                $scope.ima2Show = true;
                                $scope.ima3Show = false;
                            }else if(JSON.stringify(jsonResult.content).indexOf("image1")!=-1){
                                $scope.image1 = jsonResult.content.image1;
                                $scope.ima1Show = true;
                                $scope.ima2Show = false;
                                $scope.ima3Show = false;
                            }else{
                                $scope.ima1Show = false;
                                $scope.ima2Show = false;
                                $scope.ima3Show = false;
                            }
                            $scope.suggestion = jsonResult.content.suggestion;
                            $scope.feedback = jsonResult.content.feedback;
                        }
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理
                showAlert(JSON.stringify(result));
            });
        }

        $scope.volunteerMyQueryCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }

        $scope.stars = imgData;

        $scope.cancelSign = function () {
            console.log(JSON.stringify($scope.jsonData));
            service.deleteSign(uuid, username,$scope.jsonData.lineId,$scope.jsonData.stationId, $scope.jsonData.postId,
                $scope.jsonData.serviceStarttimeCN,$scope.jsonData.serviceEndtimeCN)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;

                    if (jsonResult.status == "success") {
                        showAlert("成功取消预约！");
                        $scope.volunteerMyQueryCancel();
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理
                showAlert(JSON.stringify(result));
            });
        }

        //  confirm 对话框
        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '提示',
                template:"<div style='text-align:center;font-family: 微软雅黑;'>您是否确认取消预约？</div>",
                buttons: [
                    { text: "<div class='myPopup'>取消</div>",
                        onTap:function(e){
                            console.log('You are not sure');
                        }
                    },
                    {text: '<div class="myPopup">确定</div>',
                        onTap:function(e){
                            $scope.cancelSign();
                            console.log('You are sure');
                        }
                    }]
            });
            // confirmPopup.then(function(res) {
            //     if(res) {
            //         $scope.cancelSign();
            //         console.log('You are sure');
            //     } else {
            //         console.log('You are not sure');
            //     }
            // });
        };

        $scope.sign = function () {
            var startTime = new Date($scope.jsonData.serviceStarttimeCN).getTime();
            var endTime = new Date($scope.jsonData.serviceEndtimeCN).getTime();
            var nowTime = new Date(severTime).getTime();
            var now_start = parseInt((nowTime - startTime)/(1000*60));
            var end_now = parseInt((endTime - nowTime)/(1000*60));
            if(now_start >= -30 && end_now>=0){

                if(now_start <= 60){
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
                                    $scope.jsonData.serviceStarttimeCN, $scope.jsonData.serviceEndtimeCN, "001", id)
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
                                            $scope.volunteerMyQueryCancel();
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
                }else{
                    showAlert("超过开始时间1小时，不能签到");
                }
            }else{
                showAlert("现在不在签到时间内。");
            }
        }
        var severTime = "";
        $scope.inputType = "hidden";
        service.getSeverTime(uuid)
            .then(function (result) {  //正确请求成功时处理
                var jsonResult = result.data;
                if(jsonResult.status == "success"){
                    severTime = jsonResult.content;
                    //苹果的话数据进行处理
                    if ($scope.systemOS() == "IOS"){
                        severTime = severTime.replace(/-/g,'/');
                        // console.log("******^*^*"+timeData);
                    }
                    if(severTime!="" && severTime != null){
                        // var today = new Date(severTime);
                        var startTime = new Date($scope.jsonData.serviceStarttimeCN).getTime();
                        var endTime = new Date($scope.jsonData.serviceStarttimeCN).getTime();
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
                }else{
                    showAlert(jsonResult.errormsg);
                }

            }).catch(function (result) { //捕捉错误处理

        });


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
