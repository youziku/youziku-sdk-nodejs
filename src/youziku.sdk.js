/**
 *@description Youziku Nodejs SDK
 *@author jamesbing.
 *@description use axios module
 */

exports.youzikuClient = youzikuClient;

/**
 * @description import modules
 * @author jamesbing
 */
var axios = require('axios');

/**
 * @description youzikuClient
 * @author jamesbing
 */
function youzikuClient(apiKey, host) {

    //global setting
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    var client = {
        ApiKey: apiKey,
        Host: "http://service.youziku.com",
        /**
         * Single Tag
         */
        getFontFace: function (jsonObj, callback) {
            yzk_getFontFace(this.ApiKey, jsonObj, this.Host + '/webFont/getFontFace', callback);
        },
        /**
         * Single Tag [Base64String]
         */
        getWoffBase64StringFontFace: function (jsonObj, callback) {
            yzk_getFontFace(this.ApiKey, jsonObj, this.Host + '/webFont/getWoffBase64StringFontFace', callback);
        },
        /**
        * Batch All Tags
        */
        getBatchFontFace: function (jsonObj, callback) {
            yzk_getBatchFontFace(this.ApiKey, jsonObj, this.Host + '/batchWebFont/getBatchFontFace', callback);
        },
        /**
        * Batch Woff Tags
        */
        getBatchWoffFontFace: function (jsonObj, callback) {
            yzk_getBatchFontFace(this.ApiKey, jsonObj, this.Host + '/batchWebFont/getBatchWoffFontFace', callback);
        },
        /**
         * Batch CustomPath
         */
        createBatchWoffWebFontAsync: function (jsonObj, callback) {
            yzk_createBatchWoffWebFontAsync(this.ApiKey, jsonObj, this.Host + '/batchCustomWebFont/createBatchWoffWebFontAsync', callback);
        }
    };

    if (host) {
        client.Host = host;
    }
    return client;
};


/**
*@description Custom path interface method
*@author jamesbing 
*/
function yzk_createBatchWoffWebFontAsync(apikey, obj, path, callback) {
    var newObj = { ApiKey: apikey };
    newObj["Datas"] = obj.Datas;
    yzk_requestCommon(path, newObj, function (datas) {
        callback(datas);
    });
}

/**
 *@description  Universal method for multi label interface
 *@author jamesbing 
 */
function yzk_getBatchFontFace(apikey, obj, path, callback) {
    var newObj = { ApiKey: apikey };
    newObj["Tags"] = obj.Tags;
    yzk_requestCommon(path, newObj, function (datas) {

        callback(datas);
    });
}

/**
 *@description Single label interface universal method
 *@author jamesbing 
 */
function yzk_getFontFace(apikey, obj, path, callback) {
    obj["ApiKey"] = apikey;
    yzk_requestCommon(path, obj, function (data) {
        if (obj.FontFamily) {
            yzk_privateReplaceFontfamily(data, obj.FontFamily);
        }
        callback(data);
    });
}

/**
 *@description ReplaceFontfamily
 *@author jamesbing 
 */

function yzk_privateReplaceFontfamily(data, newFontfamily) {
    if (!newFontfamily) return;
    try {
        data.FontFace = data.FontFace.replace(data.FontFamily, newFontfamily);
        if (data.Tag) {
            data.FontFace = data.FontFace.replace(data.FontFamily, newFontfamily);
        }
        data.FontFamily = newFontfamily;
    } catch (e) {

    }
}

/**
 *@description youziku request common method
 *@author jamesbing 
 */
function yzk_requestCommon(path, obj, callback) {

    var rq = axios.post(path, obj).then(function (res) {
        if (callback) {
            callback(res.data);
        }

    }).catch(function (err) {
        console.log(err);
    })

}