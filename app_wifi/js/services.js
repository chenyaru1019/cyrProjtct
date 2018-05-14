angular.module('starter.services', [])

  .factory('service', function ($http, $rootScope) {

      //地址
      var apiPath_ser =  localStorage.getItem("apiPath");
      var NEW_URL = localStorage.getItem("apiPath");

      var getDdFromAPP = NEW_URL+"mobile/getDdFromAPP";
      var getDdUserFromAPP = NEW_URL+"mobile/getDdUserFromAPP";

      var getbus = "mobile/getServiceInfoList";
      var getSignServiceInfo = "mobile/getSignServiceInfo";
      //获取可订点心列表
      var getEverydaySupply = "mobile/getEverydaySupply";
      //获取用户订单
      var getOrderList = "mobile/getOrderList";
      //wifi下载单接口
      var getWifiDownloadUrl = "mobile/getWifiDownloadUrl";
      //获取系统时间
      var getSeverTime = "mobile/getSeverTime";
      //提交/取消订单
      var createCancelOrder = "mobile/createCancelOrder";
      // 预约统计接口
      var signStatistics = "mobile/signStatistics";
      // 排行榜接口
      var rank = "mobile/rank";
      //拉取志愿者预约信息
      var bespeakList = "mobile/bespeakList";
      //拉取我的预约
      var getSignList = "mobile/getSignList";
      //确认预约 和 签进签出
      var sign = "mobile/sign";
      //取消预约接口
      var deleteSign = "mobile/deleteSign";
      // 保存意见反馈的接口
      var saveFeedback = "mobile/saveFeedback";
      // 已完成的预约后显示反馈信息
      var getSignDetail = "mobile/getSignDetail";
      // 获取食堂列表
      var getCanteenList = "mobile/getCanteenList";

      //获取公司和部门
      var getOrganizations = "mobile/getOrganizations";

      //线路
      var getLines = "mobile/getLines";
      //站点
      var getStations = "mobile/getStations";

      //管家服务提交
      var submitMaintenance = "mobile/submitMaintenance";

      //送水服务提交
      var submitWaterOrder = "mobile/submitWaterOrder";

      //送水服务历史记录
      var getWaterOrderList = "mobile/getWaterOrderList";

    return {

    //已完成的预约后显示反馈信息
        getSignDetail: function (uuid,username,lineId,stationId,postId,serviceStarttime,serviceEndtime) {
            serviceStarttime = serviceStarttime.replace(/\//g,'-');
            serviceEndtime = serviceEndtime.replace(/\//g,'-');
            lineId = parseInt(lineId);
            if(lineId<10){
                lineId = "0"+lineId;
            }
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getSignDetail,
                {uuid:uuid,username:username,lineId:lineId,stationId:stationId
                    ,postId:postId,serviceStarttime:serviceStarttime,serviceEndtime:serviceEndtime},
                postCfg
            )
        },
        //保存意见反馈的接口
        saveFeedback: function (uuid,username,lineId,stationId,postId,serviceStarttime,serviceEndtime,feedback,star,suggestion,image1,image2,image3) {
            serviceStarttime = serviceStarttime.replace(/\//g,'-');
            serviceEndtime = serviceEndtime.replace(/\//g,'-');
            lineId = parseInt(lineId);
            if(lineId<10){
                lineId = "0"+lineId;
            }
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + saveFeedback,
                {uuid:uuid,username:username,lineId:lineId,stationId:stationId,feedback:feedback,star:star,suggestion:suggestion
                    ,postId:postId,serviceStarttime:serviceStarttime,serviceEndtime:serviceEndtime,image1:image1,image2:image2,image3:image3},
                postCfg
            )
        },
        //取消预约接口
        deleteSign: function (uuid,username,lineId,stationId,postId,serviceStarttime,serviceEndtime) {
            serviceStarttime = serviceStarttime.replace(/\//g,'-');
            serviceEndtime = serviceEndtime.replace(/\//g,'-');
            lineId = parseInt(lineId);
            if(lineId<10){
                lineId = "0"+lineId;
            }
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + deleteSign,
                {uuid:uuid,username:username,lineId:lineId,stationId:stationId
                    ,postId:postId,serviceStarttime:serviceStarttime,serviceEndtime:serviceEndtime},
                postCfg
            )
        },
        //确认预约 和 签进签出
        sign: function (uuid,username,lineId,stationId,lineName,stationName,postName,postId,serviceStarttime,serviceEndtime,signType,id) {
            serviceStarttime = serviceStarttime.replace(/\//g,'-');
            serviceEndtime = serviceEndtime.replace(/\//g,'-');
            lineId = parseInt(lineId);
            if(lineId<10){
                lineId = "0"+lineId;
            }
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + sign,
                {uuid:uuid,username:username,lineId:lineId,stationId:stationId,lineName:lineName,stationName:stationName,postName:postName
                        ,postId:postId,serviceStarttime:serviceStarttime,serviceEndtime:serviceEndtime,signType:signType,id:id},
                postCfg
            )
        },

        //拉取志愿者预约信息
        getSignList: function (uuid,username,type) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getSignList,
                {uuid:uuid,username:username,type:type},
                postCfg
            )
        },
        //拉取志愿者预约信息
        bespeakList: function (uuid) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };

            return $http.post(
                apiPath_ser + bespeakList,
                {uuid:uuid},
                postCfg
            )
        },
        //排行榜接口
        getRank: function (uuid,rankType) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + rank,
                {uuid:uuid,rankType:rankType},
                postCfg
            )
        },

        //预约统计接口
        signStatistics: function (uuid,year,month,statisticsType) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + signStatistics,
                {uuid:uuid,year:year,month:month,statisticsType:statisticsType},
                postCfg
            )
        },

        //提交订单
        createOrder: function (uuid,username,orderDetail) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + createCancelOrder,
                {uuid:uuid,username:username,orderDetail:orderDetail},
                postCfg
            )
        },
        //取消订单
        createCancelOrder: function (uuid,username,orderId) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + createCancelOrder,
                {uuid:uuid,username:username,orderId:orderId},
                postCfg
            )
        },
        //获取系统时间
        getSeverTime: function (uuid) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getSeverTime,
                {uuid:uuid},
                postCfg
            )
        },
        //班车信息
        getbus: function (uuid,pagestart) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getbus,
                {uuid:uuid,type : "001",pagemax:"20",pagestart:pagestart},
                postCfg
            )
        },
        //获取食堂列表
        getCanteenList: function (uuid) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getCanteenList,
                {uuid:uuid},
                postCfg
            )
        },
        //点餐预定
        getEverydaySupply: function (uuid) {
            var cId = localStorage.getItem("canteenId");
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getEverydaySupply,
                {uuid:uuid,canteenId:cId},
                postCfg
            )
        },
        //获取用户订单
        getOrderList: function (uuid,username) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getOrderList,
                {uuid:uuid,username:username,statse:""},
                postCfg
            )
        },

        //志愿者
        getSignServiceInfo: function (uuid,username) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getSignServiceInfo,
                {uuid:uuid,username : username},
                postCfg
            )
        },

        //wifi下载单接口
        getWifiDownloadUrl: function (uuid) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getWifiDownloadUrl,
                {uuid:uuid},
                postCfg
            )
        },

        //获取公司以及部门相关信息
        getComputerNameAndDept: function (uuid,username) {
            console.log(apiPath_ser+getOrganizations,uuid,username);
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getOrganizations,
                {uuid:'70a0207b-d296-44d6-a260-289792eb362d',username : "xunnuo00000"},
                postCfg
            )
        },

        //获取线路
        getLineMessage: function (uuid,username) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getLines,
                {uuid:uuid,username : username},
                postCfg
            )
        },

        //获取站点信息
        getLineStationMessage: function (uuid,username,stationID) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getStations,
                {uuid:uuid,username : username,lineId:stationID},
                postCfg
            )
        },

        //电脑报修
        submitComputerMessage:function (data) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + submitMaintenance,
                data,
                postCfg
            )
        },
        //送水服务
        submitWaterOrder:function (data) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + submitWaterOrder,
                data,
                postCfg
            )
        },
        //送水服务历史记录
        getWaterOrderList:function (data) {
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            return $http.post(
                apiPath_ser + getWaterOrderList,
                data,
                postCfg
            )
        },



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
    .factory('noSigns', function ($http) {

        // var apiPath_ser =  "http://192.168.16.240:8080/metropolis-user";
        // var apiPath_ser =  "http://192.168.17.88:8080";
        // var apiPath_ser =  "http://140.206.138.190:5004/meeting_manage/";
        // var apiPath_ser =  "http://192.168.17.20:8080/meeting_manage/";
        //地址
        var apiPath_ser =  localStorage.getItem("apiPath");
        var NEW_URL = localStorage.getItem("apiPath");

        // var apiPath_ser =  "http://zh909.metrolife.mobi:8080/meeting-manage/";
        //
        // var NEW_URL = "http://zh909.metrolife.mobi:8080/meeting-manage/";
        // var NEW_URL = "http://140.206.138.190:5004/meeting_manage/";
        // var NEW_URL = "http://192.168.17.20:8080/meeting_manage/";

        var getDdFromAPP = NEW_URL+"mobile/getDdFromAPP";
        var getDdUserFromAPP = NEW_URL+"mobile/getDdUserFromAPP";
        // var getDdFromAPP = "http://140.206.138.190:5030/909/mobile/getDdFromAPP";
        // var getDdUserFromAPP = "http://140.206.138.190:5030/909/mobile/getDdUserFromAPP";

        return {
            //已完成的预约后显示反馈信息

            signNo: function () {
                postCfg = {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (data) {
                        return $.param(data);
                    }
                };
                $http.get(
                    getDdFromAPP,
                    {},
                    postCfg
                ).then(function (result) {  //正确请求成功时处理
                    // var jsonResultString = JSON.stringify(result.data);
                    var jsonResult = result.data;
                    if(jsonResult.status == "success"){
                        var array = jsonResult.message;
                        if(array.length>0){
                            dd.config.timeStamp = array[0].timeStamp;
                            dd.config.nonceStr = array[0].nonceStr;
                            dd.config.signature = array[0].signature;
                            var access_token = array[0].accesstoken;
                            dd.runtime.permission.requestAuthCode({
                                corpId: "ding38c46ef492978e7335c2f4657eb6378f",
                                onSuccess: function (result) {
                                    var code = result.code;

                                    $http.get(
                                        getDdUserFromAPP+"?access_token="+access_token+"&code="+code,
                                        {},
                                        postCfg
                                    )
                                        .then(function (result) {  //正确请求成功时处理
                                            // var jsonResultString = JSON.stringify(result.data);
                                            var dataJson = result.data;

                                            if(dataJson.resultCode == 100){
                                                localStorage.setItem("username",dataJson.username);
                                                localStorage.setItem("uuid",dataJson.uuid);
                                                localStorage.setItem("name",dataJson.name);
                                                localStorage.setItem("isSign","1");
                                            }else if(dataJson.resultCode == 101){
                                                alert("access_token 获取失败");
                                            }else if(dataJson.resultCode == 102){
                                                alert("ticket 获取失败");
                                            }else if(dataJson.resultCode == 103){
                                                alert("access_token 或 code错误");
                                            }else if(dataJson.resultCode == 200){
                                                alert("参数错误");
                                            }else if(dataJson.resultCode == 500){
                                                alert("未查询到工号信息");
                                            }

                                        }).catch(function (result) { //捕捉错误处理
                                        alert(JSON.stringify(result));
                                    });
                                    /*{
                                        code: 'hYLK98jkf0m' //string authCode
                                    }*/
                                },
                                onFail: function (err) {
                                    alert("关联账号失败");
                                },
                            });
                        }
                    }else{
                        alert("关联账号失败");

                    }

                }).catch(function (result) { //捕捉错误处理
                    alert(JSON.stringify(result));
                });
            },
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
  }])

