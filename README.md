# ProgressNum 模拟上传进度条

一个模拟上传进度条的插件，依赖jquery(因为公司的项目中引入了jquery，所以直接用上了，要改成原生js也简单，自己手动改一下极好)。

![gif](https://user-images.githubusercontent.com/5274428/33871282-d133c426-df4c-11e7-9418-d8cf79b1f364.gif)

## Usage

```js
// ProgressNum可以传入一个DOM选择器，也可以传入一个对象，具体看下面的options
var progress = new ProgressNum('**');

 // 调用start方法开始跑进度；
progress.start();

// 调用接口以base64开始上传图片数据
$.ajax({
    url:"upload.php",
    data:{
        img: base64
    }
}).done(function(res){
    // 接口返回后调用end方法，快速将进度跑到100%
    progress.end();  
});
```

## options
```js
@param {String} selector  // 如果传的参数是一个字符串，会识别成一个DOM选择器
@param {Object} options  // 如果传的参数是一个对象
    - selector:'',                    // 显示数字的dom选择器
    -  from:0,                         // 开始的数字
    -  to:100,                         // 结束的数字
    -  speed:[0,4],                    // 每次增加的数字大小，取数组里面的随机数
    -  frequency:[800,1500],           // 每次递增数据的频率 (毫秒)
    -  duration: 5000,                 // 从开始数字到结束数字花费的时间 (毫秒)
    -  progress:function(){},          // 每次递增时的回调函数
    -  done:function(){}               // 递增到最大值时的回调函数

```


