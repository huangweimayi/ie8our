// ��ȡ��ǰ��ϯ�����к���
function call_getCallerNo()
{
    return getCallerNo();
}

// ��ȡ����Ա����
function call_getWorkNo()
{
    return getWorkNo();
}

// ��ȡ����Ա���б���CityCode
function call_getCityCode()
{
    return GetCityCode();
}

//ת��
function call_transToIvr_smc(phone)
{
	return transToIvr("41", phone, "0", "120718");
}