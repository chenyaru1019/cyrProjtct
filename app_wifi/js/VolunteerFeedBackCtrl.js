angular.module('starter.VolunteerFeedBackCtrl', [])

    .controller('VolunteerFeedBackCtrl', function($scope,$state,service,$rootScope,$timeout,$ionicViewSwitcher,$ionicHistory,$stateParams,$ionicPopup,$ionicNavBarDelegate) {

        $ionicNavBarDelegate.showBar(false);
        var ua = navigator.userAgent.toLowerCase();
        var btypeInfo = (ua.match( /aliapp/g ) || "other")[ 0 ];

        $scope.appType = false;

        if(btypeInfo == "aliapp"){
            $scope.appType = true;
        }else{
            $scope.appType = false;
        }

        $scope.volunteerFeedBackCancel = function () {
            $ionicViewSwitcher.nextDirection("back");
            $ionicHistory.goBack();
        }
        $scope.feedImg = ["../img/btn_addimage.png","../img/btn_addimage.png","../img/btn_addimage.png","../img/btn_addimage.png"];
        $scope.ImgShow = [true,false,false,false];
        $scope.isDelete = [false,false,false,false];
        $scope.imgString = ["","","",""];


        var jsonString = $stateParams.jsonString;
        var jsonData = JSON.parse(jsonString);


        var typeList = new Array();
        typeList.push("岗前培训到位");
        typeList.push("业务流程熟练");
        typeList.push("后勤保障完善");
        typeList.push("工作安排合理");
        typeList.push("培训工作欠缺");
        typeList.push("服务态度冷漠");
        typeList.push("业务操作不熟练");
        typeList.push("岗位设置不合理");

        var chooseType = "岗前培训到位";

        var sel_conlution = document.getElementById ('sel_conlution');//获取select下拉列表
        for ( var i = 0; i < typeList.length; i++)//循环添加2006到当前年份加3年的每个年份依次添加到下拉列表
        {
            var option = document.createElement ('option');
            option.value = typeList[i];
            var txt = document.createTextNode (typeList[i]);
            option.appendChild (txt);
            sel_conlution.appendChild (option);
        }

        //选中某一个
        $scope.choseType = function (order) {
            chooseType = order;
        }

        var imgData = new Array();
        for(var i=0;i<5;i++){
            var ob = {
                img:"../img/ic_star0.png",
                num:i,
            }
            imgData.push(ob);
        }

        $scope.stars = imgData;

        $scope.starClick = function (item) {
            imgData.length =0;
            for(var i=0;i<5;i++){
                if(i<=item.num){
                    var ob = {
                        img:"../img/ic_star1.png",
                        num:i,
                    }
                    imgData.push(ob);
                }else{
                    var ob = {
                        img:"../img/ic_star0.png",
                        num:i,
                    }
                    imgData.push(ob);
                }
            }
        }
        var uuid = localStorage.getItem("uuid");
        var username = localStorage.getItem("username");

        $scope.reader = new FileReader();   //创建一个FileReader接口
        $scope.setBase64_1 = function (files) {
            var file = files[0];
            $scope.reader.readAsDataURL(file)  //FileReader的方法，把图片转成base64
            $scope.reader.onload = function(ev) {
                $scope.$apply(function(){
                    $scope.imgString[0] = ev.target.result;
                    $scope.feedImg[0] = ev.target.result; //更新图片链接
                    console.log($scope.imgString[0]);
                    $scope.setDelete();
                    $scope.setImgShow();
                });
            };

        }
        $scope.setBase64_2 = function (files) {
            var file = files[0];
            $scope.reader.readAsDataURL(file)  //FileReader的方法，把图片转成base64
            $scope.reader.onload = function(ev) {
                $scope.$apply(function(){
                    $scope.imgString[1] = ev.target.result;
                    $scope.feedImg[1] = ev.target.result; //更新图片链接
                    $scope.setDelete();
                    $scope.setImgShow();
                });
            };

        }
        $scope.setBase64_3 = function (files) {
            var file = files[0];
            $scope.reader.readAsDataURL(file)  //FileReader的方法，把图片转成base64
            $scope.reader.onload = function(ev) {
                $scope.$apply(function(){
                    $scope.imgString[2] = ev.target.result;
                    $scope.feedImg[2] = ev.target.result; //更新图片链接
                    $scope.setDelete();
                    $scope.setImgShow();
               });
            };
            $scope.ImgShow = [true,true,true,true]
        }
        $scope.setBase64_4 = function () {

            showAlert("最多只能上传三张");
        }
        $scope.setDelete = function () {
            $scope.isDelete = [false,false,false,false];
            for(var i=0;i< $scope.imgString.length;i++){
                if($scope.imgString[i] != "" && $scope.imgString[i] != null && $scope.imgString[i] != undefined){
                    $scope.isDelete[i] = true;
                }
            }
        }
        $scope.setImgShow = function () {
            $scope.ImgShow = [true,false,false,false];
            var number = 0;
            for(var i=0;i< $scope.imgString.length;i++){
                if($scope.imgString[i] != "" && $scope.imgString[i] != null && $scope.imgString[i] != undefined){
                    number = number+1;
                }
            }
            if(number == 0){
                $scope.ImgShow = [true,false,false,false];
            }else if(number == 1){
                $scope.ImgShow = [true,true,false,false];
            }else if(number == 2){
                $scope.ImgShow = [true,true,true,false];
            }else{
                $scope.ImgShow = [true,true,true,true];
            }
        }

        $scope.deteleImg = function (num) {

            if(num == 0){
                $scope.imgString[0] = $scope.imgString[1];
                $scope.imgString[1] = $scope.imgString[2];
                $scope.imgString[2] = "";

                $scope.feedImg[0] = $scope.feedImg[1];
                $scope.feedImg[1] = $scope.feedImg[2];
                $scope.feedImg[2] = "../img/btn_addimage.png";
                $scope.setDelete();
                $scope.setImgShow();
            }else if(num == 1){
                $scope.imgString[1] = $scope.imgString[2];
                $scope.imgString[2] = "";

                $scope.feedImg[1] = $scope.feedImg[2];
                $scope.feedImg[2] = "../img/btn_addimage.png";

                $scope.setDelete();
                $scope.setImgShow();
            }else {
                $scope.imgString[2] = "";

                $scope.feedImg[2] = "../img/btn_addimage.png";

                $scope.setDelete();
                $scope.setImgShow();
            }

        }
        $scope.saveFeedback = function () {
            for(var i=0;i<$scope.imgString.length;i++){
                if($scope.imgString[i] == "" || $scope.imgString[i] == null || $scope.imgString[i] == undefined){
                    $scope.imgString[i] = "";
                }else{
                    var arr=$scope.imgString[i].split(",");
                    if(arr.length != 0){
                        $scope.imgString[i] = arr[1];
                    }
                    showAlert($scope.imgString[i]);
                }
            }

            service.saveFeedback(uuid,username,jsonData.lineId,jsonData.stationId,jsonData.postId,jsonData.serviceStarttime,
                jsonData.serviceEndtime,jsonData.feedback,jsonData.star,jsonData.suggestion,
                $scope.imgString[0],$scope.imgString[1],$scope.imgString[2])
                .then(function (result) {  //正确请求成功时处理
                    var jsonResult = result.data;
                    if(jsonResult.status == "success"){
                        showAlert("提交成功");
                    }else{
                        showAlert(jsonResult.errormsg);
                    }

                }).catch(function (result) { //捕捉错误处理

            });
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
