' 通用调用接口
sub CallDLL(DllName,Input,Output)
   Set ICDServer = CreateObject("ICDSC.ICDServer")
   ICDServer.CallDll "RQSDll.dll",DllName,Input,Output,True
   Set ICDServer = nothing
end Sub

' 获取当前坐席的主叫号码
function getCallerNo()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 1
    CallDll "UniInterface.dll", iInput, tempOutput
    getCallerNo = tempOutput
end Function

' 获取当前坐席的被叫号码
function getCalleeNo()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 2
    CallDll "UniInterface.dll", iInput, tempOutput
    getCalleeNo = tempOutput
end Function

' 获取坐席当前流水号
function getOldSerialNo()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 3
    CallDll "UniInterface.dll", iInput, tempOutput
    getOldSerialNo = tempOutput
end Function

' 获取话务员工号
function getWorkNo()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 4
    CallDll "UniInterface.dll", iInput, tempOutput
    getWorkNo = tempOutput
end Function

' 获取通话开始时间
function getBeginTime()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 5
    CallDll "UniInterface.dll", iInput, tempOutput
    getBeginTime = tempOutput
end Function

' 获取通话结束时间
function getEndTime()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 6
    CallDll "UniInterface.dll", iInput, tempOutput
    getEndTime = tempOutput
end Function


' 获取平台呼叫ID
function getCallID()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 7
    CallDll "UniInterface.dll", iInput, tempOutput
    getCallID = tempOutput
end Function


' 获取当前是否处于通话状态
function isTalking()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 8
    CallDll "UniInterface.dll", iInput, tempOutput
    isTalking = tempOutput
end Function

' 写t_log_biz日志
function addLogBIZ(ServiceType,CityCode,IncType,BeginDate,EndDate,UnitId,ContractItemID,MediaType,SrcDeviceId,DestDeviceType,DestDeviceId,IncId)    
    Dim iInput(1)
    Dim tempOutput
    iInput(0) = 9
    iInput(1) = ServiceType&"~"&CityCode&"~"&IncType&"~"&BeginDate& "~"&EndDate&"~"&UnitId&"~"&ContractItemID&"~"&MediaType&"~"&SrcDeviceId&"~"&DestDeviceType&"~"&DestDeviceId&"~"&IncId
    CallDll "UniInterface.dll", iInput, tempOutput
    addLogBIZ = tempOutput
end Function

' 转自动流程
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

' 获取114当前流水号
function getSerialNo()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 11
    CallDll "UniInterface.dll", iInput, tempOutput
    getSerialNo = tempOutput
end Function

' 获取用户按键轨迹
Function getKeyTrace()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 12
    CallDll "UniInterface.dll", iInput, tempOutput
    getKeyTrace = tempOutput
end Function

'获取扩展字段1
Function GetExt1()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 13
    CallDll "UniInterface.dll", iInput, tempOutput
    GetExt1 = tempOutput
end Function

'获取扩展字段2
Function GetExt2()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 14
    CallDll "UniInterface.dll", iInput, tempOutput
    GetExt2 = tempOutput
end Function

'获取录音文件
Function GetRecordFile()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 15
    CallDll "UniInterface.dll", iInput, tempOutput
    GetRecordFile = tempOutput
end Function

'获取动态库记录质检日志后产生的唯一会话ID
Function GetSessionID()
    Dim iInput(0)
    Dim tempOutput
    iInput(0) = 16
    CallDll "UniInterface.dll", iInput, tempOutput
    GetSessionID = tempOutput
end Function

'获取话务员地市编码CityCode
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