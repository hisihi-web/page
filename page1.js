/**
 * Created by jimmy-jiang on 2016/11/11.
 */
(function ($) {
    $.fn.extend({
        "page1": function (options) {
            var opts = $.extend({}, defaluts, options); //ʹ��jQuery.extend ���ǲ��Ĭ�ϲ���
            return this.each (function () {  //�����this����jquery��������return��Ϊ��֧����ʽ����
                var $this=$(this);
                init();
                function getTotalPageCount(){
                    var count=opts.recordsCount/opts.perPageCount;
                    count=Math.ceil(count);
                    return count;
                };


                function setUpHtml(){
                    var count=getTotalPageCount(),
                        str='',
                        className='';
                    for(var i=1;i<=count;i++){
                        className='';
                        if(i==1){
                            className=opts.selectClass;
                        }
                        str+='<li><a href="javascript:void(0)" class="'+ className +'">'+i+'</a></li>';
                    }
                    str='<ul class="page-list">'+str+'</ul>';
                    return str;
                };

                function init(){
                    var htmlStr = setUpHtml();
                    $this.html(htmlStr);
                }


                $this.on('click','.page-list li a',function(){
                    var num=$(this).text();
                    $(this).addClass(opts.selectClass).parent().siblings().find('a').removeClass(opts.selectClass);
                    opts.callBack && opts.callBack(num);
                });

            });
        }
    });

    var defaluts = {
        recordsCount: 0,//��ҳ��
        perPageCount: 20,//��ҳչʾ����ҳ(����ȡ����)
        selectClass: 'select' ,//selectѡ��
        callBack : null
    };
})(jQuery);;