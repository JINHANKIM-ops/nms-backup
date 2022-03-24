var g_processTriggerList = new Array();
var g_processItemList = new Array();
var g_processProblemList = new Array();

// TriggerID 만 조회하기 위해서, objectids 에 triggerid 만 넣는다.
function getProblemsAlarm() {
    var requestBody = {};
    requestBody.jsonrpc = "2.0";
    requestBody.id = getInvokeId();
    requestBody.auth = AUTH_KEY;
    requestBody.method = "problem.get";
    requestBody.params = {};
    requestBody.params.output = [
        "objectid", "clock", "r_eventid", "r_clock", "r_ns", "name"
    ];
    requestBody.params.objectids = [];
    for (let t = 0; t < g_processTriggerList.length; t++) {
        requestBody.params.objectids.push(g_processTriggerList[t].triggerid);
    }
    requestBody.params.recent = true;
    requestBody.params.sortfield = ["eventid"];
    requestBody.params.sortorder = "DESC";

    // 아직 host 정보가 없다면 진행하지 않음.
    if (requestBody.params.objectids.length <= 0) {
        console.log("There is no monitoring triggers.");
        return;
    }

    $.ajax({
        url: encodeURI(ZABBIX_API_URL),
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json-rpc',
        data: JSON.stringify(requestBody),
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (res) {
            if (res.error) {
                // 여기서 타이머를 멈추면 Alert 창이 나오지 않는다.
                console.log(res.error);
            } else {
                // console.log("getProblemsAlarm_res:", JSON.stringify(res.result));
                g_processProblemList = res.result;
                for (let p = 0; p < g_processProblemList.length; p++) {
                    g_processProblemList[p].items = [];
                    // "0" 이 아닌 것은 이미 해결된 것이다.
                    if (g_processProblemList[p].r_eventid != "0") {
                        continue;
                    }
                    for (let t = 0; t < g_processTriggerList.length; t++) {
                        // Problem 에 등록된 objectid 와 triggerid 가 동일한 것을 찾는다.
                        if (g_processProblemList[p].objectid == g_processTriggerList[t].triggerid) {
                            // trigger.function 에 있는 itemname 을 모두 problem 에 itemname 으로 저장한다.
                            for (let f = 0; f < g_processTriggerList[t].functions.length; f++) {
                                g_processProblemList[p].items.push(g_processTriggerList[t].functions[f].item);
                                // item 정보를 보관하고 있는 functions 배열에서 f 번째 아이템을 삭제한다.
                                g_processTriggerList[t].functions.splice(f, 1);
                            }
                        }
                    }
                }
                displayProcessList();
                displayAlarmList();
            }
        },
        error: function () {
            // 여기서 타이머를 멈추면 Alert 창이 나오지 않는다.
            console.log(`getProcessTriggers : Can not connect server ${ZABBIX_API_URL}`);
            return;
        },
        complete: function () {
        },
    });

}

function getProcessItems() {
    var requestBody = {};
    requestBody.jsonrpc = "2.0";
    requestBody.id = getInvokeId();
    requestBody.auth = AUTH_KEY;
    requestBody.method = "item.get";
    requestBody.params = {};
    requestBody.params.output = [
        "hostid",
        "itemid",
        "name",
        "key_",
        "state",
        "error",
        "lastclock",
        "lastns",
        "lastvalue",
        "prevvalue"
    ];
    requestBody.params.hostids = [];
    for (let i = 0; i < g_arrGroup.length; i++) {
        for (let j = 0; j < g_arrGroup[i].hosts.length; j++) {
            requestBody.params.hostids.push(g_arrGroup[i].hosts[j].hostid);
        }
    }
    requestBody.params.search = {
        "name": ENINMS_PRIFIX
    };

    // 아직 host 정보가 없다면 진행하지 않음.
    if (requestBody.params.hostids.length <= 0) {
        console.log("Not yet prepared hosts");
        return;
    }

    $.ajax({
        url: encodeURI(ZABBIX_API_URL),
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json-rpc',
        data: JSON.stringify(requestBody),
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (res) {
            if (res.error) {
                // 여기서 타이머를 멈추면 Alert 창이 나오지 않는다.
                console.log(res.error);
            } else {
                // console.log("getProcessItems_res:", JSON.stringify(res.result));
                // 결과, 감시 중인 프로세스 이름 설정. g_processTriggerList[t].functions[f].itemname
                g_processItemList = res.result;
                for (let t = 0; t < g_processTriggerList.length; t++) {
                    for (let f = 0; f < g_processTriggerList[t].functions.length; f++) {
                        for (let i = 0; i < g_processItemList.length; i++) {
                            if (g_processTriggerList[t].functions[f].itemid == '38877') {
                                console.log('FINDFINDFIND38877');
                                console.log(g_processItemList[i]);
                            }
                            if (g_processTriggerList[t].functions[f].itemid == g_processItemList[i].itemid) {
                                g_processTriggerList[t].functions[f].item = g_processItemList[i];
                                break;
                            }
                        }
                    }
                }
                console.log("Monitor Process List : ", JSON.stringify(g_processTriggerList));
                // 장애 알람을 가져온다.
                getProblemsAlarm();
            }
        },
        error: function () {
            // 여기서 타이머를 멈추면 Alert 창이 나오지 않는다.
            console.log(`getProcessTriggers : Can not connect server ${ZABBIX_API_URL}`);
            return;
        },
        complete: function () {
        },
    });
}

function getProcessTriggers() {
    g_processTriggerList = [];
    g_processItemList = [];
    g_processProblemList = [];

    var requestBody = {};
    requestBody.jsonrpc = "2.0";
    requestBody.id = getInvokeId();
    requestBody.auth = AUTH_KEY;
    requestBody.method = "trigger.get";
    requestBody.params = {};
    requestBody.params.output = [
        "triggerid",
        "expression",
        "description",
        "functions",
        "priority"
    ];
    requestBody.params.search = {
        "description": ENINMS_PRIFIX
    };
    requestBody.params.selectFunctions = [
        "functionid",
        "itemid"
    ];

    $.ajax({
        url: encodeURI(ZABBIX_API_URL),
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json-rpc',
        data: JSON.stringify(requestBody),
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (res) {
            if (res.error) {
                // 여기서 타이머를 멈추면 Alert 창이 나오지 않는다.
                console.log(res.error);
            } else {
                g_processTriggerList = res.result;
                getProcessItems();
            }
        },
        error: function () {
            // 여기서 타이머를 멈추면 Alert 창이 나오지 않는다.
            console.log(`getProcessTriggers : Can not connect server ${ZABBIX_API_URL}`);
            return;
        },
        complete: function () {
        },
    });
}

