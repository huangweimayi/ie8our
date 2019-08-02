var conf = {
  // serverHost: 'http://demo.jixinghai.com/xiaobaidaojia/public/index.php',
  serverHost: 'http://devdaojiam.qingmh.com',
  // serverHost: 'http://o2o.114yun.net/sysAdmin',
  // serverHost: 'http://o2o.114yun.net/sysAdmindev',
  // serverHost: 'http://devdaojiam.qingmh.com',

  // serverHost: '',
};
var token = '';
var _mm = {
  //网络请求
  request: function(param){
    var _this = this;
    $.ajax({
      type: param.method||"get",
      url: param.url||"",
      dataType: param.type||"json",
      headers: param.headers||{'Content-Type':'application/json',Authorization:'Bearer'+sessionStorage.getItem('token')},
      data: param.data||"",
      cache: false,
      success: function(res){
        //请求成功
        if(res.status == 1){
          typeof param.success === "function" && param.success(res);
        }else{
          typeof param.error === "function" && param.error(res);
        }
      },
      error: function(err){
        if(err.status == 401){
          tipMsg('令牌已失效，请重新登录！');
          setTimeout(function () {
            _this.goToLogin()
          },1500)
        }else{
          typeof param.error === "function" && param.error(err.message);
        }
      }
    });
  },

  //网络请求
  requestFile: function(param){
    var _this = this;
    $.ajax({
      type: param.method||"get",
      url: param.url||"",
      dataType: param.type||"json",
      headers: param.headers || {Authorization:'Bearer'+sessionStorage.getItem('token')},
      data: param.data||"",
      cache: false,

      processData: false,
      contentType: false,
      success: function(res){
        //请求成功
        if(res.status == 1){
          typeof param.success === "function" && param.success(res);
        }else{
          typeof param.error === "function" && param.error(res);
        }
      },
      error: function(err){
        if(err.status == 401){
          tipMsg('令牌已失效，请重新登录！')
          setTimeout(function () {
            _this.goToLogin()
          },1500)
        }else{
          typeof param.error === "function" && param.error(err.message);
        }
      }
    });
  },

  //获取服务器地址
  getServerUrl: function(path){
    return conf.serverHost + path;
  },
  //获取url参数
  getUrlParam: function(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) :null;
  },
  // 拼接url?search
  setUrlParam: function(data){
    var _str = '';
    for(var i in data){
      if(data[i]){
        _str += i +'=' + encodeURIComponent(data[i]) + '&';
      }
    }
    var search = _str.substring(0,_str.length-1);
    return search;
  },
  // 表单val拼接formdata对象
  inputMerge: function(arr){
    var formData={};
    $.each(arr,function(){
      if($(this).val() && $(this).attr('id')){
        formData[$(this).attr('id')] = $.trim($(this).val());
      }
    });
    return formData;
  },
  // 数组相减
  arrayDiff: function(a,b){
    for(var i=0;i<b.length;i++){
      for(var j=0;j<a.length;j++)
      {
        if(a[j]==b[i]){
          a.splice(j,1);
          j=j-1;
        }
      }
    }
    return a;
  },
  //对象数组按属性去重
  uniqueArr: function(array,key){
    var obj = {},arr = [];
    for(var i=0;i<array.length;i++){
      if(!obj[array[i][key]]){
        obj[array[i][key]] = [array[i]];
        arr.push(array[i]);
      }else{
        obj[array[i][key]].push(array[i]);
      }
    }
    return arr;
  },
  //对象字段null转为空字符串''
  nullSwitch: function(value){
    for(var i in value){
      if(value[i] == null){
        value[i] = "";
      }
    }
    return value;
  },

  //渲染html模板

  //成功提示
  successTips: function(msg){
    tipMsg(msg || '操作成功！');
  },
  //错误提示
  errorTips: function(msg){
    tipMsg(msg || '哪里不对了~');
  },
  //字段验证，支持非空判断、手机、邮箱
  validate: function(value,type){
    var value = $.trim(value);
    //非空验证
    if('require' === type){
      return !!value;
    }
    //手机号码验证
    if('phone' === type){
      return /^1\d{10}$/.test(value);
    }
    //邮箱格式验证
    if('email' === type){
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  },
  //统一登录处理
  goToLogin: function(url){
    window.top.location.href = url || "./login.html" ;
  },
  //跳回首页
  goHome: function(){
    window.top.location.href =  url || './index.html';
  },
  //判断日期是否为今天
  isToday:function (str){
    var d = new Date(str.replace(/-/g,"/"));
    var todaysDate = new Date();
    if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
      return true;
    } else {
      return false;
    }
  }
};

//layer.msg
function tipMsg(msg) {
  layui.use(['laypage', 'layer'], function(){
    var layer = layui.layer;
    layer.msg(msg)
  });
}
