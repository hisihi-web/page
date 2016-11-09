/**
 * Created by hisihi on 2016/11/9.
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
                        active = opts.activeClass,
                        str = '',
                        str1='',
                        list='',
                        i;
                    //默认第一页是选中状态
                    str1 = '<li><a href="javascript:" class="'+ active +'">1</a></li>';
                    //判断总页数是否合法
                    if (len > 1 && len < num+1) {
                        //从第二页开始循环增加页面，始终默认展示有第一页
                        for (i = 2; i < len + 1; i++) {
                            str += '<li><a href="javascript:">' + i + '</a></li>';
                        }
                    }else if(len > num){
                        for (i = 2; i < num + 1; i++) {
                            str += '<li><a href="javascript:">' + i + '</a></li>';
                        }
                    }
                    //判断是否存在后一页按钮，如果有，则展示末页按钮
                    if(opts.hasNext){
                        list +='<div class="next-page">'+ opts.next+ '</div>';
                    }
                    //判断是否有末页按钮
                    if(opts.hasLastPage){
                        list +='<div class="last-btn">' + opts.lastPage + '</div>';
                    }
                    //将默认展示的第一页和剩余页面拼接起来
                    list  +='<ul class="page-list">'+ str1 + str +'</ul>';
                    //判断页面是否有首页按钮
                    if(opts.hasFirstPage){
                        list +='<div class="first-btn">'+ opts.firstPage +'</div>';
                    }
                    //判断页面是否有前一页按钮
                    if(opts.hasPrv) {
                        list +='<div class="first-btn">'+ opts.page +'</div>';
                    }

                    $this.html(list).off("click");//防止插件重复调用时，重复绑定事件

                    $this.on('click', '.next', function () {
                        var pageshow = parseInt($('.' + active).html()),
                            nums, flag,
                            a = num % 2;
                        if(a == 0){
                            //偶数
                            nums = num;
                            flag = true;
                        }else if(a == 1){
                            //奇数
                            nums = (num+1);
                            flag = false;
                        }
                        if(pageshow >= l) {
                            return;
                        }else if(pageshow > 0&&pageshow <= nums/2){
                            //最前几项
                            $('.' + active).removeClass(active).parent().next().find('a').addClass(active);
                        }else if((pageshow > l-nums/2&&pageshow < l&&flag==false)||(pageshow > l-nums/2-1&&pageshow < l&&flag==true)){
                            //最后几项
                            $('.' + active).removeClass(active).parent().next().find('a').addClass(active);
                        }else{
                            $('.' + active).removeClass(active).parent().next().find('a').addClass(active);
                            fpageShow(pageshow+1);
                        }
                        opts.callBack(pageshow+1);
                    });
                    obj.on('click', '.prv', function () {
                        var pageshow = parseInt($('.' + active).html());
                        var nums = odevity(n);
                        if (pageshow <= 1) {
                            return;
                        }else if((pageshow > 1&&pageshow <= nums/2)||(pageshow > l-nums/2&&pageshow < l+1)){
                            //最前几项或最后几项
                            $('.' + active).removeClass(active).parent().prev().find('a').addClass(active);
                        }else {
                            $('.' + active).removeClass(active).parent().prev().find('a').addClass(active);
                            fpageShow(pageshow-1);
                        }
                        opts.callBack(pageshow-1);
                    });

                    obj.on('click', '.first', function(){
                        var activepage = parseInt($('.' + active).html());
                        if (activepage <= 1){
                            return
                        }//当前第一页
                        opts.callBack(1);
                        fpagePrv(0);
                    });
                    obj.on('click', '.last', function(){
                        var activepage = parseInt($('.' + active).html());
                        if (activepage >= l){
                            return;
                        }//当前最后一页
                        opts.callBack(l);
                        if(l>n){
                            fpageNext(n-1);
                        }else{
                            fpageNext(l-1);
                        }
                    });

                    obj.on('click', 'li', function(){
                        var $this = $(this);
                        var pageshow = parseInt($this.find('a').html());
                        var nums = odevity(n);
                        opts.callBack(pageshow);
                        if(l>n){
                            if(pageshow > l-nums/2&&pageshow < l+1){
                                //最后几项
                                fpageNext((n-1)-(l-pageshow));
                            }else if(pageshow > 0&&pageshow < nums/2){
                                //最前几项
                                fpagePrv(pageshow-1);
                            }else{
                                fpageShow(pageshow);
                            }
                        }else{
                            $('.' + active).removeClass(active);
                            $this.find('a').addClass(active);
                        }
                    });

                }
            )}
    });

    var defaluts = {
        totalPages: 9,//总页数
        liNums: 9,//分页的数字按钮数(建议取奇数)
        activeClass: 'active' ,//active类
        firstPage: '首页',//首页按钮名称
        lastPage: '末页',//末页按钮名称
        prv: '?',//前一页按钮名称
        next: '?',//后一页按钮名称
        hasFirstPage: true,//是否有首页按钮
        hasLastPage: true,//是否有末页按钮
        hasPrv: true,//是否有前一页按钮
        hasNext: true,//是否有后一页按钮
        callBack : function(page){
            //回掉，page选中页数
        }
    };

})(jQuery);