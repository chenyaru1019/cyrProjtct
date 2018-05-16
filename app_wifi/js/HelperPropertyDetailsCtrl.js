angular.module('starter.HelperPropertyDetailsCtrl', [])

    .controller('HelperPropertyDetailsCtrl', function($scope,$state,service,$rootScope,$timeout,
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
        //定义一个数组 映射五颗星星的位置和图片
        $scope.starArray = [
            {   "id" : 1,
                "src":"img/starBack.png"},
            {   "id" : 2,
                "src":"img/starBack.png"},
            {   "id" : 3,
                "src":"img/starBack.png"},
            {   "id" : 4,
                "src":"img/starBack.png"},
            {   "id" : 5,
                "src":"img/starBack.png"}
        ];
        //初始化评价星级为0
        $scope.currentStar = 3;
        changeStars();
        //改变星星的背景图  点击的当前星星和做左边的星星换成亮图，右边的星星变成灰图
        function changeStars(){
            for(var i = 0;i < $scope.starArray.length; i++){
                if($scope.currentStar >= $scope.starArray[i].id){
                    $scope.starArray[i].src = "img/star.png";
                }else{
                    $scope.starArray[i].src = "img/starBack.png";
                }
            }
        }

        //点击星星的操作
        $scope.clickStar = function(item){
            $scope.currentStar = item.id;
            console.log($scope.currentStar);
            changeStars();
        };

        //点击评价按钮 判断用户是否已经点击星星 给与评价
        $scope.clickPublish = function() {
            if($scope.currentStar == 0){
                //若没点击，弹出提示
                Popup.loadMsg('请点击对应的星星给协作人评价！', 1500);
            }else{
                //TODO
            }
        };
        //钉钉标题与返回键设置
        dd.ready(function() {
            dd.biz.navigation.setTitle({
                title : '报修详情',//控制标题文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });

            // dd.ui.webViewBounce.disable();

            dd.biz.navigation.setLeft({
                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                text: '',//控制显示文本，空字符串表示显示默认文本
                onSuccess: function (result) {
                    //直接返回了，不在返回到原来的路由--------------用于处理基路由的时候返回问题
                    var stringL =  window.location.hash;
                    var staticStr = "#/tab/HelperWater";
                    if(stringL.indexOf(staticStr) != -1){
                        dd.biz.navigation.close({
                            onSuccess: function (result) {
                                /*result结构
                                {}
                                */
                            },
                            onFail: function (err) {
                            }
                        });
                    }else{
                        $ionicViewSwitcher.nextDirection("back");
                        $ionicHistory.goBack();
                    }
                },
                onFail: function (err) {
                    //showAlert(JSON.stringify(err));
                }
            });

        });
    });
