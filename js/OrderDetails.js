var nameArr = []
var newArr = []
var SingleCzArr = []//储存服务弹框的选中的值
var numArr = []
var numArr1 = []
var AddId
var stutes //订单的状态值
var DetailId
var provider//存储服务人员的id
var checkBoxId
var severId
var severNum //服务的数量
var shop_id//店铺id
var is_feedback
var is_cancel
var area_id //地址id
var category
var xianXiDz
var xianXiQu
var shopId  //订单id
// var busCode

// 求服务信息总和的共用函数
function Sum() {
    $('.D_much').each(function () {
        numArr.push($(this).text().split('￥')[1])
    })
    $('.D_num').each(function () {
        numArr1.push($(this).text())
    })
    var zonghe = 0
    for (var i = 0; i < numArr.length; i++) {
        zonghe = zonghe + (parseFloat(numArr[i]) * parseInt(numArr1[i]))
    }
    var sumHtml = '￥' + zonghe.toFixed(2)
    $('.D_sum').html(sumHtml)
    numArr = []
    numArr1 = []

}
// 选择服务时复选变单选
var checkThis
//获取服务信息的值
function checkBox(isBox) {
    SingleCzArr = []
    SingleCzArr.push($(isBox).parent().next().text())
    SingleCzArr.push($(isBox).parent().next().next().find("option:selected").text())
    SingleCzArr.push($(isBox).parent().next().next().next().text())
    SingleCzArr.push($(isBox).parent().next().next().next().next().text())
    SingleCzArr.push('')
    SingleCzArr.push($(isBox).parent().next().next().next().next().next().children().val())
    checkBoxId = $(isBox).parent().next().next().find("option:selected").attr('id')
    severId = $(isBox).parent().parent().attr('id')
    severNum = $(isBox).parent().next().next().next().next().next().children().val()
}
// 选择下拉框找DOM
function select() {
    $("input[name='SingleCz']").on('click', function () {
        // 取消全部checkbox的选中
        $("input[name='SingleCz']").prop("checked", false);
        // 设置选中当前
        $(this).prop("checked", true);
        checkThis = this
        if ($(this).parent().next().next().children().hasClass('D_select')) {
            checkBox(this)
        }
        else {
            SingleCzArr = [],
                severNum=''
                severId=''
                busCode=''
            $(this).parent().siblings().each(function () {
                SingleCzArr.push($(this).text())
            })
            SingleCzArr.push($(this).parent().siblings().children().val())
            severId = $(this).parent().parent().attr('id')
            severNum = $(this).parent().siblings().children().val()
            // busCode=$(this).parent().siblings().children().attr('busCode')
        }
    });
}
// 绑定change事件选中当前的改变的值
$("#D_FpgcsCz").on("change",'.D_xianzhi',function(){
    // console.log('++++++++',busCode)
    console.log('++++++++',$(this).attr('busCode'))

        if($(this).val()>=$(this).attr('busCode')){
            if($(this).parent().parent().children().eq(0).children().prop("checked")){
                severNum= $(this).val()
            }
        }else {
            if($(this).parent().parent().children().eq(0).children().prop("checked")){
                severNum= $(this).attr('busCode')
            }
            tipMsg('认购数量不能低于起购数量')
            $(this).val($(this).attr('busCode'))
        }

})
// 服务信息第二模板
function moBan(res) {
    var html = ' <tr>\n' +
        '                    <td>' + res.data.service.name + '</td>\n' +
        '                    <td>' + res.data.service.category_text + '</td>\n' +
        '                    <td>' + res.data.price_type_text + '</td>\n' +
        '                    <td class="D_much">￥' + res.data.service.unit_price + '</td>\n' +
        '                    <td class="D_num">' + res.data.service.quantity + '</td>\n' +
        '                </tr>'
    $('#D_addChild').append(html)
    Sum()
}

