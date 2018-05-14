angular.module('starter.PastyCtrl', [])

    .controller('PastyCtrl', function($scope,$state,$ionicNavBarDelegate,service,$rootScope,$timeout,$filter,$ionicViewSwitcher,$ionicHistory,$ionicPopup) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.appType = true;

        $scope.pastyCancel = function () {
            getBackAction();
        };

        dd.ready(function() {
            dd.biz.navigation.setTitle({
                title : '点餐预订',//控制标题文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });

        });

        // window.addEventListener("popstate", function(e) {
        //     // window.location = 'http://www.baidu.com';
        //     var nowStr= window.location.hash;
        //     alert(nowStr);
        //     var backS = localStorage.getItem("isBackFood");
        //     if(nowStr == "#/tab/Pasty"){
        //         dd.ready(function() {
        //             dd.biz.navigation.close({
        //                 onSuccess: function (result) {
        //                     /*result结构
        //                     {}
        //                     */
        //                 },
        //                 onFail: function (err) {
        //                     alert(JSON.stringify(err));
        //                 }
        //             })
        //         })
        //     }else if(nowStr.indexOf("#/tab/PastyFinally")==0 && backS == '1'){
        //         // alert("****"+window.location.hash+"----"+nowStr.indexOf("#/tab/PastyFinally")+"*****"+backS);
        //         // dd.ready(function() {
        //         //     dd.biz.navigation.close({
        //         //         onSuccess : function(result) {
        //         //             /*result结构
        //         //             {}
        //         //             */
        //         //         },
        //         //         onFail : function(err) {
        //         //             alert(JSON.stringify(err))
        //         //         }
        //         //     })
        //         // });
        //         $ionicViewSwitcher.nextDirection('back');
        //         $state.go('tab.Pasty');
        //     }
        // }, false);


        var getBackAction = function () {
            var stringL =  window.location.href;
            var staticStr = localStorage.getItem("checkUrl")+"/#/tab/Pasty";
            var strEnd = localStorage.getItem("checkUrl")+"/#/tab/PastyMy";
            if(staticStr == stringL){
                dd.ready(function() {
                    dd.biz.navigation.close({
                        onSuccess: function (result) {
                            /*result结构
                            {}
                            */
                        },
                        onFail: function (err) {
                            showAlert(JSON.stringify(err));
                        }
                    })
                });
            }else if(stringL == strEnd){
                $ionicViewSwitcher.nextDirection('back');
                $state.go('tab.Pasty');
            }else{
                $ionicViewSwitcher.nextDirection("back");
                $ionicHistory.goBack();
            }
        }

        var dataList = new Array();
        var severTime = "";
        var weeks = new Array();
        var weeksImg = new Array();
        var hour = 100;
        var dayWeeks = new Array();
        $scope.isOffer1 = true;
        $scope.isOffer2 = true;
        $scope.isOffer3 = true;

        $scope.getDate = new Date();

        $scope.engToChain = function (week) {
            if (week == "Monday") {
                return "../../img/ic_dish_monday.png"
            } else if (week == "Tuesday") {
                return "../../img/ic_dish_tuesday.png"
            } else if (week == "Wednesday") {
                return "../../img/ic_dish_wednesday.png"
            } else if (week == "Thursday") {
                return "../../img/ic_dish_thursday.png"
            } else if (week == "Friday") {
                return "../../img/ic_dish_friday.png"
            } else if (week == "Saturday") {
                return "../../img/ic_dish_saturday.png"
            } else if (week == "Sunday") {
                return "../../img/ic_dish_sunday.png"
            }
        }
        $scope.isToday = true;
        $scope.getWeeks = function (today) {
            var hour = $filter('date')(today, 'HH');
            if(hour<10){
                $scope.tenHour = true;
            }else{
                $scope.tenHour = false;
            }
            for(var i=0;i<3;i++){
                if(hour<10){
                    if(i==0){
                        // $scope.isToday = true;
                        weeks.push("今天");
                        var formatDate = $filter('date')(today.getTime() + 86400000*i, 'EEEE');
                        dayWeeks.push(formatDate);
                        var formatDateC = $scope.engToChain(formatDate);
                        weeksImg.push(formatDateC);

                    }else{
                        var formatDate = $filter('date')(today.getTime() + 86400000*i, 'EEEE');
                        dayWeeks.push(formatDate);
                        var formatDateC = $scope.engToChain(formatDate);
                        weeksImg.push(formatDateC);
                        var formatDate1 = $filter('date')(today.getTime() + 86400000*i, 'MM月dd日');
                        weeks.push(formatDate1);
                    }
                }else{
                    if(i==0){
                        // $scope.isToday = false;
                        weeks.push("明天");
                        var formatDate = $filter('date')(today.getTime() + 86400000*(i+1), 'EEEE');
                        dayWeeks.push(formatDate);
                        var formatDateC = $scope.engToChain(formatDate);
                        weeksImg.push(formatDateC);

                    }else{
                        var formatDate = $filter('date')(today.getTime() + 86400000*(i+1), 'EEEE');
                        dayWeeks.push(formatDate);
                        var formatDateC = $scope.engToChain(formatDate);
                        weeksImg.push(formatDateC);
                        var formatDate1 = $filter('date')(today.getTime() + 86400000*(i+1), 'MM月dd日');
                        weeks.push(formatDate1);
                    }
                }
            }
            $scope.getEverydaySupply();
        }

        $scope.weeksScope = weeks;
        $scope.weeksImgScope = weeksImg;



        $scope.setFestival = function (dataList) {
            for(var i=0;i<dayWeeks.length;i++){
                for(var j=0;j<dataList.length;j++){
                    if(dayWeeks[i] == dataList[j].week ){
                        if(i==0){
                            $scope.isOffer1 = false;
                        }else if(i==1){
                            $scope.isOffer2 = false;
                        }else if(i==2 && $scope.isToday == true){
                            $scope.isOffer3 = false;
                        }
                        if(dataList[j].festival != "" && dataList[j].festival != null){
                            weeksImg[i] = "../../img/ic_dish_specialday.png";
                            weeks[i] = dataList[j].festival;
                            ;                   }
                    }
                }
            }
        }
        var uuid = localStorage.getItem("uuid");

        // service.getDdFromAPP()
        //     .then(function (result) {  //正确请求成功时处理
        //         // var jsonResultString = JSON.stringify(result.data);
        //         var jsonResult = result.data;
        //
        //         if(jsonResult.status == "success"){
        //             var array = jsonResult.message;
        //             if(array.length>0){
        //                 dd.config.timeStamp = array[0].timeStamp;
        //                 dd.config.nonceStr = array[0].nonceStr;
        //                 dd.config.signature = array[0].signature;
        //                 $scope.accesstoken = array[0].accesstoken;
        //
        //                 $scope.requestAuthCode();
        //             }
        //         }else{
        //             var jsonResult = result.data;
        //             showAlert(JSON.stringify(jsonResult));
        //         }
        //
        //     }).catch(function (result) { //捕捉错误处理
        //
        //     showAlert(JSON.stringify(result));
        // });
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
                        $scope.getEverydaySupply();

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

        $scope.getEverydaySupply = function () {
            service.getEverydaySupply(uuid)
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;
                    console.log(JSON.stringify(result.data));
                    if (jsonResult.status == "success") {
                        for (var i = 0; i < jsonResult.content.length; i++) {

                            //苹果的话数据进行处理
                            var timeData = jsonResult.content[i].dt;
                            if ($scope.systemOS() == "IOS"){
                                timeData = timeData.replace(/-/g,'/');
                                console.log("******^*^*"+timeData);
                            }
                            var today = new Date(timeData);
                            var formatDate = $filter('date')(today, 'EEEE');
                            var week = formatDate;
                            var ob = {
                                discription: jsonResult.content[i].discription,
                                week: week,
                                dt: jsonResult.content[i].dt,
                                everydaySupplyId: jsonResult.content[i].everydaySupplyId,
                                name: jsonResult.content[i].name,
                                picUrl: jsonResult.content[i].picUrl,
                                price: jsonResult.content[i].price,
                                rest: jsonResult.content[i].rest,
                                supplyId: jsonResult.content[i].supplyId,
                                festival: jsonResult.content[i].festival,
                            }
                            dataList.push(ob);
                        }
                        $scope.getSeverTime();
                        $scope.setFestival(dataList);
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理

            });
        }

        $scope.listData = dataList;

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
                            // var today = new Date(severTime);
                            $scope.getWeeks(new Date(severTime));
                        }
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理

            });
        }
        $scope.toPastyMy = function () {
            if(localStorage.getItem("isSign") == "0"){
                showAlert("关联账号失败");
                return;
            }
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.PastyMy');
        }
        $scope.toPastyMenu = function (num) {
            if(localStorage.getItem("isSign") == "0"){
                showAlert("关联账号失败");
                return;
            }

            if((num == 0 && $scope.isOffer1 == false) || (num == 1 && $scope.isOffer2 == false) || (num == 2 && $scope.isOffer3 == false)){
                var week = dayWeeks[num]
                $ionicViewSwitcher.nextDirection('forward')
                $state.go('tab.PastyMenu',{week:week});
            }
        }
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

        //测试代码
        $scope.getEverydaySupply();

        var stList =  new Array();
        var stListName =  new Array();
        service.getCanteenList(uuid)
            .then(function (result) {  //正确请求成功时处理
                var jsonResult = result.data;
                //console.log(JSON.stringify(result.data));
                //alert(JSON.stringify(result.data));
                if (jsonResult.status == "success") {
                    for (var i = 0; i < jsonResult.content.length; i++) {
                        var ob = {
                            name: jsonResult.content[i].name,
                            id: jsonResult.content[i].id,
                        };
                        stList.push(ob);
                        stListName.push(jsonResult.content[i].name);
                    }
                    $scope.stListC = stList;

                    $scope.selectValueSt = stListName[0];
                    localStorage.setItem("canteenId",stList[0].id);

                } else {
                    showAlert(jsonResult.errormsg);
                }

            }).catch(function (result) { //捕捉错误处理

        });


        $scope.selectM = function () {
            dd.ready(function() {
                dd.device.notification.actionSheet({
                    title: "食堂选择", //标题
                    cancelButton: '取消', //取消按钮文本
                    otherButtons: stListName,
                    onSuccess : function(result) {
                        var s = result.buttonIndex;
                        if(s == -1){
                            return;
                        }else{
                            //$scope.selectValueSt = s;
                            //alert(stList[s].id);
                            $scope.selectValueSt = stList[s].name;
                            localStorage.setItem("canteenId",stList[s].id);
                        }
                    },
                    onFail : function(err) {}
                })
            });
        };


    });
