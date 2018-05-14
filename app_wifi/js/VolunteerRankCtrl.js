angular.module('starter.VolunteerRankCtrl', [])

    .controller('VolunteerRankCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$stateParams,$ionicPopup,$ionicNavBarDelegate) {
        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.volunteerRankCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }

        $scope.rank = $stateParams.rank;

        var colorData = ["#faf0e6", "#f4a460", "#dda0dd", "#daa520", "#8fbc8f", "#fff0f5",
            "#666699", "#99cc33", "#cccc33", "#cc3366", "#99cc66", "#336666"]

        var data_person = new Array();
        var data_depart = new Array();

        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");

        service.getRank(uuid,"001")
            .then(function (result) {  //正确请求成功时处理
                var jsonResult = result.data;
                console.log(JSON.stringify(jsonResult));
                if (jsonResult.status == "success") {
                    for(var i=0;i<jsonResult.content.length;i++){
                        var num = Math.ceil(Math.random()*11);
                        var ob = {
                            name: jsonResult.content[i].name,
                            rank:jsonResult.content[i].rank,
                            time:jsonResult.content[i].time,
                            color:colorData[num],
                            hourMin:"",
                        }
                        var mss = Math.round(parseFloat(ob.time) * 60 * 60 * 1000);
                        var days =  Math.floor(mss / (1000 * 60 * 60 * 24));
                        var hours = (mss%(1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + days * 24;
                        var minutes = (mss%(1000 * 60 * 60)) / (1000 * 60);
                        ob.hourMin = "已完成" + parseInt(hours) + "小时" + parseInt(minutes) + "分钟";
                        data_person.push(ob);
                    }
                    $scope.getRankDepart();
                } else {
                    showAlert(jsonResult.errormsg);
                }

            }).catch(function (result) { //捕捉错误处理

        });

        $scope.getRankDepart = function () {
            service.getRank(uuid,"002")
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;

                    if (jsonResult.status == "success") {
                        for(var i=0;i<jsonResult.content.length;i++){
                            var num = Math.ceil(Math.random()*11);
                            var ob = {
                                name: jsonResult.content[i].subDepartmentName,
                                rank:jsonResult.content[i].rank,
                                time:jsonResult.content[i].percent*100,
                                color:colorData[num],
                            }

                            if(ob.name != "其他"){
                                data_depart.push(ob);
                            }
                        }
                    } else {
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理
                showAlert(JSON.stringify(result));
            });
        }

        $scope.list = data_person;
        $scope.title = "个人排行榜";
        $scope.right = "按支部";
        $scope.type = "person";
        $scope.isShowPerson = true;
        $scope.changeType = function () {
            if($scope.type == "person"){
                $scope.title = "支部排行榜";
                $scope.right = "按个人";
                $scope.type = "depart";
                $scope.list = data_depart;
                $scope.isShowPerson = false;
            }else if($scope.type == "depart"){
                $scope.title = "个人排行榜";
                $scope.right = "按支部";
                $scope.type = "person";
                $scope.list = data_person;
                $scope.isShowPerson = true;
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
