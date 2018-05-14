angular.module('starter.VolunteerMyCtrl', [])

    .controller('VolunteerMyCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$filter,$ionicPopup,$ionicNavBarDelegate) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();

        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.volunteerMyCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }


        var isFirst = true;
        var backgroundcolorsData = new Array();
        var colorsData = new Array();
        $scope.backgroundcolors = new Array();
        $scope.init = function () {
            backgroundcolorsData.length=0;
            colorsData.length=0;
            for (var i = 0; i < 5; i++) {
                if(isFirst&&i==0){
                    backgroundcolorsData.push("#0D816A");
                    colorsData.push("#FFFFFF");
                    isFirst = false;
                }else{
                    backgroundcolorsData.push("#FFFFFF");
                    colorsData.push("#000000");
                }
            }
        }

        $scope.init();
        $scope.backgroundcolors = backgroundcolorsData;
        $scope.colors = colorsData;

        $scope.click1 = function () {
            $scope.init();
            backgroundcolorsData[0] = "#0D816A";
            colorsData[0] = "#FFFFFF";
            $scope.listData = dataList;
        }
        $scope.click2 = function () {
            $scope.init();
            backgroundcolorsData[1] = "#34A7E6";
            colorsData[1] = "#FFFFFF";
            $scope.listData = dataList1;
        }
        $scope.click3 = function () {
            $scope.init();
            backgroundcolorsData[2] = "#ED692B";
            colorsData[2] = "#FFFFFF";
            $scope.listData = dataList2;
        }
        $scope.click4 = function () {
            $scope.init();
            backgroundcolorsData[3] = "#EA5351";
            colorsData[3] = "#FFFFFF";
            $scope.listData = dataList3;
        }
        $scope.click5 = function () {
            $scope.init();
            backgroundcolorsData[4] = "#50AF31";
            colorsData[4] = "#FFFFFF";
            $scope.listData = dataList4;
        }

        $scope.engToChain = function (week) {
            if (week == "Monday") {
                return "星期一"
            } else if (week == "Tuesday") {
                return "星期二"
            } else if (week == "Wednesday") {
                return "星期三"
            } else if (week == "Thursday") {
                return "星期四"
            } else if (week == "Friday") {
                return "星期五"
            } else if (week == "Saturday") {
                return "星期六"
            } else if (week == "Sunday ") {
                return "星期日"
            }
        }

        var dataList = new Array();
        var dataList1 = new Array();
        var dataList2 = new Array();
        var dataList3 = new Array();
        var dataList4 = new Array();
        var dataList5 = new Array();
        $scope.dataListS = dataList;
        $scope.dataListS1 = dataList1;
        $scope.dataListS2 = dataList2;
        $scope.dataListS3 = dataList3;
        $scope.dataListS4 = dataList4;

        $scope.addandsetdata = function (jsonResult) {
            // console.log("0000--"+JSON.stringify(jsonResult));

            for(var i=0;i<jsonResult.content.length;i++){
                //苹果的话数据进行处理
                var timeData2 = jsonResult.content[i].serviceEndtimeCN;
                var timeData1 = jsonResult.content[i].serviceStarttimeCN;
                var timeData3 = jsonResult.content[i].signIntimeCN;
                if ($scope.systemOS() == "IOS"){
                    timeData1 = timeData1.replace(/-/g,'/');
                    timeData2 = timeData2.replace(/-/g,'/');
                    timeData3 = timeData2.replace(/-/g,'/');
                    // console.log("******^*^*"+timeData);
                }

                var ob = {
                    id:jsonResult.content[i].id,
                    serviceEndtimeCN:timeData2,
                    servicePost:jsonResult.content[i].servicePost,
                    serviceStarttimeCN:timeData1,
                    stationName:jsonResult.content[i].stationName,
                    bespeakState:jsonResult.content[i].bespeakState,
                    bespeakStateCN:jsonResult.content[i].bespeakStateCN,
                    lineId:jsonResult.content[i].lineId,
                    stationId:jsonResult.content[i].stationId,
                    lineName:jsonResult.content[i].lineName,
                    postId:jsonResult.content[i].postId,
                    star:jsonResult.content[i].star,
                    signIntimeCN:timeData3,
                    signImg:"",
                    week:"",
                    startH_m:"",
                    endH_m:"",
                }
                var startTime = new Date(ob.serviceStarttimeCN);
                var formatDate = $filter('date')(startTime, 'EEEE');
                var week = $scope.engToChain(formatDate);
                ob.week = week;

                var startTime1 = new Date(timeData1);
                var formatDate1 = $filter('date')(startTime1, 'HH:mm');
                ob.startH_m = formatDate1;

                var startTime2 = new Date(timeData2);
                var formatDate2 = $filter('date')(startTime2, 'HH:mm');
                ob.endH_m = formatDate2;


                // console.log(ob.stationName+"---"+startTime1+"--"+formatDate1+"***"+timeData2+"--"+startTime2)

                if(ob.bespeakState == "001"){
                    ob.signImg = "../../img/ic_dated.png"
                    dataList1.push(ob);
                    dataList.push(ob);
                }else if(ob.bespeakState == "002"){
                    ob.signImg = "../../img/ic_finished.png"
                    dataList4.push(ob);
                    dataList.push(ob);
                }else if(ob.bespeakState == "003"){
                    ob.signImg = "../../img/ic_unfinished.png"
                    dataList2.push(ob);
                    dataList.push(ob);
                }else if(ob.bespeakState == "005"){
                    ob.signImg = "../../img/ic_volunteer_status_under.png"
                    dataList5.push(ob);
                }else{
                    ob.signImg = "../../img/ic_absent.png"
                    dataList3.push(ob);
                    dataList.push(ob);
                }
            }

            dataList = $scope.sort(dataList);
            for(var i=0;i<dataList.length;i++){
                dataList5.push(dataList[i]);
            }
            dataList.length =0;
            for(var j =0;j<dataList5.length;j++){
                dataList.push(dataList5[j])
            }
        }
        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");
        $scope.$on('$ionicView.enter', function() {
            service.getSignList(uuid, username, "001")
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;
                    if (jsonResult.status == "success") {
                        dataList.length = 0;
                        dataList1.length = 0;
                        dataList2.length = 0;
                        dataList3.length = 0;
                        dataList4.length = 0;
                        dataList5.length = 0;
                        $scope.addandsetdata(jsonResult);
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理
                showAlert(JSON.stringify(result));
            });
        });


        $scope.listData = dataList;
        // console.log("------"+JSON.stringify($scope.listData));

        $scope.sort = function (dataList) {
            dataList.sort(function(a,b){
                var timeData1 = b.serviceStarttimeCN;
                var timeData2 = a.serviceStarttimeCN;
                if ($scope.systemOS() == "IOS"){
                    timeData1 = timeData1.replace(/-/g,'/');
                    timeData2 = timeData2.replace(/-/g,'/');
                    // console.log("******^*^*"+timeData);
                }

                if(new Date(timeData1).getTime()-new Date(timeData2).getTime()>=0){
                    return 1;
                }else{
                    return -1;
                }
            });
            // dataList.sort(function(a,b){
            //     if(a.bespeakState == '005'){
            //         return 1;
            //     }else{
            //         return -1;
            //     }
            // });

            return dataList;
        }

        $scope.toMyQuery = function (item) {
            var jsonString = JSON.stringify(item);
            $ionicViewSwitcher.nextDirection('forward');

            console.log("----"+jsonString);

            if(item.bespeakState == '005'){
                $state.go('tab.VolunteerMyQuit',{jsonString:jsonString})
            }else{
                $state.go('tab.VolunteerMyQuery',{jsonString:jsonString})
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


        $scope.doRefresh = function() {
            service.getSignList(uuid,username,"001")
                .then(function (result) {
                    var jsonResult = result.data;

                    if (jsonResult.status == "success") {
                        dataList.length = 0;
                        dataList1.length = 0;
                        dataList2.length = 0;
                        dataList3.length = 0;
                        dataList4.length = 0;
                        dataList5.length = 0;
                        $scope.addandsetdata(jsonResult);
                        $scope.$broadcast('scroll.refreshComplete');
                    } else {
                        showAlert(jsonResult.errormsg);
                    }
                })
                .catch(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 5000);
        };


        //safari里面返回都是1280 ，目前所有320的先用1280代替
        if(window.screen.width <=1280){
            $scope.timeFont = {
                "padding-top":"15px",
                "width":"20%"
            };

        }else{
            $scope.timeFont = {
                "padding-top":"25px",
                "width":"30%"
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



        //测试代码
        // $scope.appType = true;
    });