// 初始化服务弹框信息
function serviceList(List) {
    orderDetail.serviceList(List, function (res) {
        FpgcsCz = res.data.list
        for (var i = 0; i < FpgcsCz.length; i++) {
            if (!FpgcsCz[i].sku_list) {
                if(FpgcsCz[i].price_type_text=='一口价'){
                    html = '<tr class="D_FwTable" id="' + FpgcsCz[i].id + '">\n' +
                        '                    <td><input class="D_ridio" type="checkbox" name="SingleCz" lay-skin="primary"></td>\n' +
                        '                    <td>' + FpgcsCz[i].title + '</td>\n' +
                        '                    <td>' + FpgcsCz[i].category_text + '</td>\n' +
                        '                    <td>' + FpgcsCz[i].price_type_text + '</td>\n' +
                        '                    <td>￥' + FpgcsCz[i].price + '</td>\n' +
                        '                    <td style="width: 140px"><input maxlength="8" class="D_Ipt D_FwTable  D_xianzhi" busCode="' + FpgcsCz[i].min_number + '"   value="' + FpgcsCz[i].min_number + '" type="text"></td>\n' +
                        '                </tr>'
                }else {
                    html = '<tr class="D_FwTable" id="' + FpgcsCz[i].id + '">\n' +
                        '                    <td><input class="D_ridio" type="checkbox" name="SingleCz" lay-skin="primary"></td>\n' +
                        '                    <td>' + FpgcsCz[i].title + '</td>\n' +
                        '                    <td>' + FpgcsCz[i].category_text + '</td>\n' +
                        '                    <td>' + FpgcsCz[i].price_type_text + '</td>\n' +
                        '                    <td>￥' + FpgcsCz[i].price + '</td>\n' +
                        '                    <td style="width: 140px"><input maxlength="8" class="D_Ipt D_FwTable  D_xianzhi" busCode="'+FpgcsCz[i].min_number+'"  value="' + FpgcsCz[i].min_number + '" type="text" readonly="readonly"></td>\n' +
                        '                </tr>'
                }

            }
            else {
                html = $('<tr class="D_FwTable" id="' + FpgcsCz[i].id + '">\n' +
                    '                    <td><input class="D_ridio" type="checkbox" name="SingleCz" lay-skin="primary"></td>\n' +
                    '                    <td>' + FpgcsCz[i].title + '</td>\n' +
                    '                    <td>' +
                    '      <select class="D_select">\n' +
                    '      </select>\n' +
                    '</td>\n' +
                    '                    <td>' + FpgcsCz[i].price_type_text + '</td>\n' +
                    '                    <td>￥' + FpgcsCz[i].price + '</td>\n' +
                    '                    <td style="width: 140px"><input  maxlength="8" class="D_Ipt D_FwTable  D_xianzhi" busCode="' +FpgcsCz[i].min_number+'" value="' + FpgcsCz[i].min_number + '" type="text"></td>\n' +
                    '                </tr>'
                )
                for (var j = 0; j < FpgcsCz[i].sku_list.length; j++) {
                    var optionHtm = ' <option id="' + FpgcsCz[i].sku_list[j].id + '" value="' + FpgcsCz[i].sku_list[j].price + '">' + FpgcsCz[i].sku_list[j].name + '</option>'
                    // html.find('#D_select' + i).append(optionHtm)
                    html.find('.D_select').each(function () {
                        $(this).append(optionHtm)
                    })
                }
                $(document).on('change', '.D_select', function () {
                    $(this).parent().next().next().html($(this).val())
                    if ($(this).parent().prev().prev().children().is(':checked')) {
                        checkBox(checkThis)
                    }
                })
            }
            $('#D_FpgcsCz').append(html)
        }
        $(document).on('change', '.D_xianzhi', function () {
            if ($(this).val().length < 1) {
                $(this).val('1')
            }
            if ($(this).parent().prev().prev().prev().prev().prev().children().is(':checked')) {
                if ($(checkThis).parent().next().next().children().hasClass('D_select')) {
                    checkBox(checkThis)
                }
                else {
                    SingleCzArr = []
                    SingleCzArr.push($(this).parent().prev().prev().prev().prev().text())
                    SingleCzArr.push($(this).parent().prev().prev().prev().text())
                    SingleCzArr.push($(this).parent().prev().prev().text())
                    SingleCzArr.push($(this).parent().prev().text())
                    SingleCzArr.push('')
                    SingleCzArr.push($(this).val())
                }
            }
        })

        // 执行复选框的方法
        select()
        // 限制输入框的为数字
        $('.D_xianzhi').each(function () {
            $(this).keyup(function () {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            }).bind("paste", function () {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));

            })
        })
    })

}
// 获取服务人员
function newProvider(providerId) {
    orderDetail.provider(providerId, function (res) {
        for (var i = 0; i < res.data.list.length; i++) {
            var providerHtml = '<tr id="' + res.data.list[i].provider_id + '">\n' +
                '                    <td><input class="D_ridio" type="checkbox" name="SingleElection" lay-skin="primary"></td>\n' +
                '                    <td>' + res.data.list[i].tel + '</td>\n' +
                '                    <td>' + res.data.list[i].name + '</td>\n' +
                '                </tr>'
            $('#D_Fpgcs').append(providerHtml)
        }
        // 选择工程师时复选变单选
        $("input[name='SingleElection']").on('click', function () {
            // 取消全部checkbox的选中
            $("input[name='SingleElection']").prop("checked", false);
            // 设置选中当前
            $(this).prop("checked", true);
            provider = $(this).parent().parent().attr('id')
        });

    }, function (err) {

    })
}
// 回到顶部
function scropTop() {
        var d = document,
            dd = document.documentElement,
            db = document.body,
            top = dd.scrollTop || db.scrollTop,
            step = Math.floor(top / 20);
        (function fn() {
            top -= step;
            if (top > -step) {
                dd.scrollTop == 0 ? db.scrollTop = top: dd.scrollTop = top;
                setTimeout(fn, 20);
            }
        })();
    }
