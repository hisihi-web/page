/**
 * Created by jimmy-jiang on 2016/11/11.
 */
(function ($) {
    $.fn.extend({
        "page1": function (options) {
            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each (function () {  //这里的this就是jquery对象，这里return是为了支持链式调用
                var $this=$(this);
                init();

                function init(){
                    var htmlStr = setUpHtml();
                    $this.html(htmlStr);
                }

                function getTotalPageCount(){
                    //进行数字运算，
                    var count=opts.recordsCount/opts.perPageCount;
                    count=Math.ceil(count);
                    return count;
                };


                //页面分页填充字符串
                function setUpHtml(){
                    var count=getTotalPageCount(),
                        str='',
                        className='';
                    for(var i=1;i<=count;i++){
                        //第一页数据不存在，返回空
                        className='';
                        //第一页默认展示选中样式
                        if(i==1){
                            className=opts.selectClass;
                        }
                        str+='<li><a href="javascript:void(0)" class="'+ className +'">'+i+'</a></li>';
                    }
                    str='<ul class="page-list">'+str+'</ul>';
                    return str;
                };

                $this.on('click','.page-list li a',function(){
                    //指向符
                    var num=$(this).text();
                    //
                    $(this).addClass(opts.selectClass).parent().siblings().find('a').removeClass(opts.selectClass);
                    //callback返回值，方便插件调用
                    opts.callBack && opts.callBack(num);
                });

            });
        }
    });

    var defaluts = {
        recordsCount: 190,//总页数
        perPageCount: 20,//分页展示多少页
        selectClass: 'select' ,//select选中
        callBack : null
    };
})(jQuery);