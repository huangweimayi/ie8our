// 获取当前坐席的主叫号码
function call_getCallerNo()
{
    return getCallerNo();
}

// 获取话务员工号
function call_getWorkNo()
{
    return getWorkNo();
}

// 获取话务员地市编码CityCode
function call_getCityCode()
{
    return GetCityCode();
}

//转接
function call_transToIvr_smc(phone)
{
	return transToIvr("41", phone, "0", "120718");
}