// 初始化
$(function () {
    function parseUrl() {
        var url = location.href;
        var i = url.indexOf('?');
        if (i == -1) return 0;
        var querystr = url.substr(i + 1);
        var arr1 = querystr.split('&');
        var arr2 = new Object();
        for (i in arr1) {
            var ta = arr1[i].split('=');
            arr2[ta[0]] = ta[1];
        }
        return arr2;
    }

    var v = parseUrl()
    DetailId = v.id
    // // 详情接口
    var dataOrder = {
        id: DetailId
    }
    orderDetail.order(dataOrder, function (res) {
        AddId = res.data.area_id//获取地址id
        stutes = res.data.status//判断订单状态
        shop_id = res.data.store_id
        is_feedback = res.data.is_feedback
        is_cancel = res.data.is_cancel
        area_id = res.data.area_id
        category = res.data.request_info?res.data.request_info.category:''
        shopId=res.data.id
        //判断回访之后的完成
        if (is_feedback == 1) {
            $('#suerBtn').addClass('D_none')
            //是否显示取消订单按钮
            $('#cancelBtn').addClass('D_none')
            $('#D_Bcj').removeClass('D_none')
        }
        if (res.data.is_cancel == 1) {
            $('#suerBtn').addClass('D_none')
            //是否显示取消订单按钮
            $('#cancelBtn').addClass('D_none')
            $("#oneBtn").addClass('D_none')
            $("#twoBtn").addClass('D_none')
        }
        $('#D_img').attr('src', res.data.user_imgs)
        $('.orderlist1').text(res.data.number)//订单号
        $('.orderlist2').text(res.data.source_text)//A下单方式
        $('.orderlist3').text(res.data.price_type_text)//定金
        $('.orderlist4').text(res.data.pay_status_text)//订单状态
        $('.orderlist5').text(res.data.status_text)//支付状态
        $('.orderlist6').text(res.data.create_time)//下单时间
        $('.orderlist7').text(res.data.total_amount)//订单价格
        $('.orderlist8').text(res.data.pay_type_text)//支付方式

        $('.orderlist11').text(res.data.user_mobile)//下单账号
        $('.orderlist22').text(res.data.service.category_text)//服务分类
        var Pice = res.data.request_info?res.data.request_info.price:''
        // var servicePice = Pice +'元'
        if(typeof (Pice)=='string'){
            var servicePice = Pice + '元'
        }else {
            if(Pice.length>0&&Pice.length<=1){
                var servicePice = Pice[0]+ '元'
            }else {
                if(Pice.length>0){
                    if(Pice[0]>Pice[1]){
                        var servicePice = Pice[1] + '-' + Pice[0] + '元'
                    }else {
                        var servicePice = Pice[0] + '-' + Pice[1] + '元'
                    }
                }else {
                    servicePice='0.00元'
                }
            }
        }


        $('.orderlist33').text(servicePice)//服务价格
        $('.orderlist44').text(res.data.user_remark)//服务备注
        $('.orderlist66').text(res.data.price_type_text)//价格类型
        $('.orderlist77').text(res.data.service.name)//服务内容

        //获取用户地址class
        xianXiDz=res.data.address||''
        xianXiQu=res.data.area_text
        $('.D_name1').text(res.data.contact_name)//联系人
        $('.D_name2').text(res.data.area_text)//服务地址区域
        $('.D_name2-1').text(res.data.address||'')//地址详情
        $('.D_name3').text(res.data.service_time)//服务时间
        $('.D_name4').text(res.data.user_remark)//备注
        $('.D_name5').text(res.data.mobile)//电话
        // 商家人员
        $('.D_People1').text(res.data.store_name)//商家名称
        $('.D_People2').text(res.data.store_phone)//商家联系人
        // 服务信息
        // 服务信息遍历新增不带操作的
        if (is_cancel != 1) {
            if (Number(stutes) == 30) {
                // 手动操作服务遍历操作数据i
                var html = '  <tr>\n' +
                    '                    <td>' + res.data.service.name + '</td>\n' +
                    '                    <td>' + res.data.service.category_text + '</td>\n' +
                    '                    <td>' + res.data.price_type_text + '</td>\n' +
                    '                    <td class="D_much">￥' + res.data.service.unit_price + '</td>\n' +
                    '                    <td class="D_num">' + res.data.service.quantity + '</td>\n' +
                    '                    <td class="D_CBtn">手动选择</td>\n' +
                    '                </tr>'
                $('#D_addChildCao').append(html)
                Sum()
            } else {
                moBan(res)
            }
        }
        else {
            moBan(res)
        }

        // 财务信息
        $('.D_caiwu1').text(res.data.service_amount)//服务金额
        $('.D_caiwu2').text(res.data.coupon_amount)//优惠券
        $('.D_caiwu3').text(res.data.total_amount)//应付价格
        $('.D_caiwu4').text(res.data.platform_amount)//平台抽成
        $('.D_caiwu5').text(res.data.store_amount)//商家结算
        $('.D_caiwu6').text(res.data.operator_amount)//渠道运营商
        $('.D_caiwu7').text(res.data.dispose)//定金金额
        $('.D_caiwu8').text(res.data.detail_amount)//补差价
        $('.D_caiwu9').text(res.data.pay_amount)//实付金额
        // 订单备注
        $('#D_bzContent').text(res.data.remark)
        // 遍历操作纪律数据i
        var caozouarr = res.data.op_list
        for (var i = 0; i < caozouarr.length; i++) {
            var html = ' <tr>\n' +
                '                    <td>' + caozouarr[i].content + '</td>\n' +
                '                    <td> ' + caozouarr[i].operator_text + '</td>\n' +
                '                    <td>' + caozouarr[i].update_time + '</td>\n' +
                '                </tr>'
            $('#D_caozuo').append(html)
        }
        //补差价服务
        var chajia = res.data.detail

        var chajiaNum = 0
        for (var i = 0; i < chajia.length; i++) {
            var isPart
            if (chajia[i].is_parts == 1) {
                isPart = '配件'
            } else {
                isPart = '服务'
            }
            var html = ' <tr>\n' +
                '                    <td>' + chajia[i].name + '</td>\n' +
                '                    <td> ' + isPart + '</td>\n' +
                '                    <td>' + chajia[i].price + '</td>\n' +
                '                </tr>'
            $('#D_Bchajia').append(html)
            chajiaNum = chajiaNum + Number(chajia[i].price)
        }
        var chajiaHtml = '￥' + chajiaNum
        $('#D_bcjSum').text(chajiaHtml)
        // 判断进来是哪个页面
        switch (String(stutes)) {
            case'20':
                if (is_cancel == 1) {
                    $("#oneBtn").addClass('D_none')
                    $("#twoBtn").addClass('D_none')
                } else {
                    $('#cancelBtn').removeClass('D_none')
                    $('#suerBtn').removeClass('D_none')
                    $('#suerBtn').html('手动重选服务')
                }
                break;
            case '40':
                //待商家指派
                var providerId = {
                    id: shop_id
                }
                // 获取服务人员
                newProvider(providerId)

                $('#suerBtn').html('分配工程师')
                break;
            case '50':
                // 待商家发出

                var providerId = {
                    id: shop_id
                }
                // 获取服务人员
                newProvider(providerId)

                $('#suerBtn').html('确认出发')
                $("#newEngineer").removeClass("D_none");
                break;
            case '60':
                // 确认到达
                $('#suerBtn').html('确认到达')
                $("#newEngineer").addClass("D_none");
                break;
            case '70':
                // 带服务
                $('#suerBtn').html('开始服务')
                break;
            case '80':
                // 待确认
                $('#suerBtn').html('确认完成服务')
                //是否显示取消订单按钮
                $('#cancelBtn').addClass('D_none')
                break;
            case '90':
                // 待补差价
                $('#suerBtn').html('确认支付')
                $('#D_Bcj').removeClass('D_none')
                //是否显示取消订单按钮
                $('#cancelBtn').addClass('D_none')
                break;
            case '100':
                // 待回访
                $('#suerBtn').html('确认回访')
                $('#D_Bcj').removeClass('D_none')
                //是否显示取消订单按钮
                $('#cancelBtn').addClass('D_none')
                break;
            case '100':
                // 已完成
                $('#suerBtn').addClass('D_none')
                //是否显示取消订单按钮
                $('#cancelBtn').addClass('D_none')
                $('#D_Bcj').removeClass('D_none')
                break;
            case 'cancel':
                // 已取消订单
                $('#suerBtn').addClass('D_none')
                //是否显示取消订单按钮
                $('#cancelBtn').addClass('D_none')
                $('#D_Bcj').removeClass('D_none')
                break;
            default:
                //待商家接单
                if (is_cancel == 1) {
                    $('#D_FwOne').removeClass('D_none')
                    $('#D_FwTwo').addClass('D_none')
                } else {
                    $('#D_Qd').addClass('D_none')
                    $('#oneBtn').removeClass('D_none')
                    $('#twoBtn').removeClass('D_none')
                    $('#D_FwOne').addClass('D_none')
                    $('#D_FwTwo').removeClass('D_none')
                }

                break
        }
    }, function (err) {
    })
});
// 时间选择器
layui.use('laydate', function () {
    var laydate = layui.laydate;
    // laydate.skin(lib)

    var start = {
        format: 'YYYY-MM-DD hh:mm:ss',
        istime: true,
        issure: false,
        isclear: false,
        fixed: true
    };
    document.querySelector('#test5').onclick = function () {
        start.elem = this;
        laydate(start);
    }

})

