var events = {
  init:function () {
    this.domEvent();
    this.ajaxDo.count();
  },
  userInfo:JSON.parse(sessionStorage.getItem('user')) || '',
  domEvent:function () {
    //用户信息回显
    $('#name').text(this.userInfo ? this.userInfo.username:'--');
    $('#avater').attr('src',this.userInfo ? this.userInfo.avater:'image/logo.png');
    //菜单事件
    $('#order').on('click',function () {
      var _t = $(this);
      _t.find('.sub_menu').fadeToggle()
    });
    //iframe路径赋值
    $('.sub_menu').on('click','li',function (e) {
      e.stopPropagation();
      var _t = $(this),
        src=_t.attr('data-url');
      $('iframe').attr('src',src)
    });
    //退出登录
    $('#logout').on('click',function () {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      _mm.successTips();
      setTimeout(function () {
        _mm.goToLogin()
      },1000)
    })

  },
  ajaxDo:{
    //顶部数量
    count:function () {
      _hw.count({},function (res) {
        var list = res.data.list,str = '';
        $.each(list,function (i, v) {
          str += '<div class="f_l">'+v.title+'（<span>'+v.count+'</span>）</div>'
        });
        $('#top_order').html(str)
      },function (errmsg) {})
    }
  }
};
$(function(){
  function getWinSize() {
    var width = parseInt(document.documentElement.clientWidth);
    var height = parseInt(document.documentElement.clientHeight);
    return new Array(width, height);
  }
  document.getElementById("iframe").height = getWinSize() [1] - 75 + "px";
  events.init();
});
