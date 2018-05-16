// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic','ionic-datepicker','starter.services', 'starter.controllers','starter.MainVCCtrl',
    'ti-segmented-control','starter.BusCtrl','starter.WifiCtrl','starter.WifiFixCtrl','starter.WifiVisitorCtrl','starter.PastyCtrl',
    'starter.PastyMenuCtrl','starter.PastyMenuQueryCtrl','starter.PastyMyCtrl','starter.PastyMyQueryCtrl','starter.PastyQuerySureCtrl',
    'starter.VolunteerCtrl','starter.VolunteerExCtrl','starter.VolunteerMyCtrl','starter.VolunteerOrderLineCtrl','starter.VolunteerOrderCountCtrl',
    'starter.VolunteerOrderStationCtrl','starter.VolunteerRankCtrl','starter.VolunteerStationQueryCtrl','starter.VolunteerConfirmCtrl',
    'starter.VolunteerMyQueryCtrl','starter.VolunteerFeedBackCtrl','starter.VolunteerMyQuitCtrl','starter.PastyFinallyCtrl','starter.VolunteerOrderByTimeCtrl'
    ,'starter.HelperOfficeCtrl','starter.HelperComputerRepairCtrl','starter.HelperComputerCtrl','starter.HelperComputerHistoryCtrl','starter.HelperComputerDetailsCtrl',
    'starter.HelperPropertyRepairCtrl','starter.HelperPropertyCtrl','starter.HelperPropertyHistoryCtrl','starter.HelperPropertyDetailsCtrl','starter.HelperWaterCtrl','starter.WaterSuccessCtrl'
    ,'starter.WaterInputCtrl','starter.WaterHistoryCtrl'
    ])

// var username = "12345678901";
// var uuid = "72619830-99c6-4a2e-be2c-5fd55f8c2aec";
// var companyid = "0";
// var name = "翟俊杰";

  //run 方法初始化全局的数据 ,只对全局作用域起作用 如$rootScope