$('.nameInput').bind('focus', function () {
    $(this).siblings().addClass('D_none')
})
// 打开修改地址弹框
$('#oneBtn').bind('click', function () {
    $("#D_none").removeClass("D_none");
    $('.D_name').each(function () {
        $(this).text()
        nameArr.push($(this).text())
    });

    $('.nameInput').eq(0).val(nameArr[0])
    $('.nameInput').eq(1).val(nameArr[4])
    $('.nameInput').eq(2).val(nameArr[1])
    $('.nameInput').eq(3).val(nameArr[2])
    $('.nameInput').eq(4).val(nameArr[3])
    $('.D_province').text(xianXiQu)

    nameArr = []
})
// 修改地址
$('#D_tjbtn').bind('click', function (event) {
    event.preventDefault();
    if ($('.nameInput').eq(0).val() == '') {
        $('.D_tishi1').removeClass('D_none')
        return
    }
    else if (!(/^1(3|4|5|7|8|9)\d{9}$/.test($('.nameInput').eq(1).val())) && $('.nameInput').eq(1).val()) {
        $('.D_tishi2').removeClass('D_none')
        $('.D_tishi2').html('手机号码有误')
        return
    }
    else if ($('.nameInput').eq(1).val() == '') {
        $('.D_tishi2').removeClass('D_none')
        $('.D_tishi2').html('联系电话不能为空')
        return
    }
    else if ($('.nameInput').eq(2).val() == '') {
        $('.D_tishi3').removeClass('D_none')
        return
    }
    else if ($('.nameInput').eq(3).val() == '') {
        $('.D_tishi4').removeClass('D_none')
        return
    }
    else if ($('.nameInput').eq(4).val() == '') {
        $('.D_tishi5').removeClass('D_none')
        return
    }
    $('.nameInput').each(function () {
        newArr.push($(this).val())
    })

    $('.D_name').eq(0).text(newArr[0])
    $('.D_name').eq(1).text(newArr[2])
    $('.D_name').eq(2).text(newArr[3])
    $('.D_name').eq(3).text(newArr[4])
    $('.D_name').eq(4).text(newArr[1])

    var addressData = {
        id: DetailId,
        contact_name: newArr[0],
        mobile: newArr[1],
        street_id: AddId,
        address: newArr[2],
        user_remark: newArr[4],
        start_time: newArr[3]
    }
    orderDetail.Address(addressData, function (res) {
    }, function (err) {

    })
    $("#D_none").addClass("D_none");
    newArr = []

})
// 打开修改订单备注
$('#twoBtn').bind('click', function () {
    $("#D_none1").removeClass("D_none");
    scropTop()
    $('.bjInput').val($('#D_bzContent').html())
})
// 提交修改备注信息
$('#D_tjbtn1').bind('click', function (event) {
    event.preventDefault();
    var remarkData = {
        id: DetailId,
        remark: $('.bjInput').val()
    }
    orderDetail.remark(remarkData, function (res) {

    })
    $('#D_bzContent').html($('.bjInput').val())
    $("#D_none1").addClass("D_none");

})
// 关闭弹框
$('#I_con').bind('click', function () {
    $("#D_none").addClass("D_none");

})
$('#I_con1').bind('click', function () {
    $("#D_none1").addClass("D_none");
})

