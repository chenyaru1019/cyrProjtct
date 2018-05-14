angular.module('starter.WaterHistoryCtrl', [])

    .controller('WaterHistoryCtrl', function($scope,$state,service,$rootScope,$timeout,
                                             $ionicViewSwitcher,$ionicHistory,$ionicNavBarDelegate,$ionicPopup,$ionicActionSheet) {
        //判断手机端才能使用
        // $ionicNavBarDelegate.showBar(false);
        // var ua = navigator.userAgent.toLowerCase();
        // var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];
        // $scope.appType = false;
        //
        // if(btypeInfo == "aliapp"){
        //     $scope.appType = true;
        // }else{
        //     $scope.appType = false;
        // }
        $scope.appType = true;

        var dataList = new Array();

        var submitData = {
            uuid:localStorage.getItem("uuid"),
        };
        service.getWaterOrderList(submitData)
            .then(function (result) {
                // alert(JSON.stringify(result));
                var dataJson = result.data;
                if(dataJson.status == "success"){
                    for(var i=0;i<dataJson.content.length;i++){
                        var codeForWater1;
                        var codeForWater2;
                        var codeForWater3;
                        for(var j=0;j<dataJson.content[i].orderDetail.length;j++){
                            if(dataJson.content[i].orderDetail[j].bottleType == 1){
                                codeForWater1 = dataJson.content[i].orderDetail[j].count;
                            }else if(dataJson.content[i].orderDetail[j].bottleType == 2){
                                codeForWater2 = dataJson.content[i].orderDetail[j].count;
                            }else if(dataJson.content[i].orderDetail[j].bottleType == 3){
                                codeForWater3 = dataJson.content[i].orderDetail[j].count;
                            }
                        }
                        var ob = {
                            id:dataJson.content[i].id,
                            orderName:dataJson.content[i].orderName,
                            orderMobile:dataJson.content[i].orderMobile,
                            orderPhone:dataJson.content[i].orderPhone,
                            createAt:dataJson.content[i].createAt,
                            room:dataJson.content[i].room,
                            codeForWater1:codeForWater1,
                            codeForWater2:codeForWater2,
                            codeForWater3:codeForWater3,
                        }
                        dataList.push(ob);
                    }
                }
            })
            .catch(function (result) {
                alert(JSON.stringify(result))
            })

        $scope.listData = dataList;

        $scope.toWaterInput = function (item) {
            var ob = {
                typeCode: "history",
                codeForWater1: item.codeForWater1,
                codeForWater2: item.codeForWater2,
                codeForWater3: item.codeForWater3,
                address : item.room,
                name : item.orderName,
                telephone : item.orderMobile,
                cellphone : item.orderPhone,
            }
            var jsonString = JSON.stringify(ob);
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('tab.WaterInput',{jsonString:jsonString});
        }
        //钉钉标题设置
        dd.ready(function() {
            dd.biz.navigation.setTitle({
                title : '历史订单',//控制标题文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });
            // dd.ui.webViewBounce.disable();
        });
    });
