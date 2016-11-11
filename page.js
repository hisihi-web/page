/**
 * Created by panxiao on 2016/11/9.
 */
(function ($) {

    $.fn.extend({
        "page":function(options){
            //do something
            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each (function (){  //这里的this就是jquery对象，这里return是为了支持链式调用
                    // 遍历所有需要展示的dom，当调用page()插件的是一个集合的时候
                    var $this = $(this),//获取当前dom的jquery对象，这里的this是当前循环的dom
                        len = opts.totalPages,
                        num = opts.liNums,
                        select = opts.selectClass,
                        str = '',
                        str1='',
                        strPrv = '',
                        strFirst = '',
                        strNext='',
                        strLP='',
                        list='',
                        i;
                    //默认第一页是选中状态
                    str1 ='<li><a href="javascript:" class="'+ select +'">1</a></li>';
                    //判断总页数是否合法
                    //当页面数小于分页数，排除第一项
                    //排除第一页
                    if (len > 1 && len < num+1) {
                        for (i = 2; i < len + 1; i++) {
                            str += '<li><a href="javascript:">' + i + '</a></li>';
                        }
                    //当总页面大于页面数循环
                    }else if(len > num){
                        for (i = 2; i < num + 1; i++) {
                            str += '<li><a href="javascript:">' + i + '</a></li>';
                        }
                    }
                    //判断页面是否有前一页按钮
                    if(opts.hasPrv) {
                        strPrv ='<li><div class="first-sec">'+ opts.prv +'</div></li>';
                    }
                    //判断是否存在后一页按钮，如果有，则展示末页按钮
                    if(opts.hasNext){
                        strNext ='<li><div class="last-sec">'+ opts.next+ '</div></li>';
                    }
                    //判断页面是否有首页按钮
                    if(opts.hasFirstPage){
                        strFirst ='<li><div class="first-btn">'+ opts.firstPage +'</div></li>';
                    }
                    //判断是否有末页按钮
                    if(opts.hasLastPage){
                        strLP ='<li><div class="last-btn">' + opts.lastPage + '</div></li>';
                    }

                    //将默认展示的第一页和剩余页面拼接起来
                    list  = '<ul class="page-list">' + strPrv + strFirst + str1 + str + strLP + strNext +'</ul>';


                    $this.html(list).off("click");//防止插件重复调用时，重复绑定事件

                    //点击跳转指定页面
                    //跳转页面数字变化颜色变化
                    $this.on('click','li',function () {
                        var  str ='';
                        str ='<div class=""></div>';

                        return str;
                    });

                    //点击后一页按钮，触发跳转前一页事件
                    //$this.on('click', '.last-sec', function () {
                    //    var pageshow = parseInt($('.' + select).html()),
                    //        nums,
                    //        flag,
                    //        a = num % 2;
                    //    //取余
                    //    if(a == 0){
                    //        //偶数
                    //        nums = num;
                    //        flag = true;
                    //    }else if(a == 1){
                    //        //奇数
                    //        nums = (num+1);
                    //        flag = false;
                    //    }
                    //    if(pageshow >= len) {
                    //        return;
                    //    }else if(pageshow > 0&&pageshow <= nums/2){
                    //        //最前几项
                    //        $('.' + select).removeClass(select).parent().next().find('a').addClass(select);
                    //    }else if((pageshow > len-nums/2&&pageshow < len&&flag==false)||(pageshow > len-nums/2-1&&pageshow < len&&flag==true)){
                    //        //最后几项
                    //        $('.' + select).removeClass(select).parent().next().find('a').addClass(select);
                    //    }else{
                    //        $('.' + select).removeClass(select).parent().next().find('a').addClass(select);
                    //        //调用页面方法
                    //        fpageShow(pageshow+1);
                    //    }
                    //    opts.callBack(pageshow+1);
                    //});

                    //点击前一页面按钮，触发跳转后一页事件
                    //$this.on('click', '.first-sec', function () {
                    //    var pageshow = parseInt($('.' + select).html());
                    //    var nums = odevity(num);
                    //    if (pageshow <= 1) {
                    //        return;
                    //    }else if((pageshow > 1&&pageshow <= nums/2)||(pageshow > len-nums/2&&pageshow < len+1)){
                    //        //最前几项或最后几项
                    //        $('.' + select).removeClass(select).parent().prev().find('a').addClass(select);
                    //    }else {
                    //        $('.' + select).removeClass(select).parent().prev().find('a').addClass(select);
                    //        fpageShow(pageshow-1);
                    //    }
                    //    opts.callBack(pageshow-1);
                    //});

                    //页面展示
                    // function fpageShow (){
                    //
                    // };

                    //判断liNums的奇偶性
                    function odevity(n){
                        var a = n % 2;
                        if(a == 0){
                            //偶数
                            return n;
                        }else if(a == 1){
                            //奇数
                            return (n+1);
                        }
                    };



                }
            )}
    });

    var defaluts = {
        totalPages: 15,//总页数
        liNums: 5,//分页展示多少页(建议取奇数)
        selectClass: 'select' ,//select选中
        firstPage: '首页',//首页按钮名称
        lastPage: '末页',//末页按钮名称
        prv: '《',//前一页按钮名称
        next: '》',//后一页按钮名称
        hasFirstPage: false,//是否有首页按钮
        hasLastPage: false,//是否有末页按钮
        hasPrv: false,//是否有前一页按钮
        hasNext: false,//是否有后一页按钮
        callBack : function(page){
            //回掉，page选中页数
        }
    };

})(jQuery);