(function($) {
    var Qrcode = function(tempBtn) {
        var _this_ = this;
        var isWeiboWebView = /__weibo__/.test(navigator.userAgent);

        if (isWeiboWebView) {
            if (window.WeiboJSBridge) {
                _this_.bridgeReady(tempBtn);
            } else {
                document.addEventListener('WeiboJSBridgeReady', function() {
                    _this_.bridgeReady(tempBtn);
                });
            }
        } else {
            _this_.nativeReady(tempBtn);
        }
    };

    Qrcode.prototype = {
        nativeReady: function(tempBtn) {
            $('[node-type=jsbridge]',tempBtn).on('click',function(e){
                e.stopPropagation();
            });

            $(tempBtn).bind('click',function(e){
                $(this).find('input[node-type=jsbridge]').trigger('click');
            });

            $(tempBtn).bind('change', this.getImgFile);
        },
        bridgeReady: function(tempBtn) {
            $(tempBtn).bind('click', this.weiBoBridge);
        },
        weiBoBridge: function() {
            window.WeiboJSBridge.invoke('scanQRCode', null, function(params,userService,$rootScope) {
                //得到扫码的结果
                $('.result-qrcode').append(params.result + '<br/>');
                var str = localStorage.getItem("name");
                str=encodeURI(encodeURI(str));
                var  result =  data
                    // + "&supervisor="+str
                ;
                console.log(result);
                window.location.href = result;
            });
        },
        getImgFile: function() {
            var isDomNum = 0;
            var _this_ = this;
            var inputDom = $(this).find('input[node-type=jsbridge]');
            var inputDom2 = $(this).find('input[node-type=jsbridge2]');
            var inputDom1 = $(this).find('input[node-type=jsbridge1]');
            var imgFile;
            // if(inputDom != null && inputDom != "" && inputDom != undefined){
            //     isDomNum = 0;
                imgFile = inputDom[0].files;
            // }else if(inputDom2 != null && inputDom2 != "" && inputDom2 != undefined){
            //     isDomNum = 2;
            //     imgFile = inputDom2[0].files;
            // }else if(inputDom1 != null && inputDom1 != "" && inputDom1 != undefined){
            //     isDomNum = 1;
            //     imgFile = inputDom1[0].files;
            // }

            var oFile = imgFile[0];
            var oFReader = new FileReader();
            var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

            if (imgFile.length === 0) {
                return;
            }

            if (!rFilter.test(oFile.type)) {
                alert("选择正确的图片格式!");
                return;
            }

            oFReader.onload = function(oFREvent,userService,$rootScope) {

                qrcode.decode(oFREvent.target.result);
                qrcode.callback = function(data) {
                    //得到扫码的结果
                    $('.result-qrcode').append(data + '<br/>');
                    // if(isDomNum == 0){
                        var str = localStorage.getItem("name");
                        str=encodeURI(encodeURI(str));
                        var  result =  data
                            // + "&supervisor="+str
                        ;
                        console.log(result);
                        window.location.href = result;
                    // }else if(isDomNum == 1){
                    //     localStorage.setItem("enterId",data)
                    // }else{
                    //     localStorage.setItem("quitId",data)
                    // }
                };
            };

            oFReader.readAsDataURL(oFile);
        },
        destory: function() {
            $(tempBtn).off('click');
        }
    };

    Qrcode.init = function(tempBtn) {
        var _this_ = this;
        tempBtn.each(function() {
            new _this_($(this));
        });
    };
    window.Qrcode = Qrcode;
})(window.Zepto ? Zepto : jQuery);
