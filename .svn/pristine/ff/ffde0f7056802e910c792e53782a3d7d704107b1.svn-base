angular.module('starter.VolunteerOrderByTimeCtrl', [])

    .controller('VolunteerOrderByTimeCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,
                                                     $stateParams,$localstorage,$ionicPopup,$ionicNavBarDelegate) {

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

        //传值
        // $scope.dataList = $stateParams.jsonString;
        $scope.dataList = localStorage.getItem("dataUrl");
        //需要特殊显示的数组
        $scope.dealMouthArray = new Array();

        //直接处理传值内容****************************
        $scope.dealWithData = function () {

            // alert($scope.dataList);
            var listArr = JSON.parse($scope.dataList);
            var mouthAll = new Array();

            for(var i = 0;i<listArr.length;i++){
                 var strr = listArr[i].serviceStarttimeFormat;
                 var mouD = strr.substring(5,7);
                 var dayD = strr.substring(8,10);

                 var sddd = {
                     mouData:mouD,
                     dayData:dayD
                 }
                 mouthAll.push(sddd);
            }
            console.log(JSON.stringify(mouthAll)+"!!!!!!!")
            $scope.dealMouthArray = mouthAll;
        }

        $scope.dealWithData();


        console.log($scope.dataList);
        //

        $scope.xxxc = '1px solid #a2a2a2';

        //每月份数据
        $scope.dataMouth =  [];

        //月份总数据
        $scope.dataMouthList =  [];

        //根据日期---获取周几
        $scope.getWeekDay = function (date) {
            var datttt = new Date(date).getDay();
            return datttt;
        }

        //根据日期---查看本月多少天
        $scope.getMonthDayNum = function (date) {
            var curMonthDays = new Date(date.getFullYear(), (date.getMonth()+1), 0).getDate();
            // showAlert(curMonthDays)
            return curMonthDays;
        }

        $scope.createDataModel = function (firstDate) {
            var mouthModel = new Array();
            var weekModel = new Array();

            var mouthDayNum = 5*7;
            if($scope.getWeekDay(firstDate)+$scope.getMonthDayNum(firstDate)>=35){
                mouthDayNum = 6*7;
            }

            for(var i = 0;i<mouthDayNum;i++){
                var OneModel = new Array();
                if((i >= $scope.getWeekDay(firstDate))&&i<($scope.getWeekDay(firstDate)+$scope.getMonthDayNum(firstDate))){

                    //是否显示绿点
                    var boolString = 'false';
                    for(var j = 0;j<$scope.dealMouthArray.length;j++){
                        if(($scope.dealMouthArray[j].mouData == (firstDate.getMonth()+1))&&($scope.dealMouthArray[j].dayData ==(i-$scope.getWeekDay(firstDate)+1))){
                            boolString = 'true';
                        }
                    }

                    //决定日期数据
                    var dayStr = (i-$scope.getWeekDay(firstDate)+1);
                    if(dayStr<10){
                        dayStr = '0'+dayStr;
                    }
                    var month = (firstDate.getMonth()+1)+"";
                    if((firstDate.getMonth()+1)<10){
                        month = "0" + month;
                    }
                    var dateMessage = firstDate.getFullYear()+'-'+month+'-'+dayStr;

                    //当天变色
                    var todayColor = "white";
                    var todatT = "#0f0f0f";
                    if((new Date()).getDate() == (i-$scope.getWeekDay(firstDate)+1) &&(firstDate.getMonth() == (new Date().getMonth()))){
                        todayColor = "#d8000c";
                        todatT = "white";
                    }

                    OneModel = {
                        topColor:'1px solid #a2a2a2',
                        showTop:boolString,
                        textT:i-$scope.getWeekDay(firstDate)+1,
                        dateMessage:dateMessage,
                        todayC:todayColor,
                        todayT:todatT
                    };
                }else if(i < $scope.getWeekDay(firstDate)){
                    OneModel = {
                        topColor:'white',
                        showTop:'false',
                        textT:'',
                        dateMessage:'',
                        todayC:"white",
                        todayT:"#0f0f0f"
                    };
                }else if(i>=($scope.getWeekDay(firstDate)+$scope.getMonthDayNum(firstDate))){
                    OneModel = {
                        topColor:'white',
                        showTop:'false',
                        textT:'',
                        dateMessage:'',
                        todayC:"white",
                        todayT:"#0f0f0f"
                    };
                }
                weekModel.push(OneModel);

                if(i%7==6){
                    mouthModel.push(weekModel);
                    weekModel = [];
                }
            }
            $scope.dataMouth = mouthModel;
        };


        //获取所有月份数据
        $scope.getAllMouthData = function () {
            //看看添加几个月的
            var mouthList = new Array();
            for(var i=0;i<3;i++){
                //获取每月一号
                var firstDate=new Date();
                var mouthNum = firstDate.getMonth();
                firstDate.setDate(1);
                var ssr = mouthNum+i;
                if(mouthNum+i>=12){
                    ssr = ssr-12;
                    //加一年
                    firstDate.setFullYear(firstDate.getFullYear()+1)
                }
                firstDate.setMonth(ssr);
                $scope.createDataModel(firstDate);
                var mouthD = {
                    title:(ssr+1)+'月',
                    mouthD:$scope.dataMouth
                };
                mouthList.push(mouthD);
            }
            $scope.dataMouthList = mouthList;
        };
        $scope.getAllMouthData();

        $scope.choseOneDay = function (dateA) {
            if(dateA.showTop == 'true'){
                $ionicViewSwitcher.nextDirection('forward')
                $state.go('tab.VolunteerOrderStation1',{time:dateA.dateMessage});

                //选择之后放在缓存中-------代码暂时注销掉
                // localStorage.setItem("choseData",dateA.dateMessage);
                // $ionicViewSwitcher.nextDirection("back");
                // $ionicHistory.goBack();

                //相应界面获取方式为************不过缓存中存在dateString 取出来为空的情况，加个判定就好
                // var dateString = localStorage.getItem("choseData");
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

        $scope.$on('$ionicView.enter', function() {
            //设置没有标题
            dd.ready(function() {
                dd.biz.navigation.setTitle({
                    title: ' ',//控制标题文本，空字符串表示显示默认文本
                    onSuccess: function (result) {
                        /*结构
                        {
                        }*/
                    },
                    onFail: function (err) {
                    }
                });
            });
        });
    });
