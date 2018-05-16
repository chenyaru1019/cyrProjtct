angular.module('starter.MainVCCtrl', [])

    .controller('MainVCCtrl', function($scope,$state,$ionicViewSwitcher,service,$rootScope,noSigns,$ionicPopup,$ionicNavBarDelegate) {

        //$ionicNavBarDelegate.showBar(false);
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

        $scope.takeToUrl = function (path) {
            // if (localStorage.getItem("isSign") == "1") {
                $ionicViewSwitcher.nextDirection('forward');
                if (path == "wifi") {
                    $state.go('tab.Wifi');
                } else if (path == 'bus') {
                    $state.go('tab.Bus');
                } else if (path == 'volunteer') {
                    $state.go('tab.Volunteer');
                } else if (path == 'pasty') {
                    $state.go('tab.Pasty');
                }else if (path == 'helperwater') {
                    $state.go('tab.HelperWater');
                } else if (path == 'helpercomputerRepair') {
                    $state.go('tab.HelperComputerRepair');
                }else if (path == 'helperPropertyRepair') {
                    console.log(111)
                    $state.go('tab.HelperPropertyRepair');
                }else {
                    showAlert("还未开放");
                }
            // }else{
            //     showAlert("未完成免登流程");
            // }
            // $ionicViewSwitcher.nextDirection('forward');
            // $state.go('tab.focusingdetail_focusing',item);
        };
        // var asd = noSigns.signNo();


        // service.getDdFromAPP()
        //     .then(function (result) {  //正确请求成功时处理
        //         // var jsonResultString = JSON.stringify(result.data);
        //         var jsonResult = result.data;
        //         showAlert(JSON.stringify(result.data));
        //         if(jsonResult.status == "success"){
        //             var array = jsonResult.message;
        //             if(array.length>0){
        //                 dd.config.timeStamp = array[0].timeStamp;
        //                 dd.config.nonceStr = array[0].nonceStr;
        //                 dd.config.signature = array[0].signature;
        //                 $scope.accesstoken = array[0].accesstoken;
        //
        //                 $scope.requestAuthCode();
        //             }
        //         }else{
        //             showAlert("关联账号失败");
        //         }
        //
        //     }).catch(function (result) { //捕捉错误处理
        //
        //     showAlert(JSON.stringify(result));
        // });
        // $scope.requestAuthCode = function () {
        //     // dd.ready(function() {
        //     dd.runtime.permission.requestAuthCode({
        //         corpId: "ding38c46ef492978e7335c2f4657eb6378f",
        //         onSuccess: function (result) {
        //             var code = result.code;
        //             showAlert(code);
        //             $scope.getDdUserFromAPP(code,$scope.accesstoken);
        //             /*{
        //                 code: 'hYLK98jkf0m' //string authCode
        //             }*/
        //         },
        //         onFail: function (err) {
        //             showAlert("关联账号失败");
        //         },
        //     });
        //     // });
        // }
        // $scope.getDdUserFromAPP = function (code,access_token) {
        //     service.getDdUserFromAPP(code,access_token)
        //         .then(function (result) {  //正确请求成功时处理
        //             // var jsonResultString = JSON.stringify(result.data);
        //             var dataJson = result.data;
        //             showAlert(JSON.stringify(result.data));
        //             if(dataJson.resultCode == 100){
        //                 localStorage.setItem("username",dataJson.username);
        //                 localStorage.setItem("uuid",dataJson.uuid);
        //                 localStorage.setItem("name",dataJson.name);
        //             }else if(dataJson.resultCode == 101){
        //                 showAlert("access_token 获取失败");
        //             }else if(dataJson.resultCode == 102){
        //                 showAlert("ticket 获取失败");
        //             }else if(dataJson.resultCode == 103){
        //                 showAlert("access_token 或 code错误");
        //             }else if(dataJson.resultCode == 200){
        //                 showAlert("参数错误");
        //             }else if(dataJson.resultCode == 500){
        //                 showAlert("未查询到工号信息");
        //             }
        //
        //         }).catch(function (result) { //捕捉错误处理
        //             showAlert(JSON.stringify(result));
        //     });
        // }
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


        $scope.upload = function (dataUrl, name) {
            //     Upload.upload({
            //         url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            //         data: {
            //             file: Upload.dataUrltoBlob(dataUrl, name)
            //         },
            //     }).then(function (response) {
            //         $timeout(function () {
            //             $scope.result = response.data;
            //         });
            //     }, function (response) {
            //         if (response.status > 0) $scope.errorMsg = response.status
            //             + ': ' + response.data;
            //     }, function (evt) {
            //         $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            //     });
            // }
        }
    });
