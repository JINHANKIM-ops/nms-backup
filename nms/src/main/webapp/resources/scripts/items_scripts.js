// Error Code 정의
var ERROR_SESSION_TERMINATED = -32602;

// Configuration 항목 정의
var ZABBIX_API_URL = "";
var DEFAULT_USER_ID = "";
var DEFAULT_PASSWORD = "";
var AUTH_KEY = "";
var ENINMS_PRIFIX = "";
var INTERVAL_GET_HOST = 5000;
var INTERVAL_GET_PROCESS = 5000;

var g_chartIndex = 0;
var g_invokeId = 0;
var g_hostMonitorTimerId = null;
var g_processMonitorTimerId = null;

var g_arrGroup = new Array();
var g_arrItemChart = new Array();

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

function init() {
    g_alarmToggle = localStorage.getItem("status");
    // "status" 의 값은 string(문자열) 이지만, 형변환 될 경우도 있으므로 정확하게 검사. false 인 경우와 item 이 없는 경우를 구분해야 함.
    if (g_alarmToggle === "false") {
        g_alarmToggle = false;
    } else {
        g_alarmToggle = true;
    }
    console.log(`g_alarmToggle : ${g_alarmToggle}`);
    if (g_alarmToggle == true) {
        if (startBeep() == undefined) {
            alert("Please turn on the alarm button to play alert sound manually!");
            g_alarmToggle = false;
        }
        stopBeep();
    }

    $('input:checkbox[id="checkbox"]').attr("checked", g_alarmToggle);
    //getEninmsInfo();
	startFetchTimer();
    CHART_SORT_INDEX = localStorage.getItem('sortBtn');
    // 이전에 저장된 값이 없을 경우, 기본값으로 CHART_CPU_INDEX 을 넣어준다.
    if (!CHART_SORT_INDEX) {
        CHART_SORT_INDEX = CHART_CPU_INDEX;
    }
    doChangeButtonStatus(CHART_SORT_INDEX);
    // document.querySelector('input[type=search]').setAttribute('id', 'searchProcess');
    // document.querySelector('input[type=search]').setAttribute('onkeyup', 'search()');
}

function getInvokeId() {
    return String(g_invokeId++);
}

function startFetchTimer() {
    stopFetchTimer();

    getGroupData();
    g_hostMonitorTimerId = setInterval(getGroupData, INTERVAL_GET_HOST);

    getProcessTriggers();
    g_processMonitorTimerId = setInterval(getProcessTriggers, INTERVAL_GET_PROCESS);
}

function stopFetchTimer() {
    if (g_hostMonitorTimerId != null) {
        clearInterval(g_hostMonitorTimerId);
        g_hostMonitorTimerId = null;
    }
    if (g_processMonitorTimerId != null) {
        clearInterval(g_processMonitorTimerId);
        g_processMonitorTimerId = null;
    }
}

function saveAuthKey(auth) {
    var eninmsInfoUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/save`;

    var requestBody = {};
    requestBody.auth = auth;

    $.ajax({
        url: encodeURI(eninmsInfoUrl),
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (res) {
            if (res.error) {
                console.log(res.error);
            } else {
                console.log(res.result);
            }
        },
        error: function () {
            console.log("error");
        },
        complete: function () {
        },
    });
}

function getEninmsInfo() {
    var eninmsInfoUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/info`;
	console.log(eninmsInfoUrl);
    $.ajax({
        url: encodeURI(eninmsInfoUrl),
        type: 'GET',
        accept: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (res) {
            if (res.error) {
                alert("Can not read default configuration. Please contact admin.");
                return;
            } else {
                try {
                    ZABBIX_API_URL = `${res.server.protocol}//${res.server.zabbixHost}:${res.server.zabbixPort}/zabbix/api_jsonrpc.php`;
                    DEFAULT_USER_ID = res.server.id;
                    DEFAULT_PASSWORD = res.server.password;
                    AUTH_KEY = res.server.auth;
                    ENINMS_PRIFIX = res.monitoring.prefix;
                    INTERVAL_GET_HOST = res.client.intervalGetHost;
                    INTERVAL_GET_PROCESS = res.client.intervalGetProcess;
                    if (AUTH_KEY.length <= 0) {
                        if ((!ZABBIX_API_URL.length) || (!DEFAULT_USER_ID.length) || (!DEFAULT_PASSWORD.length)) {
                            alert("Can not read default configuration. Please contact admin.");
                            return;
                        }
                        loginZabbix();
                        return;
                    } else {
                        // Auth Key 가 있으므로 무조건 시작.
                        console.log("Success login and start fetch data.");
                        startFetchTimer();
                    }
                } catch (error) {
                    console.error(error);
                    return;
                }
            }
        },
        error: function () {
            alert("Can not read default configuration. Please contact admin.");
            return;
        },
        complete: function () {
        },
    });
}

// 로그인을 하는 경우는 AUTH_KEY 가 없거나, zabbix 에 요청패킷을 보냈는데, -32602 린턴이 온 경우임.
function loginZabbix() {

    var requestBody = {};
    requestBody.jsonrpc = "2.0";
    requestBody.id = getInvokeId();
    requestBody.auth = null;
    requestBody.method = "user.login";
    requestBody.params = {};
    requestBody.params.user = DEFAULT_USER_ID;
    requestBody.params.password = DEFAULT_PASSWORD;

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
                // 로그인 시에 Error 가 온 것은 무조건 관리자에게 문의해야 한다.
                stopFetchTimer();
                alert(`Can not read default configuration. Please contact admin. (ErrorCode:${res.error.code})`);
                return;
            } else {
                AUTH_KEY = res.result;
                // async 로 보내도 되므로 함수만 호출.
                saveAuthKey(AUTH_KEY);
                // 이제 Timer 시작.
                startFetchTimer();
                return;
            }
        },
        error: function () {
            stopFetchTimer();
            alert("Error on login zabbix!");
        },
        complete: function () {
        },
    });

}