.run(function($ionicPlatform, $rootScope, $ionicPopup, $location) {
  $ionicPlatform.ready(function() {
      //全局数据
    var pageSise = 10;

    var username = "xunnuo00000";
      var uuid = "70a0207b-d296-44d6-a260-289792eb362d";
      var companyid = "0";
      var name = "翟俊杰";

      var empno = "";
      var phoneNumber = "";
      var companyCode = "";
      var companyName = "";
      var departmentName = "";
      var departmentCode = "";
      var subDepartmentCode = "";
      var subDepartmentName = "";
      var email = "";
      var title = "";
      var subphone = "";
      var room = "";
      var permissions = "PERMISSION_VOLUNTEER_TOTAL";
      var id = "";

      //地址
      // var apiPath =  "http://192.168.16.240:8080/metropolis-user";
      // var apiPath =  "http://192.168.17.88:8080";
      // var apiPath =  "http://140.206.138.190:5004/meeting_manage/";
      // var apiPath =  "http://192.168.17.20:8080/meeting_manage/";
      // var apiPath =  "http://zh909.metrolife.mobi:8080/meeting-manage/";

      //本地环境

      // var apiPath= "http://192.168.17.182:8080/meeting_manage/";
      // var checkUrl= "http://192.168.17.19:3000";
      //测试环境
      var checkUrl= "http://140.206.138.190:5031";
      var apiPath =  "http://140.206.138.190:5004/meeting_manage/";
      // var apiPath =  "http://192.168.16.240:8080/meeting_manage/";
      //正式环境
      // var checkUrl= "http://zh909.metrolife.mobi:5000";
      // var apiPath =  "http://zh909.metrolife.mobi:8080/meeting_manage/";


    // $rootScope.apiPath =  "http://zh909.metrolife.mobi:10000";
	      //var apiPath =  "http://10.2.129.29:10000";
//      $rootScope.apiPath = "http://192.168.17.228";


      localStorage.setItem("pageSise",pageSise);
      localStorage.setItem("enterId",id);
      localStorage.setItem("quitId",id);
      localStorage.setItem("username",username);
      localStorage.setItem("uuid",uuid);
      localStorage.setItem("companyid",companyid);
      localStorage.setItem("name",name);
      localStorage.setItem("empno",empno);
      localStorage.setItem("room",room);
      localStorage.setItem("phoneNumber",phoneNumber);
      localStorage.setItem("companyCode",companyCode);
      localStorage.setItem("companyName",companyName);
      localStorage.setItem("departmentName",departmentName);
      localStorage.setItem("departmentCode",departmentCode);
      localStorage.setItem("subDepartmentCode",subDepartmentCode);
      localStorage.setItem("subDepartmentName",subDepartmentName);
      localStorage.setItem("email",email);
      localStorage.setItem("title",title);
      localStorage.setItem("subphone",subphone);
      localStorage.setItem("permissions",permissions);
      localStorage.setItem("apiPath",apiPath);
      localStorage.setItem("checkUrl",checkUrl);
      localStorage.setItem("isSign","1");    //正式环境为0  测试时候可用为1
      localStorage.setItem("getBack","close")   //是否是退出  ***方便测试用    正式环境必须改成close

      localStorage.setItem("dataUrl","");

      //路由标记------辅助判定物理键-----志愿者模块
      localStorage.setItem("isBackRotu","0");
      //路由标记------辅助判定物理键-----点餐模块
      localStorage.setItem("isBackFood","0");

  });

  //   /**
  //    * 使用 HTML5 的 History 新 API pushState 来曲线监听 Android 设备的返回按钮
  //    * XBack.listen(function(){
  //   alert('oh! you press the back button');
  // });
  //    */
  //   ;!function(pkg, undefined){
  //       var STATE = 'x-back';
  //       var element;
  //       var onPopState = function(event){
  //           event.state === STATE && fire();
  //       }
  //       var record = function(state){
  //           history.pushState(state, null, location.href);
  //       }
  //       var fire = function(){
  //           var event = document.createEvent('Events');
  //           event.initEvent(STATE, false, false);
  //           element.dispatchEvent(event);
  //       }
  //       var listen = function(listener){
  //               element.addEventListener(STATE, listener, false);
  //           }
  //       ;!function(){
  //           element = document.createElement('span');
  //           window.addEventListener('popstate', onPopState);
  //           this.listen = listen;
  //           record(STATE);
  //       }.call(window[pkg] = window[pkg] || {});
  //   }('XBack');

})

.directive('hideTabs', function ($rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function () {
                scope.$watch(attributes.hideTabs, function (value) {
                    $rootScope.hideTabs = 'tabs-item-hide';
                });
            });
            scope.$on('$ionicView.beforeLeave', function () {
                scope.$watch(attributes.hideTabs, function (value) {
                    $rootScope.hideTabs = 'tabs-item-hide';
                });
                scope.$watch('$destroy', function () {
                    $rootScope.hideTabs = false;
                })
            });
        }
    };
})

    // .directive('popupKeyBoardShow', [function ($rootScope, $ionicPlatform, $timeout, $ionicHistory, $cordovaKeyboard) {
    //     return {
    //         link: function (scope, element, attributes) {
    //             window.addEventListener('native.keyboardshow', function (e) {
    //                 angular.element(element).parent().parent().css({
    //                     'margin-top': '-' + 380 + 'px'   //这里80可以根据页面设计，自行修改
    //                 })
    //             })
    //
    //             window.addEventListener('native.keyboardhide', function (e) {
    //                 angular.element(element).parent().parent().css({
    //                     'margin-top': 0
    //                 })
    //             })
    //         }
    //     }
    // }])


