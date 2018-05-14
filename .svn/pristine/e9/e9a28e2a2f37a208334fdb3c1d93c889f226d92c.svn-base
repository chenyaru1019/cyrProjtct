var App = angular.module('app', ['ngRoute']);

App.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/asdasd',{templateUrl:'views/tpl/main.html',controller:'MainCtrl'})
        .when('/spPage',{templateUrl:'views/tpl/spPage.html',controller:'SpPageCtrl'})
        .when('/',{templateUrl:'views/tpl/partyMain.html',controller:'PartyMainCtrl'})
        .when('/partyQuery',{templateUrl:'views/tpl/partyQuery.html',controller:'PartyQueryCtrl'})
        .when('/partyPerson',{templateUrl:'views/tpl/partyPerson.html',controller:'PartyPersonCtrl'})
        .when('/partyBranch',{templateUrl:'views/tpl/partyBranch.html',controller:'PartyBranchCtrl'})
        .otherwise({redirectTo:'/'});
}]);

App.directive('stringHtml' , function(){
    return function(scope , el , attr){
        if(attr.stringHtml){
            scope.$watch(attr.stringHtml , function(html){
                el.html(html || '');//更新html内容
            });
        }
    };
});

App.factory('service', function ($http,$log) {

    // var apiPath_ser =  "http://192.168.16.240:8080/metropolis-user";
    // var apiPath_ser =  "http://192.168.17.88:8080";
    // var apiPath_ser =  "http://140.206.138.190:5004/metropolis-user";
    var apiPath_ser =  "http://zh909.metrolife.mobi:8080/metropolis-user";

    var getWagesGeneral = "/wages/getWagesGeneral";
    var getPartyBranchDetail = "/wages/getPartyBranchDetail";
    var getWagesDetail = "/wages/getWagesDetail";
    var getPartyBranchGeneral = "/wages/getPartyBranchGeneral";
    var checkPartyDuseByParty = "/wages/checkPartyDuseByParty";
    var getuserid = "https://oapi.dingtalk.com/user/getuserinfo";
    var getuserinfo = "https://oapi.dingtalk.com/user/get";
    // var getDdUserFromAPP = "http://192.168.17.88:8080//metor_mobile_new/getDdUserFromAPP"
    // var getDdFromAPP = "http://192.168.17.88:8080/metor_mobile_new/getDdFromAPP";
    var NEW_URL = "http://zh909.metrolife.mobi:8080/meeting-manage/";
    // var NEW_URL = "http://140.206.138.190:5004/meeting_manage/";

    var getDdFromAPP = NEW_URL+"mobile/getDdFromAPP";
    var getDdUserFromAPP = NEW_URL+"mobile/getDdUserFromAPP";
    // var getDdFromAPP = "http://140.206.138.190:5030/909/mobile/getDdFromAPP";
    // var getDdUserFromAPP = "http://140.206.138.190:5030/909/mobile/getDdUserFromAPP";
    //旧工号获取新工号+支部code
    var getStaffPartyBranch = "/wages/getStaffPartyBranch";
    // var getWagesGeneral =  "/metor_mobile_new/getLinesFromAPP";
    return {
        //获取工资条
        getWagesGeneral: function (date,psnCode) {
            var ob = {
                "date":date,
                "psnCode":psnCode,
            }
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getWagesGeneral,
                {json : JSON.stringify(ob)},
                postCfg
            )
        },
        //获取所在支部党费信息
        getPartyBranchDetail: function (year,partyBranchCode) {
            var ob = {
                "year":year,
                "partyBranchCode":partyBranchCode,
            }
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getPartyBranchDetail,
                {json : JSON.stringify(ob)},
                postCfg
            )
        },
        //个人工资条详细
        getWagesDetail: function (time,psnCode,companyCode) {
            var ob = {
                "date":time,
                "psnCode":psnCode,
                "companyCode":companyCode,
            }
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getWagesDetail,
                {json : JSON.stringify(ob)},
                postCfg
            )
        },

        //所有党支部年度缴费概要
        getPartyBranchGeneral: function (year,companyCode) {
            var ob = {
                "year":year,
                "companyCode":companyCode,
            }
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getPartyBranchGeneral,
                {json : JSON.stringify(ob)},
                postCfg
            )
        },

        //党支部管理员确认党费已收
        checkPartyDuseByParty: function (date,psnCode) {
            var ob = {
                "date":date,
                "psnCode":psnCode
            }
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + checkPartyDuseByParty,
                {json : JSON.stringify(ob)},
                postCfg
            )
        },

        //旧工号获取新工号+支部code
        getStaffPartyBranch: function (psnCode) {
            var ob = {
                "psnCode":psnCode
            }
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getStaffPartyBranch,
                {json : JSON.stringify(ob)},
                postCfg
            )
        },

        // //获取userid
        // getuserid: function (code,accesstoken) {
        //     // postCfg = {
        //     //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     //     transformRequest: function (data) {
        //     //         return $.param(data);
        //     //     }
        //     // };
        //     return $http.get(
        //     getuserid+"?access_token="+accesstoken+"&code="+code
        //     // {access_token:accesstoken,code : code}
        //     // postCfg
        //     )
        // },
        // //获取个人信息
        // getuserinfo: function (code,accesstoken) {
        //     // postCfg = {
        //     //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     //     transformRequest: function (data) {
        //     //         return $.param(data);
        //     //     }
        //     // };
        //     return $http.get(
        //         getuserinfo,
        //         {access_token:accesstoken,code : code}
        //     )
        // },

        //获取返回信息
        getDdFromAPP: function (code) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.get(
                getDdFromAPP,
                {},
                postCfg
            )
        },

        //获取返回信息
        getDdUserFromAPP: function (code,access_token) {
            // alert(access_token+"....................."+code);
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.get(
                getDdUserFromAPP+"?access_token="+access_token+"&code="+code,
                {},
                postCfg
            )
        }
    }
})
    .factory('$localstorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            remove: function (key) {
                $window.localStorage.removeItem(key);
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }]);
