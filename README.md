# 一、介绍

## 1．SDK适用语言<br/>
SDK适用于在Nodejs中调用<a  target="_blank"  href="http://service.youziku.com">service.youziku.com</a>中的所有api<br/>

## 2.工作流程<br/>　　
   ①用户用后端程序调用SDK，提交动态内容到有字库的子集化(裁切)服务器<br/>
   ②服务器接收到所提交内容后，根据内容裁剪出对应的小字体文件，并转换为4种通用字体格式（woff、eot、ttf、svg）<br/>
   ③服务器将所有字体文件按用户指定的地址上传至阿里云CDN<br/>
   ④用户使用字体时，用自定义的路径，参照@font-face格式来拼出能兼容所有浏览器的@font-face语句<br/>

## 3.@font-face语句<br/>
SDK的返回值主要内容是@font-face语句，@font-face语句是CSS3中的一个功能模块，是所有浏览器天然支持的CSS语句。它的作用是将一个远程字体文件加载到当前页面，并且定义成一个字体，前端页面能够像使用本地字体一样使用该字体。@font-face语句是实现在线字体效果的核心代码。<br/>

## 4. 显示字体效果
用户<a href="#user-content-4自定义路径生成模式">自定义字体存放路径</a>，当需要显示字体效果时，可以根据自己所定义的路径<a href="http://service.youziku.com/index.html#format" target="_blank" style="color: #ff7e00;">拼组出@font-face语句</a>，然后将语句输出到前端页面，即可使内容显示字体效果。


# 二、引用
## npm安装
``` npm
npm install youziku@7.0.0
```

# 三、Sample
## 1.初始化YouzikuClient
``` node
var youziku =require("youziku");
var youzikuClient = new youziku.youzikuClient("xxxxxx"); //apikey
```

## 2.调用接口(接口分为5种模式，用户可任选一种)
### 2.1.敏捷模式-多标签woff接口：CreateBatchWoffWebFontAsync()
#### 备注：敏捷模式接口可以被程序异步调用，程序调用后可以直接向下执行，不需要等待返回值
#### &emsp;&emsp;&emsp;当需要显示字体效果时，可以根据自己所定义的路径<a href="http://service.youziku.com/index.html#format" target="_blank" style="color: #ff7e00;">拼组出@font-face语句</a>，然后将语句输出到前端页面，即可使内容显示字体效果。
``` node
var cdata = {
    Datas: []
};

cdata.Datas.push({ AccessKey: 'xxxxxx', Content: '有字库，让中文跃上云端！自定义路径接口', Url: 'youziku/test1' });
cdata.Datas.push({ AccessKey: 'xxxxxx', Content: '有字库，让中文跃上云端，中国文字之美！Woff格式自定义路径接口', Url: 'youziku/test2' });

//1.捕获请求完成回调
youzikuClient.createBatchWoffWebFontAsync(cdata, function (result) {
    console.log(result.Code);
    console.log(result.ErrorMessage); 
})
//2.不捕获请求完成回调
youzikuClient.createBatchWoffWebFontAsync(cdata);

```


### 2.2 语句绑定模式-单标签接口：GetFontface()
#### 备注:直接返回所有格式的@fontface
``` node
var entity={
AccessKey:'xxxxxx',
Content:'有字库，让中文跃上云端！'
};

youzikuClient.getFontFace(entity, function (result) {
    console.log(result.FontFamily);
    console.log(result.FontFace);
    console.log(result.Code);
    console.log(result.Tag);
    console.log(result.ErrorMessage);
});

```
### 2.3 语句绑定模式-单标签Base64接口：GetWoffBase64StringFontFace()
#### 备注：直接返回Base64流（woff流）的@fontface
``` node
var entity={
AccessKey:'xxxxxx',
Content:'有字库，让中文跃上云端！'
};

youzikuClient.getWoffBase64StringFontFace(entity, function (result) {
    console.log(result.FontFamily);
    console.log(result.FontFace);
    console.log(result.Code);
    console.log(result.Tag);
    console.log(result.ErrorMessage);
});
```

### 2.4 语句绑定模式-多标签接口：GetBatchFontFace()
#### 备注：直接返回所有格式的@fontface;可传递多个标签和内容一次生成多个@fontface
``` node
var data = {
    Tags: []
};

data.Tags.push({ AccessKey: 'xxxxxx', Content: '有字库，让中文跃上云端！', Tag: '.test1' });
data.Tags.push({ AccessKey: 'xxxxxx', Content: '有字库，让中文跃上云端,中国文字之美！', Tag: '#id2' });


youzikuClient.getBatchFontFace(data, function (result) {
    var length = result.FontfaceList.length;
    for (var i = 0; i < length; i++) {
        console.log(result.FontfaceList[i].Tag);
        console.log(result.FontfaceList[i].FontFace);
        console.log(result.FontfaceList[i].FontFamily);
    
    }
        console.log(result.Code);
        console.log(result.ErrorMessage);
});

```
### 2.5 语句绑定模式-多标签woff格式接口：GetBatchWoffFontFace ()
#### 备注：直接返回仅woff格式的@fontface
``` node
var woffdata = {
    Tags: []
};

woffdata.Tags.push({ AccessKey: 'xxxxxx', Content: '有字库，让中文跃上云端！Woff格式', Tag: '.test1' });
woffdata.Tags.push({ AccessKey: 'xxxxxx', Content: '有字库，让中文跃上云端,中国文字之美！Woff格式', Tag: '.test2' });


youzikuClient.getBatchWoffFontFace(woffdata, function (result) {
    var length = result.FontfaceList.length;
    for (var i = 0; i < length; i++) {
        console.log(result.FontfaceList[i].Tag);
        console.log(result.FontfaceList[i].FontFace);
        console.log(result.FontfaceList[i].FontFamily);

    }
    console.log(result.Code);
    console.log(result.ErrorMessage);
});
```


