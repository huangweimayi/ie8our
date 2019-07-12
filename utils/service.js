/*// 值班信息
var _duty = {
    // 获值班信息列表
    getDutyPage : function(data,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/duty/getDutyPage?'+_mm.setUrlParam(data)),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    // 导入
    importData : function(data,resolve,reject){
        _mm.requestFile({
            url     : _mm.getServerUrl('/duty/importData'),
            data    : data,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 编辑值班信息
    updateDuty : function(data,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/duty/updateDuty'),
            data    : data,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
};*/
var _hw = {
  //获取用户信息
  getCoupon: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/order/coupon?' + _mm.setUrlParam(data)),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  // 登录
  login: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/login'),
      data: JSON.stringify(data),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 查询用户信息
  userInfo: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/order/user?' + _mm.setUrlParam(data)),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  // 获取服务分类
  categorySelect: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/order/category?' + _mm.setUrlParam(data)),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  // 获取类型单位
  typeSelect: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/order/add-form?' + _mm.setUrlParam(data)),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  // 获取一个服务
  serviceOne: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/order/service?' + _mm.setUrlParam(data)),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  // 获取服务列表
  serviceList: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/order/service-list?' + _mm.setUrlParam(data)),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  // 获取省市县下拉
  areaList: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/area/select-list?' + _mm.setUrlParam(data)),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  // 新增订单
  addOrder: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/order/add'),
      method: 'POST',
      data: JSON.stringify(data),
      success: resolve,
      error: reject
    });
  },
  // 顶部数量
  count : function(data,resolve,reject){
    _mm.request({
      url     : _mm.getServerUrl('/manage114/order/count'),
      method  : 'GET',
      success : resolve,
      error   : reject
    });
  },

};
var orderList = {
  //订单列表
  order: function (data, resolve, reject) {
    _mm.request({
      url     : _mm.getServerUrl('/manage114/order?'+_mm.setUrlParam(data)),
      method  : 'GET',
      success : resolve,
      error   : reject
    });
  },
  //城市列表
  cityList: function (data, resolve, reject) {
    _mm.request({
      url     : _mm.getServerUrl('/manage114/order/list-page?'+_mm.setUrlParam(data)),
      method  : 'GET',
      success : resolve,
      error   : reject
    });
  },
  //回访
  feedback:function(data,resolve,reject){
    _mm.request({
      url     : _mm.getServerUrl('/manage114/order/feedback'),
      data    : JSON.stringify(data),
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },
  //异常订单列表
  confirm:function(data,resolve,reject){
    _mm.request({
      url     : _mm.getServerUrl('/manage114/order/not-confirm?'+_mm.setUrlParam(data)),
      method  : 'GET',
      success : resolve,
      error   : reject
    });
  },
}
var orderDetail = {
    // 获取省市县下拉
    // areaList: function (data, resolve, reject) {
    //     _mm.request({
    //         url: _mm.getServerUrl('/manage114/area/select-list?' + _mm.setUrlParam(data)),
    //         method: 'GET',
    //         success: resolve,
    //         error: reject
    //     });
    // },
    areaList: function (data, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/manage114/area/select-list?' + _mm.setUrlParam(data)),
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
  //详情
  order: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/order/detail?' + _mm.setUrlParam(data)),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  // 修改地址
  Address: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/order/edit-address'),
      data: JSON.stringify(data),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  //待商家确认接单
  Confirm: function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/order/store-confirm'),
      data: JSON.stringify(data),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 获取服务人员信息
  provider:function (data, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage114/store/provider?'+ _mm.setUrlParam(data)),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
// 分配服务人员
    toProvider: function (data, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/to-provider'),
            data: JSON.stringify(data),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 修改备注
    remark:function (data, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/remark'),
            data: JSON.stringify(data),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 获取重选服务数据 /manage114/order/service-list
    serviceList: function (data, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/service-list?' + _mm.setUrlParam(data)),
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    // 重新选择服务
    hangeService:function (data, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/change-service'),
            data: JSON.stringify(data),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //确认出发
    depart:function (data, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/depart'),
            data: JSON.stringify(data),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 确认到达 /manage114/order/arrive
    Arrive:function (data, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/arrive'),
            data: JSON.stringify(data),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //开始服务 /manage114/order/start
    start: function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/start'),
            data: JSON.stringify(data),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //结束服务 /manage114/order/finish
    finish:function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/finish'),
            data: JSON.stringify(data),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 补差价服务  /manage114/order/pay-detail
    payDetail: function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/pay-detail'),
            data: JSON.stringify(data),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 确认回访 /manage114/order/feedback
    feedback: function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/feedback'),
            data: JSON.stringify(data),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 取消订单 /manage114/order/cancel
    cancel:function (data, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/manage114/order/cancel'),
            data: JSON.stringify(data),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}