.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');
  //禁用右滑返回
  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  // $ionicConfigProvider.platform.android.navBar.alignTitle('left');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'abcCtrl'
    })

    .state('tab.MainVC', {
      url: '/MainVC',
      views: {
          'tab-MainVC': {
              templateUrl: 'templates/MainVC.html',
              controller: 'MainVCCtrl'
          }
      }
    })
      .state('tab.Bus', {
          url: '/Bus',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/Bus.html',
                  controller: 'BusCtrl'
              }
          }
      })
      .state('tab.Wifi', {
          url: '/Wifi',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/Wifi.html',
                  controller: 'WifiCtrl'
              }
          }
      })
      .state('tab.WifiFix', {
          url: '/WifiFix',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/WifiFix.html',
                  controller: 'WifiFixCtrl'
              }
          }
      })
      .state('tab.WifiVisitor', {
          url: '/WifiVisitor',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/WifiVisitor.html',
                  controller: 'WifiVisitorCtrl'
              }
          }
      })

      .state('tab.Pasty', {
          url: '/Pasty',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/Pasty.html',
                  controller: 'PastyCtrl'
              }
          }
      })
      .state('tab.PastyMy', {
          url: '/PastyMy',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/PastyMy.html',
                  controller: 'PastyMyCtrl'
              }
          }
      })
      .state('tab.PastyMenu', {
          url: '/PastyMenu?week',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/PastyMenu.html',
                  controller: 'PastyMenuCtrl'
              }
          }
      })
      .state('tab.PastyMenuQuery', {
          url: '/PastyMenuQuery',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/PastyMenuQuery.html',
                  controller: 'PastyMenuQueryCtrl'
              }
          }
      })
      .state('tab.PastyMyQuery', {
          url: '/PastyMyQuery?detail&supplyDt',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/PastyMyQuery.html',
                  controller: 'PastyMyQueryCtrl'
              }
          }
      })
      .state('tab.PastyQuerySure', {
          url: '/PastyQuerySure?sureListString',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/PastyQuerySure.html',
                  controller: 'PastyQuerySureCtrl'
              }
          }
      })
      .state('tab.PastyFinally', {
          url: '/PastyFinally?sureListString',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/PastyFinally.html',
                  controller: 'PastyFinallyCtrl'
              }
          }
      })
      .state('tab.Volunteer', {
          url: '/Volunteer',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/Volunteer.html',
                  controller: 'VolunteerCtrl'
              }
          }
      })
      .state('tab.VolunteerEx', {
          url: '/VolunteerEx',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerEx.html',
                  controller: 'VolunteerExCtrl'
              }
          }
      })
      .state('tab.VolunteerMy', {
          url: '/VolunteerMy',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerMy.html',
                  controller: 'VolunteerMyCtrl'
              }
          }
      })
      .state('tab.VolunteerOrderLine', {
          url: '/VolunteerOrderLine',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerOrderLine.html',
                  controller: 'VolunteerOrderLineCtrl'
              }
          }
      })
      .state('tab.VolunteerOrderStation', {
          url: '/VolunteerOrderStation?lineId',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerOrderStation.html',
                  controller: 'VolunteerOrderStationCtrl'
              }
          }
      })

      .state('tab.VolunteerOrderStation1', {
          url: '/VolunteerOrderStation?time',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerOrderStation.html',
                  controller: 'VolunteerOrderStationCtrl'
              }
          }
      })
      .state('tab.VolunteerRank', {
          url: '/VolunteerRank?rank',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerRank.html',
                  controller: 'VolunteerRankCtrl'
              }
          }
      })
      .state('tab.VolunteerStationQuery', {
          url: '/VolunteerStationQuery?stationName&stationId&lineId&jsonString',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerStationQuery.html',
                  controller: 'VolunteerStationQueryCtrl'
              }
          }
      })
      .state('tab.VolunteerOrderCount', {
          url: '/VolunteerOrderCount',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerOrderCount.html',
                  controller: 'VolunteerOrderCountCtrl'
              }
          }
      })
      .state('tab.VolunteerConfirm', {
          url: '/VolunteerConfirm?jsonString',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerConfirm.html',
                  controller: 'VolunteerConfirmCtrl'
              }
          }
      })
      .state('tab.VolunteerMyQuery', {
          url: '/VolunteerMyQuery?jsonString',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerMyQuery.html',
                  controller: 'VolunteerMyQueryCtrl'
              }
          }
      })
      .state('tab.VolunteerMyQuit', {
          url: '/VolunteerMyQuit?jsonString',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerMyQuit.html',
                  controller: 'VolunteerMyQuitCtrl'
              }
          }
      })
      .state('tab.VolunteerFeedBack', {
          url: '/VolunteerFeedBack?jsonString',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerFeedBack.html',
                  controller: 'VolunteerFeedBackCtrl'
              }
          }
      })
      .state('tab.VolunteerOrderByTime', {
          url: '/VolunteerOrderByTime?jsonString',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/VolunteerOrderByTime.html',
                  controller: 'VolunteerOrderByTimeCtrl'
              }
          }
      })
      .state('tab.HelperComputerRepair', {
          url: '/HelperComputerRepair',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/HelperComputerRepair.html',
                  controller: 'HelperComputerRepairCtrl'
              }
          }
      })
      .state('tab.HelperComputer', {
          url: '/HelperComputer',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/HelperComputer.html',
                  controller: 'HelperComputerCtrl'
              }
          }
      })
      .state('tab.HelperComputerHistory', {
          url: '/HelperComputerHistory',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/HelperComputerHistory.html',
                  controller: 'HelperComputerHistoryCtrl'
              }
          }
      })
      .state('tab.HelperComputerDetails', {
          url: '/HelperComputerDetails',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/HelperComputerDetails.html',
                  controller: 'HelperComputerDetailsCtrl'
              }
          }
      })
      .state('tab.HelperOffice', {
          url: '/HelperOffice',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/HelperOffice.html',
                  controller: 'HelperOfficeCtrl'
              }
          }
      })
      .state('tab.HelperPropertyRepair', {
          url: '/HelperPropertyRepair',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/HelperPropertyRepair.html',
                  controller: 'HelperPropertyRepairCtrl'
              }
          }
      })
      .state('tab.HelperProperty', {
          url: '/HelperProperty',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/HelperProperty.html',
                  controller: 'HelperPropertyCtrl'
              }
          }
      })
      .state('tab.HelperPropertyHistory', {
          url: '/HelperPropertyHistory',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/HelperPropertyHistory.html',
                  controller: 'HelperPropertyHistoryCtrl'
              }
          }
      })
      .state('tab.HelperPropertyDetails', {
          url: '/HelperPropertyDetails',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/HelperPropertyDetails.html',
                  controller: 'HelperPropertyDetailsCtrl'
              }
          }
      })
      .state('tab.HelperWater', {
          url: '/HelperWater?codeFrom',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/HelperWater.html',
                  controller: 'HelperWaterCtrl'
              }
          }
      })
      .state('tab.WaterSuccess', {
          url: '/WaterSuccess',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/WaterSuccess.html',
                  controller: 'WaterSuccessCtrl'
              }
          }
      })
      .state('tab.WaterInput', {
          url: '/WaterInput?jsonString',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/WaterInput.html',
                  controller: 'WaterInputCtrl'
              }
          }
      })
      .state('tab.WaterHistory', {
          url: '/WaterHistory',
          views: {
              'tab-MainVC': {
                  templateUrl: 'templates/WaterHistory.html',
                  controller: 'WaterHistoryCtrl'
              }
          }
      })
  ;


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/MainVC');

})
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ionicConfigProvider', 'ionicDatePickerProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $ionicConfigProvider, ionicDatePickerProvider) {
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
        //日期选择
        var datePickerObj = {
            inputDate: new Date(),
            titleLabel: '选择日期',
            setLabel: '确定',
            todayLabel: '今天',
            closeLabel: '关闭',
            mondayFirst: false,
            weeksList: ["日", "一", "二", "三", "四", "五", "六"],
            monthsList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            templateType: 'popup',
            from: new Date(2012, 8, 1),
            to: new Date(2028, 8, 1),
            showTodayButton: true,
            dateFormat: 'yyyy-MM-dd',
            closeOnSelect: false,
            disableWeekdays: []
        };    ionicDatePickerProvider.configDatePicker(datePickerObj)
    }]);