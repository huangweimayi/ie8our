' ͨ�õ��ýӿ�
sub CallDLL(DllName,Input,Output)
   Set ICDServer = CreateObject("ICDSC.ICDServer")
   ICDServer.CallDll "RQSDll.dll",DllName,Input,Output,True
   Set ICDServer = nothing
end Sub

' ��ȡ��ǰ��ϯ�����к���
function getCallerNo()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 1
    CallDll "UniInterface.dll", iInput, tempOutput
    getCallerNo = tempOutput
end Function

' ��ȡ��ǰ��ϯ�ı��к���
function getCalleeNo()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 2
    CallDll "UniInterface.dll", iInput, tempOutput
    getCalleeNo = tempOutput
end Function

' ��ȡ��ϯ��ǰ��ˮ��
function getOldSerialNo()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 3
    CallDll "UniInterface.dll", iInput, tempOutput
    getOldSerialNo = tempOutput
end Function

' ��ȡ����Ա����
function getWorkNo()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 4
    CallDll "UniInterface.dll", iInput, tempOutput
    getWorkNo = tempOutput
end Function

' ��ȡͨ����ʼʱ��
function getBeginTime()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 5
    CallDll "UniInterface.dll", iInput, tempOutput
    getBeginTime = tempOutput
end Function

' ��ȡͨ������ʱ��
function getEndTime()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 6
    CallDll "UniInterface.dll", iInput, tempOutput
    getEndTime = tempOutput
end Function


' ��ȡƽ̨����ID
function getCallID()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 7
    CallDll "UniInterface.dll", iInput, tempOutput
    getCallID = tempOutput
end Function


' ��ȡ��ǰ�Ƿ���ͨ��״̬
function isTalking()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 8
    CallDll "UniInterface.dll", iInput, tempOutput
    isTalking = tempOutput
end Function

' дt_log_biz��־
function addLogBIZ(ServiceType,CityCode,IncType,BeginDate,EndDate,UnitId,ContractItemID,MediaType,SrcDeviceId,DestDeviceType,DestDeviceId,IncId)    
    Dim iInput(1)
    Dim tempOutput
    iInput(0) = 9
    iInput(1) = ServiceType&"~"&CityCode&"~"&IncType&"~"&BeginDate& "~"&EndDate&"~"&UnitId&"~"&ContractItemID&"~"&MediaType&"~"&SrcDeviceId&"~"&DestDeviceType&"~"&DestDeviceId&"~"&IncId
    CallDll "UniInterface.dll", iInput, tempOutput
    addLogBIZ = tempOutput
end Function

' ת�Զ�����
Function transToIvr(iTypes, iValues, transType, accessCode)
    Dim iInput(4)
    Dim tempOutput
    iInput(0) = 10
    iInput(1) = iTypes
    iInput(2) = iValues
    iInput(3) = transType
    iInput(4) = accessCode
    CallDll "UniInterface.dll", iInput, tempOutput
    transToIvr = tempOutput
end Function

' ��ȡ114��ǰ��ˮ��
function getSerialNo()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 11
    CallDll "UniInterface.dll", iInput, tempOutput
    getSerialNo = tempOutput
end Function

' ��ȡ�û������켣
Function getKeyTrace()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 12
    CallDll "UniInterface.dll", iInput, tempOutput
    getKeyTrace = tempOutput
end Function

'��ȡ��չ�ֶ�1
Function GetExt1()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 13
    CallDll "UniInterface.dll", iInput, tempOutput
    GetExt1 = tempOutput
end Function

'��ȡ��չ�ֶ�2
Function GetExt2()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 14
    CallDll "UniInterface.dll", iInput, tempOutput
    GetExt2 = tempOutput
end Function

'��ȡ¼���ļ�
Function GetRecordFile()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 15
    CallDll "UniInterface.dll", iInput, tempOutput
    GetRecordFile = tempOutput
end Function

'��ȡ��̬���¼�ʼ���־�������Ψһ�ỰID
Function GetSessionID()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 16
    CallDll "UniInterface.dll", iInput, tempOutput
    GetSessionID = tempOutput
end Function

'��ȡ����Ա���б���CityCode
Function GetCityCode()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 17
    CallDll "UniInterface.dll", iInput, tempOutput
    GetCityCode = tempOutput
end Function

Function SaveSatisfyFile(SatisfyFile, Citycode)
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 9001
    iInput(1) = SatisfyFile
    iInput(2) = Citycode
    CallDll "UniInterface.dll", iInput, tempOutput
    SaveSatisfyFile = tempOutput
end Function

Function GetSkillQueueID()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 9002
    CallDll "UniInterface.dll", iInput, tempOutput
    GetSkillQueueID = tempOutput
end Function

Function TransToQueueVBS(transType, skillQueueID, skillQueueDesc)
    Dim iInput(3)
    Dim tempOutput
    iInput(0) = 9003
    iInput(1) = transType
    iInput(2) = skillQueueID
    iInput(3) = skillQueueDesc
    CallDll "UniInterface.dll", iInput, tempOutput
    TransToQueueVBS = tempOutput
end Function

Function SendCcsMessageVBS(workNo, message)
    Dim iInput(2)
    Dim tempOutput
    iInput(0) = 9004
    iInput(1) = workNo
    iInput(2) = message
    CallDll "UniInterface.dll", iInput, tempOutput
    SendCcsMessageVBS = tempOutput
end Function

Function WriteClientLog(message)
    Dim iInput(1)
    Dim tempOutput
    iInput(0) = 301
    iInput(1) = message
    CallDll "UniInterface.dll", iInput, tempOutput
    WriteClientLog = tempOutput
end Function