angular.module('starter.VolunteerOrderStationCtrl', [])

    .controller('VolunteerOrderStationCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$stateParams,
                                                      $filter,$ionicPopup,$ionicNavBarDelegate) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];
        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.volunteerOrderStationCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }

        $scope.stationNum = 0;
        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");

        var lineId = $stateParams.lineId;
        var time = $stateParams.time;

        var dataList = new Array();
        var dataListNew = new Array();
        service.bespeakList(uuid)
            .then(function (result) {  //正确请求成功时处理
                var jsonResult = result.data;

                if (jsonResult.status == "success") {
                     // dataList = new Array();
                     // dataListNew = new Array();
                    dataList.length = 0;
                    dataListNew.length = 0;

                    // alert(JSON.stringify(dataList)+"--------"+JSON.stringify(dataListNew));

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
                            lineImg:"",
                            jsonString:""
                        }
                        ob.lineImg = "../../img/line_"+ob.lineId+".png";
                        if(lineId == null || lineId == "" || lineId == undefined){

                            if ($scope.systemOS() == "IOS"){
                                ob.serviceStarttimeFormat = (ob.serviceStarttimeFormat).replace(/-/g,'/');
                                // console.log("******^*^*"+timeData);
                            }
                            var serviceStarttimeFormat = new Date(ob.serviceStarttimeFormat);
                            var startTime = $filter('date')(serviceStarttimeFormat, 'yyyy-MM-dd');

                            if(time == startTime){
                                dataList.push(ob);
                            }
                        }else{
                            if(ob.lineId == lineId){
                                dataList.push(ob);
                            }
                        }
                    }
                    var lineList = new Array();
                    for(var j=0;j<dataList.length;j++){

                        if(lineList.indexOf(dataList[j].stationId) == -1){
                            lineList.push(dataList[j].stationId);
                            dataListNew.push(dataList[j]);
                        }else{
                            continue;
                        }
                    }
                    // alert(dataListNew.length);
                    $scope.stationNum = dataListNew.length;
                } else {
                    showAlert(jsonResult.errormsg);
                }

            }).catch(function (result) { //捕捉错误处理
            showAlert(JSON.stringify(result));
        });

        // $scope.sort = function (dataList) {
        //     dataList.sort(function(a,b){
        //         if(parseInt(a.lineId)-parseInt(b.lineId)>0){
        //             return 1;
        //         }else{
        //             return -1;
        //         }
        //     });
        //     return dataList;
        // }

        // dataListNew = $scope.sort(dataListNew);
        $scope.listData = dataListNew;

        $scope.toVolunteerStationQuery = function (item) {
            var jarry = new Array();
            for(var i=0;i<dataList.length;i++){
                if(dataList[i].stationId == item.stationId){
                    jarry.push(dataList[i]);
                }
            }
            var jsonStringOne= JSON.stringify(jarry);
            $ionicViewSwitcher.nextDirection('forward')
            $state.go('tab.VolunteerStationQuery',{jsonString:jsonStringOne});
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
    });
