/**
 * 
 * @authors liubin
 * @date    2017-12-01 15:20:58
 * @version $1.0
 */

function ProgressNum(opts) {
    var default_opts = {
        selector:'',                    // 显示数字的dom选择器
        from:0,                         // 开始的数字
        to:100,                         // 结束的数字
        speed:[0,4],                    // 每次增加的数字大小，取数组里面的随机数
        frequency:[800,1500],           // 每次递增数据的频率 (毫秒)
        duration: 5000,                 // 从开始数字到结束数字花费的时间 (毫秒)
        progress:function(){},          // 每次递增时的回调函数
        done:function(){}               // 递增到最大值时的回调函数
    };
    opts = typeof opts=="string" ? $.extend({},default_opts, {selector:opts}) : $.extend({}, default_opts, opts);
    this.opts = opts;
    this.val = opts.from;               // 当前的数字值
    this.node = $(opts.selector);
}

// 根据opts.speed随机获取递增的数字大小
ProgressNum.prototype.getSpeedRandom = function(randomArr){
    var min = randomArr[0],
        max = randomArr[1],
        randomNum = Math.random()*(max-min)+min;
    // console.log(randomNum);
    return randomNum;
};

// 开始增加数字
ProgressNum.prototype.start = function(){
    var that = this,
        opts = this.opts,
        from = opts.from,
        speed = opts.speed,
        frequency = opts.frequency;
    if( !opts.selector ){
        console.error('opts.selector is not defined');
        return false;
    }
    this.circle = setInterval(function(){
        from += that.getSpeedRandom(speed);
        if( from>=100 ){
            from=100;
            clearInterval(that.circle);
        }
        that.val = from;
        that.node.html(that.val.toFixed(2));
        opts.progress && opts.progress(that.val.toFixed(2));
    }, that.getSpeedRandom(frequency));
};

// 结束增加数字并迅速加到最大值
ProgressNum.prototype.end = function(){
    var that = this,
        opts = this.opts,
        speed = opts.speed;
    if( !this.circle ) return false;
    clearInterval(this.circle);
    var endCircle = setInterval(function(){
        that.val += that.getSpeedRandom([0,2]);
        if( that.val>=100 ){
            that.val=100;
            clearInterval(endCircle);
        }
        that.node.html(that.val.toFixed(2));
        opts.progress && opts.progress(that.val.toFixed(2));
        that.val>=100 && opts.done && opts.done();
    }, 10);
};

// 销毁
ProgressNum.prototype.destroy = function(){
    var that = this,
        opts = this.opts,
        speed = opts.speed;
    if( this.circle ) clearInterval(this.circle);
    that.node.html(opts.from.toFixed(2));
};