function getHost(hostid) {
    let i = 0;
    let j = 0;
    for (i = 0; i < g_arrGroup.length; i++) {
        for (j = 0; j < g_arrGroup[i].hosts.length; j++) {
            if (g_arrGroup[i].hosts[j].hostid == hostid) {
                break;
            }
        }
        if (g_arrGroup[i].hosts.length > j) {
            break;
        }
    }
    if (g_arrGroup.length > i) {
        return g_arrGroup[i].hosts[j];
    }
    return null;
}

function getHostUtils() {
    var requestBody = {};
    requestBody.jsonrpc = "2.0";
    requestBody.id = getInvokeId();
    requestBody.auth = AUTH_KEY;
    requestBody.method = "item.get";
    requestBody.params = {};
    requestBody.params.output = [
        "hostid",
        "name",
        "key_",
        "prevvalue",
        "lastvalue"
    ];
    requestBody.params.filter = {
        "key_": [
            "system.cpu.util",
            "vm.memory.size[pavailable]", //사용가능한 메모리 %로 표시
            "vm.memory.size[available]",
            "vm.memory.utilization", //메모리 사용량
            "vfs.fs.size[/,pused]",
            "vfs.fs.size[/boot,pused]"
        ]
    };
    requestBody.params.sortfield = "name";
    requestBody.params.hostids = [];
    for (let i = 0; i < g_arrGroup.length; i++) {
        for (let j = 0; j < g_arrGroup[i].hosts.length; j++) {
            requestBody.params.hostids.push(g_arrGroup[i].hosts[j].hostid);
        }
    }

    $.ajax({
        url: encodeURI("hostItem.do"),
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json-rpc',
        data: JSON.stringify(requestBody),
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (res) {
            if (res.error) {
                console.log(res.error);
            } else {
                // console.log("getHostUtil_res:", JSON.stringify(res.result));
                for (let i = 0; i < res.length; i++) {
                    let host = getHost(res[i].hostid);
                    // console.log(host);
                    if (host == null) {
                        continue;
                    }
                    if (res[i].key_ == 'system.cpu.util') {
                        host.cpu = res[i].lastvalue;
                    }
                    if (res[i].key_ == 'vfs.fs.size[/,pused]') {
                        host.disk = res[i].lastvalue;
                    }
                    if (res[i].key_ == 'vm.memory.utilization') {
                        host.memory = res[i].lastvalue;
                    }
                }
                console.log("Monitor Group/Host List : ", JSON.stringify(g_arrGroup));
            }
        },
        error: function () {
            alert(`getHostItems : Can not connect server ${ZABBIX_API_URL}`);
            stopFetchTimer();
            return;
        },
        complete: function () {
            display_data();
        },
    });
}

function getGroupData() {

    var requestBody = {};
    requestBody.jsonrpc = "2.0";
    requestBody.id = getInvokeId();
    requestBody.auth = AUTH_KEY;
    requestBody.method = "host.get";
    requestBody.params = {};
    requestBody.params.output = [
        "hostid",
        "name",
        "available",
        "disable_until"
    ];
    requestBody.params.selectGroups = "extend";
    requestBody.params.sortfield = "name";

    $.ajax({
        url: encodeURI("groupItem.do"),
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json-rpc',
        data: JSON.stringify(requestBody),
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (res) {
            if (res.error) {
                console.log(res.error);
                if (res.error.code == ERROR_SESSION_TERMINATED) {
                    loginZabbix();
                    return;
                }
            } else {
                g_arrGroup = [];
                //console.log("group_res:", JSON.stringify(res));
                for (let hostIndex = 0; hostIndex < res.length; hostIndex++) {
                    var group = "";
                    var server = "";
                    // TODO: 예외처리 필요, groups가 없을 경우, groups가 2개 이싱일 경우
                    // 0 번째 측 문자열 시작이 ENINMS_PREFIX 가 아닌 것은 사용하지 않음.
                    if (res[hostIndex].groups[0].name.indexOf(ENINMS_PRIFIX) != 0) {
                        continue;
                    }
                    // 기존에 저장된 거에서 같은 그룹을 찾아온다
                    let findIndex = -1;
                    for (let i = 0; i < g_arrGroup.length; i++) {
                        if (g_arrGroup[i].groupid == res[hostIndex].groups[0].groupid) {
                            findIndex = i;
                            break;
                        }
                    }
                    //못찾을 경우
                    if (findIndex == -1) {
                        let group = {};
                        group.groupid = res[hostIndex].groups[0].groupid;
                        group.name = res[hostIndex].groups[0].name.replace(ENINMS_PRIFIX, "");
                        group.hosts = [];
                        g_arrGroup.push(group);
                        findIndex = g_arrGroup.length - 1;
                    }

                    let host = {};
                    host.hostid = res[hostIndex].hostid;
                    host.name = res[hostIndex].name;
                    host.available = res[hostIndex].available;
                    host.disable_until = res[hostIndex].disable_until;
                    g_arrGroup[findIndex].hosts.push(host);
                }
                g_arrGroup = g_arrGroup.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                getHostUtils();
            }
        },
        error: function () {
            alert(`getGroupData : Can not connect server ${ZABBIX_API_URL}`);
            stopFetchTimer();
            return;
        },
        complete: function () {
            // if (g_arrGroup.length > 0) {
            //     console.log(g_arrGroup);
            // }
        },
    });
}