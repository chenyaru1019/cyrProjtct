angular.module('starter.VolunteerOrderLineCtrl', [])

    .controller('VolunteerOrderLineCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$ionicPopup,$ionicNavBarDelegate) {
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

        $scope.volunteerOrderLineCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }

        var dataList = new Array();
        var dataListNew = new Array();
        var uuid = localStorage.getItem("uuid");
        service.bespeakList(uuid)
            .then(function (result) {  //正确请求成功时处理
                var jsonResult = result.data;
                // alert(JSON.stringify(jsonResult));
                console.log("----"+JSON.stringify(result));
                if (jsonResult.status == "success") {
                    for(var i=0;i<jsonResult.content.length;i++){
                        var ob = {
                            stationName:jsonResult.content[i].stationName,
                            lineId:parseInt(jsonResult.content[i].lineId),
                            lineName:jsonResult.content[i].lineName,
                            id:jsonResult.content[i].id,
                            serviceCount:jsonResult.content[i].serviceCount,
                            stationId:jsonResult.content[i].stationId,
                            serviceStarttimeFormat:jsonResult.content[i].serviceStarttimeFormat,
                            serviceEndtimeFormat:jsonResult.content[i].serviceEndtimeFormat,
                            servicePost:jsonResult.content[i].servicePost,
                            postId:jsonResult.content[i].postId,
                            lineImg:""
                        }
                        ob.lineImg = "../img/line_"+ob.lineId+".png";
                        dataList.push(ob);

                    }

                    var lineList = new Array();
                    for(var j=0;j<dataList.length;j++){

                        if(lineList.indexOf(dataList[j].lineId) == -1){
                            lineList.push(dataList[j].lineId);
                            dataListNew.push(dataList[j]);
                        }else{
                            continue;
                        }
                    }

                    localStorage.setItem("dataUrl",JSON.stringify(dataList));
                } else {
                    showAlert(jsonResult.errormsg);
                }

            }).catch(function (result) { //捕捉错误处理
            showAlert(JSON.stringify(result));
        });

        $scope.listData = dataListNew;

        $scope.toVolunteerOrderStation = function (lineId) {
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.VolunteerOrderStation',{lineId:lineId});
        }
        $scope.toVolunteerOrderByTime = function () {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('tab.VolunteerOrderByTime',{jsonString:"0"});
        }

        //safari里面返回都是1280 ，目前所有320的先用1280代替
        if(window.screen.width <=1280){
            $scope.timeFont = {
                "padding-right":"10px",
            };

        }else{
            $scope.timeFont = {
                "padding-right":"4px",
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
    });
