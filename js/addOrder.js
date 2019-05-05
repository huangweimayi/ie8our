var priceArr = [
    [0,30],
    [30,50],
    [50,100],
    [100,150],
    [150,300],
    [300,0]
];
layui.use(['form','layer','laydate'], function(){
    var layDate = layui.laydate;
    var form = layui.form();
    var layer = layui.layer;
    var events = {
        init:function () {
            this.domEvent();
            this.ajaxDo.categorySelect($('#category1'),0);
            this.ajaxDo.typeSelect();
        },
        infor:{
            category1:[],
            category2:[],
            category3:[],
            addressArr:[],
            user:{},
            min_number:0,
            serviceList:[],
            current_service:{},
            totalPage:0,
            currentPage:1,
            servicePrice:'',
            addInfo:{
                address_id:'',
                category_id:'',
                street_id:'',
                user_mobile:'',
                user_remark:'',
                type:'',
                price:[],
                service_keyword:'',
                mobile:'',
                contact_name:'',
                address:'',
                start_time:'',
                end_time:'',
                service_store_id:'',
                sku_id:'',
                quantity:'',
                remark:'',
            }

        },
        domEvent:function () {
            var _top = this;

            function callNo() {
                var num = call_getCallerNo();
                $('#user_mobile').val(num);
                _top.infor.addInfo.user_mobile = num;
                _top.ajaxDo.userInfo(num)
            }
            callNo();
            //上一页
            $(document).on('click','#last',function () {
                if(_top.infor.currentPage == 1){
                    return
                }else{
                    layer.closeAll();
                    _top.infor.currentPage = _top.infor.currentPage-1;
                    _top.ajaxDo.serviceOne(0,_top.infor.currentPage)
                }
            });

            //下一页
            $(document).on('click','#next',function () {
                if(_top.infor.currentPage == _top.infor.totalPage){
                    return
                }else{
                    layer.closeAll();
                    _top.infor.currentPage = _top.infor.currentPage+1;
                    _top.ajaxDo.serviceOne(0,_top.infor.currentPage)
                }
            });
            //监听提交
            form.on('submit(formDemo)', function(data){
                layer.msg(JSON.stringify(data.field));
                return false;
            });
            //日期选择
            var start = {
                min: laydate.now(),
                max: '9999-06-16 23:59:59',
                istoday: false,
                choose: function(date){
                    getHalfHours(_mm.isToday(date))
                }
            };
            //日历渲染
            $('#begin_time').on('click',function () {
                start.elem = $(this)[0];
                laydate(start);
            });
            //半小时时间渲染
            function getHalfHours(isToday) {
                var arrHalf = [
                    '00:00',
                    '00:30',
                    '01:00',
                    '01:30',
                    '02:00',
                    '02:30',
                    '03:00',
                    '03:30',
                    '04:00',
                    '04:30',
                    '05:00',
                    '05:30',
                    '06:00',
                    '06:30',
                    '07:00',
                    '07:30',
                    '08:00',
                    '08:30',
                    '09:00',
                    '09:30',
                    '10:00',
                    '10:30',
                    '11:00',
                    '11:30',
                    '12:00',
                    '12:30',
                    '13:00',
                    '13:30',
                    '14:00',
                    '14:30',
                    '15:00',
                    '15:30',
                    '16:00',
                    '16:30',
                    '17:00',
                    '17:30',
                    '18:00',
                    '18:30',
                    '19:00',
                    '19:30',
                    '20:00',
                    '20:30',
                    '21:00',
                    '21:30',
                    '22:00',
                    '22:30',
                    '23:00',
                    '23:30'
                ];
                var h = 0,arr;
                if(isToday){
                    h = new Date().getHours();
                    var m = new Date().getMinutes();
                    if(m>29){
                        arr = arrHalf.splice(h*2+2,arrHalf.length-1)
                    }else{
                        arr = arrHalf.splice(h*2+1,arrHalf.length-1)
                    }
                }else{
                    arr = arrHalf
                }
                var strInit = '<option value=""></option>';
                $.each(arr,function (i, v) {
                    strInit += '<option value="'+v+'">'+v+'</option>'
                });
                $('#halfTime').html(strInit);
                form.render('select');
            }
            form.on('select(halfTime)', function(data){
                var val = data.value,date = $('#begin_time').val();
                _top.infor.addInfo.start_time = date +' '+val;
            });

            //change分类
            function getcategory(dom,num,val) {//分类赋值
                if(num != 3) {
                    _top.ajaxDo.categorySelect(dom,num,val);
                }
                _top.infor.addInfo.category_id = val;
            }
            form.on('select(category1)', function(data){
                var val = data.value;
                getcategory($('#category2'),1,val)
            });
            form.on('select(category2)', function(data){
                var val = data.value;
                getcategory($('#category3'),2,val)
            });
            form.on('select(category3)', function(data){
                var val = data.value;
                getcategory($('#category3'),3,val)
            });

            //查询用户信息
            $('#user_mobile').on('change',function () {
                var val = $(this).val();
                _top.infor.addInfo.user_mobile = val;
                _top.ajaxDo.userInfo(val)
                // _top.ajaxDo.userInfo('158821313109')
            });


            //服务内容
            $('#service_keyword').on('change',function () {
                _top.infor.addInfo.service_keyword = $(this).val();
            });

            //用户备注
            $('#user_remark').on('change',function () {
                _top.infor.addInfo.user_remark = $(this).val();
            });

            //订单备注
            $('#remark').on('change',function () {
                _top.infor.addInfo.remark = $(this).val();
            });

            //联系人
            $('#contact_name').on('change',function () {
                _top.infor.addInfo.contact_name = $(this).val();
            });

            //联系电话
            $('#mobile').on('change',function () {
                _top.infor.addInfo.mobile = $(this).val();
            });

            //详细地址
            $('#address').on('change',function () {
                _top.infor.addInfo.address = $(this).val();
            });

            //新增地址按钮
            $('#addAddr').on('click',function () {
                // callNo();
                $('#isHasUser').show();
                _top.ajaxDo.addressSelect(_top.infor.user.address);
                _top.infor.addInfo.address_id = '';
                _top.infor.addInfo.address = '';
                _top.ajaxDo.areaList($('#city1'))
            });

            //change类型
            form.on('select(type)', function(data){
                _top.infor.addInfo.type = data.value;
            });

            //改变价格
            form.on('select(price)', function(data){
                _top.infor.addInfo.price = priceArr[data.value];
            });

            //服务地址
            form.on('select(street_id)', function(data){
                _top.infor.addInfo.address_id = data.value.split('_')[0];
                _top.infor.addInfo.address = data.value.split('_')[1];
                events.ajaxDo.serviceOne(true);
                $('#isHasUser').hide();
            });

            //服务城市change
            function getCity(dom,num,val) {//分类赋值
                if(num != 3) {
                    _top.ajaxDo.areaList(dom,val,num);
                }
                _top.infor.addInfo.street_id = val;
            }
            form.on('select(city1)', function(data){
                getCity($('#city2'),1,data.value);
                $('#city3').html('<option value=""></option>');
                form.render();
            });
            form.on('select(city2)', function(data){
                getCity($('#city3'),2,data.value);
                // _top.ajaxDo.serviceOne(1)
            });
            form.on('select(city3)', function(data){
                getCity($('#city3'),3,data.value);
                _top.ajaxDo.serviceOne(1)
            });

            //改变表格数量
            function changeNum(up){
                if(_top.infor.current_service.price_type == 1){
                    return tipMsg('定金数量不能修改！')
                }
                var num = Number($('#s_num').val());
                if(up){
                    num = num + 1
                }else{
                    if(num > Number(_top.infor.min_number)){
                        num = num - 1
                    }else{
                        tipMsg('低于最小限制！')
                    }
                }
                _top.infor.addInfo.quantity = num;
                if(_top.infor.current_service.price_type == 1){
                    $('#total_price').text(_top.infor.current_service.price)
                }else{
                    $('#total_price').text(Number(_top.infor.servicePrice)*num)
                }

                $('#s_num').val(num)
            }
            $('#lessNum').on('click',function () {
                changeNum(0)
            });
            $('#moreNum').on('click',function () {
                changeNum(1)
            });
            //切换规格
            form.on('select(sku)', function(data){
                _top.infor.addInfo.sku_id = data.value;
                $.each(_top.infor.current_service.sku_list,function (i, v) {
                    if(v.id == data.value){
                        $('#s_price').text(v.price.split('￥')[1]);
                        _top.infor.servicePrice = v.price.split('￥')[1];
                    }
                });
                var num = Number($('#s_num').val());
                _top.infor.addInfo.quantity = num;
                if(_top.infor.current_service.price_type == 1){
                    $('#total_price').text(_top.infor.current_service.price)
                }else{
                    $('#total_price').text(Number(_top.infor.servicePrice)*num)
                }
            });

            //取消
            $(document).on('click','#cancel',function () {
                layer.closeAll();
            });

            //确认
            $(document).on('click','#sure',function () {
                var _t = $(this);
                var index = _t.parents('.c_l_out').find('#serviceBody').find("input:checked[name='which']").val();
                // var index = $("#serviceBody input:checked[name='which']").val();
                if(index>-1){
                    events.ajaxDo.delTable(events.infor.serviceList[index],1);
                    layer.closeAll()
                }else{
                    layer.closeAll()
                }
            })

            //手动选择的弹窗
            $('.chooseService').on('click',function (e) {
                e.stopPropagation();
                _top.ajaxDo.serviceOne();

            });
        },
        ajaxDo:{
            //渲染 服务地址下拉框
            addressSelect:function(addr){
                var str = '<option></option>';
                if(addr){
                    $.each(addr,function (i, v) {
                        str += '<option value="'+v.id+'_'+v.address+'">'+v.username+' '+v.tel+' '+v.full_address+'</option>'
                    });
                    $('#street_id').html(str);
                    form.render('select');
                }
            },
            //获取用户信息
            userInfo:function(mobile){
                _hw.userInfo({mobile:mobile},function(res){
                    var _data = res.data,
                        addr = _data.address;
                    events.infor.addressArr = addr;
                    events.infor.user = _data;
                    $('#mobile').val(_data.mobile);
                    events.infor.addInfo.mobile = _data.mobile;
                    if(addr.length>0){
                        events.ajaxDo.addressSelect(addr);
                        $('#isHasUser').hide()
                    }else{
                        $('#isHasUser').show();
                        events.ajaxDo.areaList($('#city1'))
                    }
                },function(err){
                    tipMsg(err.message);
                    $('#isHasUser').show();
                    events.ajaxDo.areaList($('#city1'))
                });
            },
            //获取服务分类
            categorySelect:function (dom,num,pid) {
                var str = '<option value=""></option>';
                _hw.categorySelect({pid:pid},function(res){
                    var _data = res.data;
                    switch (num) {
                        case '0':
                            events.infor.category1 = _data;
                            break;
                        case '1':
                            events.infor.category2 = _data;
                            break;
                        case '2':
                            events.infor.category3 = _data;
                            break;
                    }
                    $.each(_data,function (i, v) {
                        str += '<option value="'+v.id+'" data-pid="'+v.pid+'">'+v.show_name+'</option>'
                    });
                    dom.html(str);
                    form.render('select');
                },function(errMsg){});
            },
            //获取类型
            typeSelect:function (pid) {
                var str = '<option value=""></option>';
                _hw.typeSelect({pid:pid},function(res){
                    var _data = res.data.typeList;
                    $.each(_data,function (i, v) {
                        str += '<option value="'+v.id+'">'+v.name+'</option>'
                    });
                    $('#type').html(str);
                    form.render('select');
                },function(errMsg){});
            },
            //获取服务
            serviceOne:function (isOne,page) {
                if(!events.infor.addInfo.category_id){
                    return tipMsg('请选择服务分类')
                }
                var data = {
                    min_price:events.infor.addInfo.price.length>0?events.infor.addInfo.price[0]:'',
                    max_price:events.infor.addInfo.price.length>0?events.infor.addInfo.price[1]:'',
                    category:events.infor.addInfo.category_id,
                    type:events.infor.addInfo.type,
                    keyword:events.infor.addInfo.service_keyword,
                    street_id:events.infor.addInfo.street_id,
                    address_id:events.infor.addInfo.address_id,
                    page:page || 1
                };
                if(data.max_price == 0){
                    delete data.max_price
                }
                if(isOne){
                    delete data.page;
                    if(!data.street_id) return;
                    _hw.serviceOne(data,function(res){
                        var _data = res.data.service;
                        if(_data.id>-1){
                            events.ajaxDo.delTable(_data,1)
                        }else{
                            events.ajaxDo.delTable(_data,0)
                        }
                    },function(errMsg){});
                }
                else{
                    _hw.serviceList(data,function(res){
                        var list = res.data.list,str = '';
                        events.infor.serviceList = list;
                        events.infor.totalPage = res.data.totalPage;
                        if(list.length>0){
                            $.each(list,function (i, v) {
                                str += '<tr>\n' +
                                    '        <td>\n' +
                                    '          <label>\n' +
                                    '            <input type="radio" class="which" name="which" value="'+i+'">\n' +
                                    '            单选\n' +
                                    '          </label>\n' +
                                    '        </td>\n' +
                                    '        <td>'+v.name+'</td>\n' +
                                    '        <td>'+v.price+'</td>\n' +
                                    '        <td>'+v.store_name+'</td>\n' +
                                    // '        <td>暂无</td>\n' +
                                    '      </tr>'

                            });
                        }else{
                            str = '<tr><td colspan="4" class="t_a">暂无数据</td></tr>'
                        }
                        $('#serviceBody').html(str);
                        var content = $('#chooseLayer')[0].innerHTML;
                        layer.open({
                            type: 1,
                            title:'手动选择',
                            area: ['800px', '500px'],
                            content: content, //这里content是一个普通的String
                            success:function (e) {
                            }
                        });
                        /*layui.use(['laypage', 'layer'], function(){
                         var laypage = layui.laypage;
                         laypage({
                         cont: 'pages',
                         pages: res.data.totalPage || 0, //数据总数
                         curr: page||1,
                         jump: function(obj, first){
                         if(!first){
                         events.ajaxDo.serviceOne(0,obj.curr);
                         }
                         }
                         });
                         });*/
                    },function(errMsg){});

                }
            },
            delTable:function(_data,num){
                $('#service_table').show();
                $('#s_title').text(num?_data.title:'-');
                $('#s_cate').text(num?_data.category_text:'-');
                $('#s_price').text(num?_data.price:'-');
                $('#s_num').val(num?_data.min_number:'-');
                $('#store_name').text(num?_data.store_name:'-');
                events.infor.min_number =num?_data.min_number:'';
                events.infor.current_service =num?_data:{};
                events.infor.addInfo.quantity = num?_data.min_number:'';
                events.infor.addInfo.service_store_id = num?_data.id:'';
                events.infor.servicePrice = num?_data.price:'';
                if(num == 1){
                    if(_data.price_type == 1){
                        $('#total_price').text(_data.price)
                    }else{
                        $('#total_price').text(Number(_data.price)*Number(_data.min_number))
                    }
                    var sku = _data.sku_list;
                    var str = '';
                    if(sku && sku.length>0){
                        sku.sort(function(a,b){
                            if(Number(a.price.split('￥')[1])<Number(b.price.split('￥')[1])){
                                return -1;
                            }
                            if(Number(a.price.split('￥')[1])>Number(b.price.split('￥')[1])){
                                return 1;
                            }
                            return 0;
                        })
                        console.log(sku)
                        $.each(sku,function (i, v) {
                            str += '<option value="'+v.id+'">'+v.name +' '+v.price+'</option>'
                        });
                        $('#sku').html(str);
                        form.render('select');
                        events.infor.addInfo.sku_id = sku[0].id
                    }
                }else{
                    $('#total_price').text('');
                    $('#sku').html('<option value=""></option>');
                    form.render('select')
                }
            },
            //省市县下拉
            areaList:function (dom,pid,num) {
                _hw.areaList({pid:pid},function (res) {
                    var data = res.data.list;
                    var str = '<option value=""></option>';
                    $.each(data,function (i,v) {
                        str += '<option value="'+v.id+'">'+v.title+'</option>'
                    });
                    dom.html(str);
                    form.render('select');
                    // events.ajaxDo.serviceOne(1);
                },function(errMsg){})
            },
            //新增订单
            addOrder:function () {
                if(!events.infor.addInfo.service_store_id){
                    return tipMsg('请选择服务！')
                }
                _hw.addOrder(events.infor.addInfo,function (res) {
                    tipMsg('操作成功');
                    setTimeout(function () {
                        window.location.href = 'orderList.html';
                    },1500);
                    $("#addGoodsForm")[0].reset();
                    form.render();
                },function (err) {
                    tipMsg(err.message)
                })
            }
        }
    };
    //监听提交
    form.on('submit(addInfo)', function(data){

        events.ajaxDo.addOrder();
        return false;
    });
    events.init();


});