// 手动选择服务打开弹窗
var that //存储当前的this
$('#D_addChildCao').on('click', '.D_CBtn', function () {
    scropTop()
    $('#D_Cz').removeClass('D_none')
    var List = {

    }
    serviceList(List)
    // 选择服务时复选变单选
    $("input[name='SingleCz']").prop("checked", false);//初始化每次点击input的checked的值
    that = this
})
// 关闭服务弹框
$('#D_EngineerCz').bind('click', function () {
    $('#D_Cz').addClass('D_none')
    $('#D_FpgcsCz').empty()
})
$('#D_XCanle').bind('click', function () {
    $('#D_Cz').addClass('D_none')
    $('#D_FpgcsCz').empty()
})
// 这里是在修改服务的值 // 获取被选中的的服务的值

$('#CzBtn').bind('click', function () {
    //手动重选重选服务
    if (String(stutes) == '20') {
        var yiServiceData = {
            id: DetailId,
            service_store_id: severId,
            quantity: severNum,
            sku_id: checkBoxId || ''
        }
        if(!severId||!severNum){
            tipMsg('请选择需要的服务')
            return
        }
        orderDetail.hangeService(yiServiceData, function (res) {
            window.location.href = "./OrderDetails.html?id=" + DetailId;
            $('#D_Cz').addClass('D_none')
        }, function (err) {
            tipMsg(err.message)
        })
    } else {
        //确定页面操作服务选项的值
        var hangeServiceData = {
            id: DetailId,
            service_store_id: severId,
            quantity: severNum,
            sku_id: checkBoxId||''
        }
        if(!severId||!severNum){
            tipMsg('请选择需要的服务')
            return
        }
        orderDetail.hangeService(hangeServiceData, function (res) {
            $(that).siblings().each(function (index) {
                if (index == SingleCzArr.length - 2) {
                    $(this).text(SingleCzArr[SingleCzArr.length - 1])
                } else {
                    $(this).text(SingleCzArr[index])
                }
            })
            $('#D_Cz').addClass('D_none')
            Sum()
            SingleCzArr = []
            $('#D_FpgcsCz').empty()
        }, function (err) {
            tipMsg('不能更改商品')
            $('#D_Cz').addClass('D_none')
            $('#D_FpgcsCz').empty()
        })
    }
})
//重选服务
$("input[name='D_Choose']").on('click', function () {
    // 取消全部checkbox的选中
    $("input[name='D_Choose']").prop("checked", false);
    // 设置选中当前
    $(this).prop("checked", true);
});
$('#I_Engineer').bind('click', function () {
    $('#Engineer').addClass('D_none')
    $("input[name='SingleElection']").prop("checked", false);
})

