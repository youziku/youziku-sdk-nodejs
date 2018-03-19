/**
 *@description Youziku Nodejs SDK
 *@author gaobingbing
 *@description use axios module
 *@lastModifyDate 2018-3-19
 */

exports.youzikuClient = youzikuClient;

/**
 * @description import modules
 * @author gaobingbing
 */
var axios = require('axios');

/**
 * @description youzikuClient
 * @author gaobingbing
 */
function youzikuClient(apiKey, host) {

    //global setting
    axios.defaults.headers.post['Content-Type'] = 'application/json';


    //网络模块
    function NetModuleImpl() {
        /**
         *@description youziku request common method
         *@author gaobingbing 
         */
        this.request = function (path, obj, callback) {

            var rq = axios.post(path, obj).then(function (res) {

                if (callback) {
                    callback(res.data);
                }

            }).catch(function (err) {
                console.log(err);
            })

        }
    }

    //核心模块
    function CoreModuleImpl() {


        /**
         *@description Single label interface universal method
         *@author gaobingbing 
         */
        this.getFontFace = function (apikey, obj, path, callback) {
            obj["ApiKey"] = apikey;
            youzikuConfig.NetModule.request(path, obj, function (data) {

                callback(data);
            });
        }


        /**
         *@description  Universal method for multi label interface
         *@author gaobingbing 
         */
        this.getBatchFontFace = function (apikey, obj, path, callback) {
            var newObj = { ApiKey: apikey };
            newObj["Tags"] = obj.Tags;
            youzikuConfig.NetModule.request(path, newObj, function (datas) {

                callback(datas);
            });
        }

        /**
              *@description Custom path interface method
              *@author gaobingbing 
              */
        this.getCustomPathBatchFontface = function (apikey, obj, path, callback) {
            var newObj = { ApiKey: apikey };
            newObj["Datas"] = obj.Datas;
            youzikuConfig.NetModule.request(path, newObj, function (datas) {
                callback(datas);
            });
        }


    };


    //内部模块
    function HandlerModuleImpl() {
        //GetFontfaceCommon
        this.getFontface = function (jsonObj, apiKey, url) {

            return new Promise(function (resolve, reject) {
                try {
                    youzikuConfig.CoreModule.getFontFace(apiKey, jsonObj, url, function (result) {
                        resolve(result);
                    });
                }
                catch (ex) {
                    reject(ex);
                }
            });

        };

        this.getBatchFontface = function (jsonObj, apiKey, url) {
            return new Promise(function (resolve, reject) {
                try {
                    youzikuConfig.CoreModule.getBatchFontFace(apiKey, jsonObj, url, function (result) {
                        resolve(result);
                    });
                }
                catch (ex) {
                    reject(ex);
                }
            });
        }
        /**
               *@description Custom path interface method
               *@author gaobingbing 
               */
        this.getCustomPathBatchFontface = function (jsonObj, apikey, url) {
            return new Promise(function (resolve, reject) {
                try {
                    youzikuConfig.CoreModule.getCustomPathBatchFontface(apiKey, jsonObj, url, function (result) {
                        resolve(result);
                    });
                }
                catch (ex) {
                    reject(ex);
                }
            });
        }
    }


    //有字库配置项
    let youzikuConfig = {
        CoreModule: new CoreModuleImpl(),
        HandlerModule: new HandlerModuleImpl(),
        NetModule: new NetModuleImpl()
    };

    let client = {
        ApiKey: apiKey,
        Host: "http://service.youziku.com",
        /**
         * Single (全格式)
         */
        getFontFace: function (jsonObj) {
            let url = this.Host + '/webFont/getFontFace'
            return youzikuConfig.HandlerModule.getFontface(jsonObj, this.ApiKey, url);
        },
        /**
         * Single Tag (Base64String)
         */
        getWoffBase64StringFontFace: function (jsonObj) {
            let url = this.Host + '/webFont/getWoffBase64StringFontFace'
            return youzikuConfig.HandlerModule.getFontface(jsonObj, this.ApiKey, url);
        },
        /**
        * Batch (全格式)
        */
        getBatchFontFace: function (jsonObj, callback) {
            let url = this.Host + '/batchWebFont/getBatchFontFace';
            return youzikuConfig.HandlerModule.getBatchFontface(jsonObj, this.ApiKey, url);
        },
        /**
        * Batch (Woff格式)
        */
        getBatchWoffFontFace: function (jsonObj, callback) {
            let url = this.Host + '/batchWebFont/getBatchWoffFontFace';
            return youzikuConfig.HandlerModule.getBatchFontface(jsonObj, this.ApiKey, url);
        },
        /**
         * CustomPath (Woff格式)
         */
        createBatchWoffWebFontAsync: function (jsonObj, callback) {

            let url = this.Host + '/batchCustomWebFont/createBatchWoffWebFontAsync';
            return youzikuConfig.HandlerModule.getCustomPathBatchFontface(jsonObj, this.ApiKey, url);
        },

        /**
         * CustomPath (全格式)
         */
        createBatchWebFontAsync: function (jsonObj, callback) {
            let url = this.Host + '/batchCustomWebFont/createBatchWebFontAsync';
            return youzikuConfig.HandlerModule.getCustomPathBatchFontface(jsonObj, this.ApiKey, url);
        }
    };

    if (host) {
        client.Host = host;
    }
    return client;
};


