angular.module('starter.VolunteerOrderCountCtrl', [])

    .controller('VolunteerOrderCountCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$filter,$ionicPopup,$ionicNavBarDelegate) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.volunteerOrderCountCtrlCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }
        var permissions = localStorage.getItem("permissions");
        if(permissions.indexOf("PERMISSION_VOLUNTEER_TOTAL") != -1){
            $scope.isPerson = true;
            $scope.isTotal = true;
        }else if(permissions.indexOf("PERMISSION_VOLUNTEER_DEPARTMENT") != -1){
            $scope.isPerson = false;
            $scope.isTotal = false;
        }else{
            $scope.isPerson = false;
            $scope.isTotal = false;
        }

        $scope.bottomTitle = "查看支部整体情况"
        var yearList = new Array();
        var year = new Date().getFullYear(); //获取当前年份
        var month = new Date().getMonth();
        for ( var i = year; i >= 2016; i--)//循环添加2006到当前年份加3年的每个年份依次添加到下拉列表
        {
            if(i == 2016){
                var ob = {
                    year:i,
                    month:"12",
                    name:i+"年下半年"
                }
                yearList.push(ob);
            }else if(i == year){
                if(month < 6){
                    var ob = {
                        year:i,
                        month:"06",
                        name:i+"年上半年"
                    }
                    yearList.push(ob);
                }else{
                    var ob1 = {
                        year:i,
                        month:"06",
                        name:i+"年上半年"
                    }
                    var ob2 = {
                        year:i,
                        month:"12",
                        name:i+"年下半年"
                    }
                    yearList.push(ob2);
                    yearList.push(ob1);
                }
            }else{
                var ob1 = {
                    year:i,
                    month:"06",
                    name:i+"年上半年"
                }
                var ob2 = {
                    year:i,
                    month:"12",
                    name:i+"年下半年"
                }
                yearList.push(ob2);
                yearList.push(ob1);
            }
        }
        var sel = document.getElementById ('sel');//获取select下拉列表
        for( var i=0;i<yearList.length;i++){
            var option = document.createElement ('option');
            option.value = yearList[i].name;
            var txt = document.createTextNode (yearList[i].name);
            option.appendChild (txt);
            sel.appendChild (option);
        }
        //选中某一个
        $scope.choseYear = function (value) {
            for(var i=0;i<yearList.length;i++){
                if(value == yearList[i].name){
                    $scope.title = value+"支部报告"
                    $scope.departPerson(yearList[i].year,yearList[i].month);
                }
            }
        }


        var departPerList = new Array();

        var uuid = localStorage.getItem("uuid");

        $scope.departPerson = function (year,month) {

            service.signStatistics(uuid, year, month, "001")
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;
                    if (jsonResult.status == "success") {
                        departPerList.length = 0;
                        for(var i=0;i<jsonResult.content.length;i++){
                            var ob = {
                                allTime:jsonResult.content[i].allTime,
                                subDepartmentName:jsonResult.content[i].subDepartmentName,
                                didTime:jsonResult.content[i].didTime,
                                name:jsonResult.content[i].name,
                                state:"",
                                progress:"",
                                stateColor:"",
                                progressIndex:0,
                                subDeparImage:'../img/btnRig.png',
                            }
                            if(parseFloat(ob.allTime) <= 0){
                                ob.state = "未完成";
                                ob.stateColor = "#343535";
                                ob.progress = "0.00%";
                                ob.progressIndex = 0;
                            } else if(ob.didTime >= ob.allTime){
                                ob.state = "已完成";
                                ob.stateColor = "#68a948";
                                var progress = parseFloat(ob.didTime)/parseFloat(ob.allTime);
                                progress = $filter('number')(progress, 4);

                                ob.progress = $filter('number')(progress*100, 2)+"%";

                                ob.progressIndex = progress;
                            }else{
                                ob.state = "未完成";
                                ob.stateColor = "#343535";
                                var progress = parseFloat(ob.didTime)/parseFloat(ob.allTime);
                                progress = $filter('number')(progress, 4);
                                ob.progress = $filter('number')(progress*100, 2)+"%";
                                ob.progressIndex = progress;
                            }
                            departPerList.push(ob);
                        }
                        $scope.listDepartPers = departPerList;
                        $scope.depart(year,month);
                    } else {
                        showAlert(jsonResult.errormsg);
                    }
                }).catch(function (result) { //捕捉错误处理

            });
        }

        var departList = Array();
        $scope.depart = function (year,month) {
            service.signStatistics(uuid,year,month,"002")
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;
                    if(jsonResult.status == "success"){
                        departList.length = 0;
                        for(var i=0;i<jsonResult.content.length;i++){

                            var oneDepasrtPers = new Array();
                            for(var j=0;j<$scope.listDepartPers.length;j++){
                                if(jsonResult.content[i].subDepartmentName == $scope.listDepartPers[j].subDepartmentName){
                                    oneDepasrtPers.push($scope.listDepartPers[j]);
                                }
                            }
                            var ob = {
                                allTime:jsonResult.content[i].allTime,
                                subDepartmentName:jsonResult.content[i].subDepartmentName,
                                didTime:jsonResult.content[i].didTime,
                                oneDepasrtPers:oneDepasrtPers,
                                isShow:false,
                                id:jsonResult.content[i].subDepartmentName+""+i,
                                progress:jsonResult.content[i].percent,
                                stateColor:"",
                                progressIndex:0,
                                subDeparImage:'../img/btnRig.png',
                            }
                            if(parseFloat(ob.progress) <= 0){
                                ob.stateColor = "#FC2F2F";
                                ob.progress = "0.00%";
                                ob.progressIndex = 0;
                            } else if(parseFloat(ob.progress) >= 1){
                                ob.stateColor = "#68a948";
                                var progress = parseFloat(oob.progress);
                                progress = $filter('number')(progress, 4);
                                ob.progress = $filter('number')(progress*100, 2)+"%";
                                ob.progressIndex = progress;
                            }else{
                                ob.stateColor = "#FC2F2F";
                                var progress = parseFloat(ob.progress);
                                progress = $filter('number')(progress, 4);
                                ob.progress = $filter('number')(progress*100, 2)+"%";
                                ob.progressIndex = progress;
                            }
                            if($scope.isTotal == false){
                                if(localStorage.getItem("subDepartmentName") == ob.subDepartmentName){
                                    departList.push(ob);
                                }
                            }else{
                                departList.push(ob);
                            }

                        }
                        $scope.listDeparts = departList;

                    }else{
                        showAlert(jsonResult.errormsg);
                    }
                }).catch(function (result) { //捕捉错误处理

            });
        }
        var monthD ="";
        if(month<6){
            monthD = "06";
            $scope.title = year+"年上半年支部报告"
        }else{
            monthD = "12";
            $scope.title = year+"年下半年支部报告"
        }
        $scope.departPerson(year,monthD);

        $scope.personOrDepart = function () {
            if($scope.isPerson == true){
                $scope.isPerson = false;
                $scope.bottomTitle = "查看个人整体情况";
            }else{
                $scope.isPerson = true;
                $scope.bottomTitle = "查看支部整体情况";
            }

        }


        $scope.changeShow = function (item) {
            for(var i=0;i<departList.length;i++){
                if(departList[i].id == item.id){
                    departList[i].isShow = !departList[i].isShow;

                    if(departList[i].isShow){
                        departList[i].subDeparImage = '../img/btnBottom.png';
                    }else{
                        departList[i].subDeparImage = '../img/btnRig.png';
                    }

                }
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