$('#D_EntCancle').bind('click', function () {
    $('#Engineer').addClass('D_none')
    $("input[name='SingleElection']").prop("checked", false);
})
// 确认订单 与 分配工程师、
$('#suerBtn').bind('click', function () {

    switch (String(stutes)) {
        case '20':
            var List = {
                street_id:area_id,
                category:category,
                order_id:shopId
            }
            serviceList(List)
            scropTop()
            $('#D_Cz').removeClass('D_none')
            break;
        case '30':
            // 确认订单/**/
            var myid = {
                id: DetailId
            }
            orderDetail.Confirm(myid, function (res) {
                window.location.href = "./OrderDetails.html?id=" + DetailId;
            }, function (err) {
                tipMsg(err.message)
            })
            break;
        case '40':
            scropTop()
            $('#Engineer').removeClass('D_none')
            break;
        case '50':
            var departId = {
                id: DetailId
            }
            orderDetail.depart(departId, function (res) {
                window.location.href = "./OrderDetails.html?id=" + DetailId;
            }, function (err) {
                tipMsg(err.message)
            })
            break;
        case '60':
            var arriveId = {
                id: DetailId
            }
            orderDetail.Arrive(arriveId, function (res) {
                window.location.href = "./OrderDetails.html?id=" + DetailId;
            }, function (err) {
                tipMsg(err.message)
            })
            break;
        case '70':
            var startId = {
                id: DetailId
            }
            orderDetail.start(startId, function (res) {
                window.location.href = "./OrderDetails.html?id=" + DetailId;
            }, function (err) {

            })
            break;
        case '80':
            scropTop()
            $('#over').removeClass('D_none')

            break;
        case '90':
            var payDetailId = {
                id: DetailId
            }
            orderDetail.payDetail(payDetailId, function (res) {
                window.location.href = "./OrderDetails.html?id=" + DetailId;
            }, function (err) {
                tipMsg(err.message)
            })
            break;
        case '100':
            scropTop()
            $('#D_Win').removeClass('D_none')
            break;
    }

})
// 从新分配工程师
$('#newEngineer').bind('click', function () {
    $('#Engineer').removeClass('D_none')
    scropTop()
})
//跳转带出发
$('#EngineerBtn').bind('click', function () {
    switch (String(stutes)) {
        case '50':
            var toProviderData = {
                id: DetailId,
                provider: provider
            }
            orderDetail.toProvider(toProviderData, function (res) {
                $('#Engineer').addClass('D_none')
                tipMsg('分配成功')
            }, function (err) {
                tipMsg('没有服务人员')
            })
            break;
        case '40':
            var toProviderData = {
                id: DetailId,
                provider: provider
            }
            orderDetail.toProvider(toProviderData, function (res) {
                window.location.href = "./OrderDetails.html?id=" + DetailId;
                $('#Engineer').addClass('D_none')
            }, function (err) {
                tipMsg(err.message)
            })
    }

})
// 新增
$('#D_FwBtn').bind('click', function () {
    var html = ' <tr class="D_addTr">\n' +
        '                            <td>\n' +
        '                                <input class="D_FwCheck" type="checkbox" name="D_FwCheck" />\n' +
        '                                <span class="isPeijian">配件</span>\n' +
        '                            </td>\n' +
        '                            <td><input class="D_Ipt" type="text"></td>\n' +
        '                            <td><input class="D_Ipt D_IptOne" type="text"></td>\n' +
        '                            <td><i class="D_IconFw layui-icon ">&#x1006;</i></td>\n' +
        '                        </tr>'

    $('#D_addTable').append(html)
    $('.D_IptOne').each(function () {
        $(this).keyup(function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));
        }).bind("paste", function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));

        })
    })
})

