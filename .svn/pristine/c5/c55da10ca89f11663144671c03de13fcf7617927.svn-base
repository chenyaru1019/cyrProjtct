angular.module('starter.VolunteerStationQueryCtrl', [])

    .controller('VolunteerStationQueryCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,
                                                      $stateParams,$filter,$ionicPopup,$ionicNavBarDelegate) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.stationName = $stateParams.stationName;
        $scope.stationId = $stateParams.stationId;
        $scope.lineId = $stateParams.lineId;
        var jsonString = $stateParams.jsonString;

//判断是苹果还是android
        $scope.systemOSMy = function () {
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
        $scope.volunteerStationQueryCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
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
            } else if (week == "Sunday") {
                return "星期日"
            }
        }

        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");

        var dataList = new Array();
        var orderList = new Array();
        var orderListNew = new Array();
        var postList = new Array();

        dataList = JSON.parse(jsonString);
        for(var i =0;i<dataList.length;i++){
            if ($scope.systemOSMy() == "IOS"){
                // dataList[i].serviceStarttimeFormat = (dataList[i].serviceStarttimeFormat).replace(/-/g,'/');
                dataList[i].serviceStarttimeFormat = (dataList[i].serviceStarttimeFormat).replace(/-/g,'/');
                dataList[i].serviceEndtimeFormat = (dataList[i].serviceEndtimeFormat).replace(/-/g,'/');
            }

            var date = $filter('date')(new Date(dataList[i].serviceStarttimeFormat), 'yyyy年MM月dd日');
            var week = $filter('date')(new Date(dataList[i].serviceStarttimeFormat), 'EEEE');
            week = $scope.engToChain(week);
            var hourMin_start = $filter('date')(new Date(dataList[i].serviceStarttimeFormat), 'HH:mm');
            var hourMin_end = $filter('date')(new Date(dataList[i].serviceEndtimeFormat), 'HH:mm');
            var ob = {
                string:date+"   "+week+"   "+hourMin_start+"~"+hourMin_end,
                lineId:dataList[i].lineId,
                stationId:dataList[i].stationId,
                serviceStarttimeFormat:dataList[i].serviceStarttimeFormat,
                serviceEndtimeFormat:dataList[i].serviceEndtimeFormat,
            }
            orderList.push(ob);
        }
        var lineList = new Array();
        for(var j=0;j<orderList.length;j++){

            if(lineList.indexOf(orderList[j].serviceStarttimeFormat+"   "+orderList[j].serviceEndtimeFormat) == -1 ){
                lineList.push(orderList[j].serviceStarttimeFormat+"   "+orderList[j].serviceEndtimeFormat);
                orderListNew.push(orderList[j]);
            }else{
                continue;
            }
        }
        if(orderListNew.length != 0){
            for(var i=0;i<dataList.length;i++) {
                if(orderListNew[0].lineId == dataList[i].lineId && orderListNew[0].stationId == dataList[i].stationId
                    && orderListNew[0].serviceStarttimeFormat == dataList[i].serviceStarttimeFormat && orderListNew[0].serviceEndtimeFormat == dataList[i].serviceEndtimeFormat){
                    postList.push(dataList[i]);
                }
            }
        }

        $scope.sort = function (dataList) {
            dataList.sort(function(a,b){
                if(new Date(a.serviceStarttimeFormat).getTime()-new Date(b.serviceStarttimeFormat).getTime()>=0){
                    return 1;
                }else{
                    return -1;
                }
            });
            return dataList;
        }
        orderListNew = $scope.sort(orderListNew);
        $scope.listOrder = orderListNew;
        $scope.listPost = postList;

        // alert(jsonString+"****************"+JSON.stringify($scope.listPost))

        var sel_order = document.getElementById ('sel_order');//获取select下拉列表
        for ( var i = 0; i < $scope.listOrder.length; i++)//循环添加2006到当前年份加3年的每个年份依次添加到下拉列表
        {
            var option = document.createElement ('option');
            option.value = $scope.listOrder[i].string;
            var txt = document.createTextNode ($scope.listOrder[i].string);
            option.appendChild (txt);
            sel_order.appendChild (option);
        }

        //选中某一个
        $scope.choseorder = function (order) {
            var ob = null;
            for(var i=0;i<orderListNew.length;i++){
                if(order == orderListNew[i].string){
                    ob = orderListNew[i];
                }
            }
            if(ob != null){
                postList.length = 0;
                for(var i=0;i<dataList.length;i++) {
                    if(ob.lineId == dataList[i].lineId && ob.stationId == dataList[i].stationId
                        && ob.serviceStarttimeFormat == dataList[i].serviceStarttimeFormat && ob.serviceEndtimeFormat == dataList[i].serviceEndtimeFormat){
                        postList.push(dataList[i]);
                    }
                }
            }
            $scope.setpost();
        }
        $scope.setpost = function () {
            var sel_post = document.getElementById('sel_post');//获取select下拉列表
            sel_post.innerHTML = "";
            for (var i = 0; i < $scope.listPost.length; i++)//循环添加2006到当前年份加3年的每个年份依次添加到下拉列表
            {
                var option = document.createElement('option');
                option.value = $scope.listPost[i].servicePost + "剩余" + $scope.listPost[i].serviceCount + "名";
                var txt = document.createTextNode($scope.listPost[i].servicePost + "剩余" + $scope.listPost[i].serviceCount + "名");
                option.appendChild(txt);
                sel_post.appendChild(option);
            }
        }
        var nowPost = null;
        $scope.setpost();
        if(postList.length != 0 ){
            nowPost  = postList[0];
        }

        //选中某一个
        $scope.chosepost = function (post) {

            for(var i=0;i<postList.length;i++){
                if(post == postList[i].servicePost + "剩余" + postList[i].serviceCount + "名"){
                    nowPost = postList[i];
                }
            }
        }

        $scope.sign = function () {
            if ($scope.systemOSMy() == "IOS"){
                // dataList[i].serviceStarttimeFormat = (dataList[i].serviceStarttimeFormat).replace(/-/g,'/');
                nowPost.serviceStarttimeFormat = (nowPost.serviceStarttimeFormat).replace(/-/g,'/');
                nowPost.serviceEndtimeFormat = (nowPost.serviceEndtimeFormat).replace(/-/g,'/');
            }
            var date = $filter('date')(new Date(nowPost.serviceStarttimeFormat), 'yyyy年MM月dd日');
            var week = $filter('date')(new Date(nowPost.serviceStarttimeFormat), 'EEEE');
            week = $scope.engToChain(week);
            var hourMin_start = $filter('date')(new Date(nowPost.serviceStarttimeFormat), 'HH:mm');
            var hourMin_end = $filter('date')(new Date(nowPost.serviceEndtimeFormat), 'HH:mm');
            var obje = {
                time:date+"   "+week+"   "+hourMin_start+"~"+hourMin_end,
                startTime:nowPost.serviceStarttimeFormat,
                endTime:nowPost.serviceEndtimeFormat,
                postId:nowPost.postId,
                lineId:nowPost.lineId,
                stationId:nowPost.stationId,
                stationName:nowPost.stationName,
                post:nowPost.servicePost,
            }
            console.log(JSON.stringify(nowPost));
            if (nowPost != null) {
                service.sign(uuid, username,nowPost.lineId,nowPost.stationId,nowPost.lineName,nowPost.stationName,nowPost.servicePost,
                    nowPost.postId,nowPost.serviceStarttimeFormat,nowPost.serviceEndtimeFormat)
                    .then(function (result) {  //正确请求成功时处理
                        var jsonResult = result.data;
                        if (jsonResult.status == "success") {
                            showAlert("预约成功");
                            $ionicViewSwitcher.nextDirection('forward')
                            $state.go('tab.VolunteerConfirm',{jsonString:JSON.stringify(obje)});
                        } else {
                            showAlert(jsonResult.errormsg);
                        }

                    }).catch(function (result) { //捕捉错误处理
                    showAlert(JSON.stringify(result));
                });
            }
        }


        //  confirm 对话框
        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '提示',
                template:"<div style='text-align:center;font-family: 微软雅黑;'>您是否确认预约</div>",
                buttons: [
                    { text: "<div class='myPopup'>取消</div>",
                        onTap:function(e){
                            console.log('You are not sure');
                        }
                    },
                    {text: '<div class="myPopup">确定</div>',
                        onTap:function(e){
                            $scope.sign();
                            console.log('You are sure');
                        }
                    }]
            });
        };

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


        //ionic 生命周期
        $scope.$on('$ionicView.beforeEnter', function() {

            // alert("-------****"+JSON.stringify($scope.listPost)+"----");

        });
    });
