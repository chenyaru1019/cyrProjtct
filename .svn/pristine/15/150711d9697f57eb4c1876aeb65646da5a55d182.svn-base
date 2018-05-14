angular.module('starter.VolunteerMyQuitCtrl', [])

    .controller('VolunteerMyQuitCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$filter,$stateParams,$ionicPopup,$interval,$ionicNavBarDelegate) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.isQrCode = true;
        $scope.volunteerMyQuitCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }

        $scope.numL = "10px";
        if(window.screen.width <=667){
            $scope.numL = "10px";
        }else{
            $scope.numL = "0px";
        }

        $scope.toVolunteerFeedBack = function () {
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.VolunteerFeedBack',{jsonString:jsonString})
        }

        var jsonString = $stateParams.jsonString;
        console.log(jsonString);
        $scope.jsonData = JSON.parse(jsonString);

        var startTime = new Date($scope.jsonData.serviceStarttimeCN);
        $scope.date = $filter('date')(startTime, 'yyyy年MM月dd日');

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
                        service.sign(uuid, username,$scope.jsonData.lineId,$scope.jsonData.stationId,$scope.jsonData.lineName,
                            $scope.jsonData.stationName, $scope.jsonData.servicePost, $scope.jsonData.postId,
                            $scope.jsonData.serviceStarttimeCN,$scope.jsonData.serviceEndtimeCN,"001",data)
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


        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");
        var severTime = "";



        $scope.signOut = function () {
            var endTime = new Date($scope.jsonData.serviceStarttimeCN).getTime();
            var signTime = new Date($scope.jsonData.signIntimeCN).getTime();
            var nowTime = new Date(severTime).getTime();
            var now_sign = parseInt((nowTime - signTime)/(1000*60));
            var end_now = parseInt((endTime - nowTime)/(1000*60*60));
            if(now_sign >= 0 && end_now>=-5){
                if(now_sign >= 60){
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
                                    $scope.jsonData.serviceStarttimeCN,$scope.jsonData.serviceEndtimeCN,"002",id)
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
                }else{
                    showAlert("未满1小时，不能签退");
                }
            }else{
                showAlert("现在不在签退时间内。");
            }
        }
        $scope.inputType = "hidden";
        $scope.getSeverTime = function () {
            service.getSeverTime(uuid)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;
                    if(jsonResult.status == "success"){
                        severTime = jsonResult.content;
                        //苹果的话数据进行处理
                        if ($scope.systemOS() == "IOS") {
                            severTime = severTime.replace(/-/g, '/');
                        }
                        var startTime = new Date($scope.jsonData.serviceStarttimeCN).getTime();
                        var signTime = new Date($scope.jsonData.signIntimeCN).getTime();
                        var endTime = new Date($scope.jsonData.serviceEndtimeCN).getTime();
                        var nowTime = new Date(severTime).getTime();
                        var now_start = parseInt((nowTime - startTime)/(1000*60));
                        var now_sign = parseInt((nowTime - signTime)/(1000*60));
                        var end_now = parseInt((endTime - nowTime)/(1000*60*60));
                        if(now_start<0){
                            $scope.showWhat = true;
                            $scope.content = "服务还未开始";
                        }else{
                            if(end_now<0){
                                $scope.showWhat = true;
                                $scope.content = "服务已经结束(可在结束后5个小时内补签退)";
                            }else{
                                $scope.showWhat = false;
                                $scope.finishTime = now_sign;
                                $scope.unFinishTime = end_now;
                            }
                        }
                        // if(now_sign >= 0 && end_now>=-5){
                        //
                        //     if(now_sign >= 60){
                        //         // $scope.inputType = "file";
                        //
                        //     }else{
                        //         // $scope.inputType = "hidden";
                        //
                        //     }
                        // }else{
                        //     // $scope.inputType = "hidden";
                        //
                        // }
                    }else{
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理
                showAlert(JSON.stringify(result));
            });
        }


        $scope.getSeverTime();
        $interval(function(){
            $scope.getSeverTime();
        },1000*60);


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