$('#D_addTable').on('click', '.D_FwCheck', function () {

    if ($(this).is(':checked')) {
        $(this).next().html('服务')
    } else {
        $(this).next().html('配件')
    }

})
// 删除j节点
$('#D_addTable').on('click', 'i', function () {
    $(this).parent().parent().remove()
})
// 关闭服务弹框
$('#O_Engineer').bind('click', function () {
    $('#over').addClass('D_none')
})

$('#D_FwBtnCancle').bind('click', function () {
    $('#over').addClass('D_none')

})
//确认完成弹框按钮
var details = []
var content = {}
$('#D_child').bind('click', function () {
    details = []
    $('.D_addTr').each(function () {
        content = {}//每次进来时都要清空一下，不然会覆盖上一次的结果
        if ($(this).children().eq(0).children().is(':checked')) {
            content.is_parts = 0
            content.content = $(this).children().eq(1).children().val()
            content.amount = $(this).children().eq(2).children().val()
        } else {
            content.is_parts = 1
            content.content = $(this).children().eq(1).children().val()
            content.amount = $(this).children().eq(2).children().val()
        }
        details.push(content)
    })
    var finishData = {
        id: DetailId,
        details: JSON.stringify(details)
    }

    orderDetail.finish(finishData, function (res) {
        window.location.href = "./OrderDetails.html?id=" + DetailId
    }, function (err) {
        tipMsg(err.message)
    })

})
//评星
// var inputBox = $('.comments-list').find('input');
$('.eval-star span').raty({
    click: function (score) {

        $('.eval-star input[name="star"]').val(score);
    },
    starOff: '../image/star_b_grray.jpg',
    starOn: '../image/star_b_red.jpg',
    starHalf: '../image/star_b_helf.jpg',
    half: true
});

//设置input,textarea默认值
if (!('placeholder' in document.createElement('input'))) {
    $('input[placeholder],textarea[placeholder]').each(function () {
        var that = $(this),
            text = that.attr('placeholder');

        if (that.val() === "") {
            that.val(text).addClass('placeholder');
        }
        that.focus(function () {
            if (that.val() === text) {
                that.val("").removeClass('placeholder');
            }
        }).blur(function () {
            if (that.val() === "") {
                that.val(text).addClass('placeholder');
            }
        }).closest('form').submit(function () {
            if (that.val() === text) {
                that.val('');
            }
        });
    });
}
$('#cancelBtn').bind('click', function () {
    var cancelId = {
        id: DetailId,
    }
    orderDetail.cancel(cancelId, function (res) {

        window.location.href = "./OrderDetails.html?id=" + DetailId;
    }, function (err) {
        tipMsg(err.message)
    })
})
//确认回访
$('#D_feedback').bind('click', function () {
    var feedbackId = {
        id: DetailId,
        content: $('#D_textaer').val()
    }

    orderDetail.feedback(feedbackId, function (res) {

        window.location.href = "./OrderDetails.html?id=" + DetailId + '&over=' + 1;
    }, function (err) {
        tipMsg(err.message)
    })
})
// 暂时跳转异常页面
$('#close').bind('click', function () {
    $('#D_Win').addClass('D_none')
    // window.location.href = "./OrderDetails.html?id=cance";
})



