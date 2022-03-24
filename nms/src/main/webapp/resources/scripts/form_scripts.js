var beep_timer = null;
var beep_audio = null;
var g_alarmToggle = false;
var alarm_timer = null;
var hosts = [];
var sortHosts = [];
var CHART_CPU_INDEX = "cpu";
var CHART_MEMORY_INDEX = "memory";
var CHART_DISK_INDEX = "disk";
var CHART_SORT_INDEX = "";
// 버튼상태가 바뀔대마다 localStorage에 저장
// init()에서 localStorage에서 불러온다 - 화면이 만들어지지 않았기 때문에 init()에서 호출시 null값이 넘어온다
// localStorage에서 불러온 데이터를 g_alarmToggle 저장
// g_alarmToggle을 참조하여 화면에 반영 - 어느 시점에 반영하는가....
function startBeep() {
    stopBeep();
    if (g_alarmToggle == false) {
        return;
    }

    beep_timer = setInterval(startBeep, 1000);

    if (beep_audio == null) {
        beep_audio = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    }
    return beep_audio.play();
}

function stopBeep() {
    if (beep_timer != null) {
        clearInterval(beep_timer);
        beep_timer = null;
    }
}

//알람 스위치 제어
function beepBtn() {
    $('[type = "checkbox"]').click(function () {
        let ischecked = $(this).is(":checked");
        g_alarmToggle = ischecked;
        localStorage.setItem("status", ischecked);
    });
}

function showAlarmToggle() {
    let warnning_bell = $('#warnning_bell');
    warnning_bell.show();
}

function hideAlarmToggle() {
    let warnning_bell = $('#warnning_bell');
    warnning_bell.hide();
}

function getDatetime(timestamp) { //clock, 1646745898
    var date = new Date(parseInt(timestamp * 1000));
    return (
        date.getFullYear() +
        "." + `${("0" + (date.getMonth() + 1)).slice(-2)}` +
        "." + `${("0" + date.getDate()).slice(-2)}` +
        " " + `${("0" + date.getHours()).slice(-2)}` +
        ":" + `${("0" + date.getMinutes()).slice(-2)}` +
        ":" + `${("0" + date.getSeconds()).slice(-2)}`);
}

function applyJavascript() {
    $('.metismenu li>ul').hide();
    $('.has-arrow').click(function () {
        $(this).next().slideToggle();
    });

    $(".switcher-btn").on("click", function () {
        $(".switcher-wrapper").toggleClass("switcher-toggled")
    }), $(".close-switcher").on("click", function () {
        $(".switcher-wrapper").removeClass("switcher-toggled")
    });
}

function doChangeButtonStatus(sortButton) {
    var cpu = document.getElementById(CHART_CPU_INDEX);
    var memory = document.getElementById(CHART_MEMORY_INDEX);
    var disk = document.getElementById(CHART_DISK_INDEX);

    if (sortButton == CHART_CPU_INDEX) {
        cpu.setAttribute('class', 'tab_btn blue');
        memory.setAttribute('class', 'tab_btn');
        disk.setAttribute('class', 'tab_btn');
    } else if (sortButton == CHART_MEMORY_INDEX) {
        memory.setAttribute('class', 'tab_btn blue');
        cpu.setAttribute('class', 'tab_btn');
        disk.setAttribute('class', 'tab_btn');

    } else if (sortButton == CHART_DISK_INDEX) {
        disk.setAttribute('class', 'tab_btn blue');
        cpu.setAttribute('class', 'tab_btn');
        memory.setAttribute('class', 'tab_btn');
    }
}

function chartLine(index, chartType) {
    var chartClass = $(`#${index}-${chartType}`);
    if (CHART_SORT_INDEX == chartType) {
        chartClass.attr('class', 'card-body blue_border');
    } else {
        chartClass.attr('class', 'card-body');
    }
}

function chartTitle(index, hostname) {
    $(`#chart_title${index}`).text(hostname);
}

function getDivChart(index, value, title, id, chartType) {

    if (chartType == CHART_SORT_INDEX) {
        return `<div class="col-12 col-lg-4">
    <div class="card radius-10">
        <div class="card-body blue_border" id="${index}-${chartType}">
            <div>
                <h6 class="mb-0">${title}</h6>
            </div>
            <div class="chart-container-2 mt-4">
                <canvas id="chart${index}-${chartType}"></canvas>
            </div>
            <div class="usage_form">
                <h6 class="mb-0">사용량</h6>
                <span class="badge bg-danger rounded-pill" id="${id}">${parseFloat(value).toFixed(2)}%</span>
            </div>
        </div>
    </div>
</div>`;
    }
    else {
        return `<div class="col-12 col-lg-4">
    <div class="card radius-10">
        <div class="card-body" id="${index}-${chartType}">
            <div>
                <h6 class="mb-0">${title}</h6>
            </div>
            <div class="chart-container-2 mt-4">
                <canvas id="chart${index}-${chartType}"></canvas>
            </div>
            <div class="usage_form">
                <h6 class="mb-0">사용량</h6>
                <span class="badge bg-danger rounded-pill" id="${id}">${parseFloat(value).toFixed(2)}%</span>
            </div>
        </div>
    </div>
</div>`;
    }

}

function clearScreen() {
    $("#menu").empty();
}

function appendGroupElement(index, group) {
    let menu = $("#menu");
    menu.append(`<li id="group-${index}"></li>`);
    let groupElement = $(`#group-${index}`);
    groupElement.append('<a href="javascript:;" class="has-arrow">' + '<div class= "parent-icon">' + '<i class="bx bx-folder-open">' + '</i>' + '</div>' + '<div class="menu-title">' + `${group.name}` + '</div>' + '</a>');
    groupElement.append('<ul class="menu_slide" id=' + `"ul-group-${index}"` + '><li></li></ul>');
}

function appendServerElement(index, groupIndex, host) {
    let parent = $(`#ul-group-${groupIndex}`);
    parent.append(`<li class="menu_floor">
    <i class="bx bx-right-arrow-alt"></i>
    <span class="main_title">${host.name}</span>
    <p>
    <span class="menu_tit">CPU : </span>
    <span class="menu_data">${parseFloat(host.cpu).toFixed(2)}</span>
    <span class="menu_sym">%</span>
    <span class="menu_tit">MEM : </span>
    <span class="menu_data">${parseFloat(host.memory).toFixed(2)}</span>
    <span class="menu_sym">%</span>
    <span class="menu_tit">DISK : </span>
    <span class="menu_data">${parseFloat(host.disk).toFixed(2)}</span>
    <span class="menu_sym">%</span></p></li>`);
}

function removeAllChart() {
    for (let i = 0; i < g_arrItemChart.length; i++) {
        if (g_arrItemChart[i].cpu.chart) {
            g_arrItemChart[i].cpu.chart.destroy();
        }
        if (g_arrItemChart[i].memory.chart) {
            g_arrItemChart[i].memory.chart.destroy();
        }
        if (g_arrItemChart[i].disk.chart) {
            g_arrItemChart[i].disk.chart.destroy();
        }
    }
    g_arrItemChart = [];
    $('.page-content').empty();
}
// 기존에 생성한 항목이 있다면 해당 항목을 사용.
function getHostItemChart(index, host) {
    if (g_arrItemChart.length > index) {
        return g_arrItemChart[index];
    }

    let div_total = $('.page-content');
    div_total.append(`
        <div class="chart_title_form">
            <span class="chart_title" id="chart_title${index}">${host.name}</span>
            <div style="float:right;margin-right:2%;">
            <span class="chart_tit">CPU :</span>
            <span class="chart_data" id="chart-data-${index}-cpu">${parseFloat(host.cpu).toFixed(2)}%</span>
            <span class="chart_tit">MEM :</span>
            <span class="chart_data" id="chart-data-${index}-memory">${parseFloat(host.memory).toFixed(2)}%</span>
            <span class="chart_tit">DISK :</span>
            <span class="chart_data" id="chart-data-${index}-disk">${parseFloat(host.disk).toFixed(2)}%</span>
            </div>
        </div>`);
    div_total.append(`<div class="row" id="div-host-${index}"></div>`);

    var itemChart = [];
    itemChart.hostid = host.hostid;
    itemChart.cpu = {};
    itemChart.cpu.lastValue = 0;
    itemChart.cpu.chart = null;
    itemChart.memory = {};
    itemChart.memory.lastValue = 0;
    itemChart.memory.chart = null;
    itemChart.disk = {};
    itemChart.disk.lastValue = 0;
    itemChart.disk.chart = null;
    g_arrItemChart.push(itemChart);

    return g_arrItemChart[g_arrItemChart.length - 1];
}

function appendChart(index, host) {
    // null 이 반환되지는 않지만, null 확인 후 return
    hostItemChart = getHostItemChart(index, host);
    if (hostItemChart == null) {
        return;
    }

    let div_row = $(`#div-host-${index}`);
    // cpu chart 가 없다면 신규 생성.
    if (hostItemChart.cpu.chart == null) {
        div_row.append(getDivChart(`${index}`, host.cpu, 'CPU', `chart-badge-${index}-cpu`, CHART_CPU_INDEX));
        // 신규 생성하면서 값을 업데이트 함.
        hostItemChart.cpu.lastValue = host.cpu;
        hostItemChart.cpu.chart = util_chart(`${index}`, host.cpu, CHART_CPU_INDEX);
    } else {
        // https://www.chartjs.org/docs/latest/developers/api.html
        // Index 1 이 사용량임. 같지 않을 경우에만 업데이트
        if (hostItemChart.cpu.lastValue != host.cpu) {
            $(`#chart-data-${index}-cpu`).text(parseFloat(host.cpu).toFixed(2) + "%");
            $(`#chart-badge-${index}-cpu`).text(parseFloat(host.cpu).toFixed(2) + "%");
            hostItemChart.cpu.chart.data.datasets[DATASET_INDEX_0].data[DATA_INDEX_FREE] = parseFloat(100 - host.cpu).toFixed(2);
            hostItemChart.cpu.chart.data.datasets[DATASET_INDEX_0].data[DATA_INDEX_USED] = parseFloat(host.cpu).toFixed(2);
            hostItemChart.cpu.chart.update();
            hostItemChart.cpu.lastValue = host.cpu;
        }
        chartLine(index, CHART_CPU_INDEX);
    }

    // memory chart 가 없다면 신규 생성.
    if (hostItemChart.memory.chart == null) {
        div_row.append(getDivChart(`${index}`, host.memory, 'MEM', `chart-badge-${index}-memory`, CHART_MEMORY_INDEX));
        // 신규 생성하면서 값을 업데이트 함.
        hostItemChart.memory.lastValue = host.memory;
        hostItemChart.memory.chart = util_chart(`${index}`, host.memory, CHART_MEMORY_INDEX);
    } else {
        // https://www.chartjs.org/docs/latest/developers/api.html
        // Index 1 이 사용량임. 같지 않을 경우에만 업데이트
        if (hostItemChart.memory.lastValue != host.memory) {
            $(`#chart-data-${index}-memory`).text(parseFloat(host.memory).toFixed(2) + "%");
            $(`#chart-badge-${index}-memory`).text(parseFloat(host.memory).toFixed(2) + "%");
            hostItemChart.memory.chart.data.datasets[DATASET_INDEX_0].data[DATA_INDEX_FREE] = parseFloat(100 - host.memory).toFixed(2);
            hostItemChart.memory.chart.data.datasets[DATASET_INDEX_0].data[DATA_INDEX_USED] = parseFloat(host.memory).toFixed(2);
            hostItemChart.memory.chart.update();
            hostItemChart.memory.lastValue = host.memory;
        }
        chartLine(index, CHART_MEMORY_INDEX);
    }

    // disk chart 가 없다면 신규 생성.
    if (hostItemChart.disk.chart == null) {
        div_row.append(getDivChart(`${index}`, host.disk, 'DISK', `chart-badge-${index}-disk`, CHART_DISK_INDEX));
        // 신규 생성하면서 값을 업데이트 함.
        hostItemChart.disk.lastValue = host.disk;
        hostItemChart.disk.chart = util_chart(`${index}`, host.disk, CHART_DISK_INDEX);
    } else {
        // https://www.chartjs.org/docs/latest/developers/api.html
        // Index 1 이 사용량임. 같지 않을 경우에만 업데이트
        if (hostItemChart.disk.lastValue != host.disk) {
            $(`#chart-data-${index}-disk`).text(parseFloat(host.disk).toFixed(2) + "%");
            $(`#chart-badge-${index}-disk`).text(parseFloat(host.disk).toFixed(2) + "%");
            hostItemChart.disk.chart.data.datasets[DATASET_INDEX_0].data[DATA_INDEX_FREE] = parseFloat(100 - host.disk).toFixed(2);
            hostItemChart.disk.chart.data.datasets[DATASET_INDEX_0].data[DATA_INDEX_USED] = parseFloat(host.disk).toFixed(2);
            hostItemChart.disk.chart.update();
            hostItemChart.disk.lastValue = host.disk;
        }
        chartLine(index, CHART_DISK_INDEX);
    }
    chartTitle(index, host.name);
}

function displayAlarmList() {

    let alarmTboby = $('#alram-tbody');
    alarmTboby.empty();
    let isAppendItem = false;
    for (let groupIndex = 0; groupIndex < g_arrGroup.length; groupIndex++) {
        for (let hostIndex = 0; hostIndex < g_arrGroup[groupIndex].hosts.length; hostIndex++) {
            if (g_arrGroup[groupIndex].hosts[hostIndex].available == 2) {
                alarmTboby.append(`<tr><td id="alarmTr">${g_arrGroup[groupIndex].hosts[hostIndex].name}</td><td>${getDatetime(g_arrGroup[groupIndex].hosts[hostIndex].disable_until)}</td></tr>`);
                startBeep();
                showAlarmToggle();
                isAppendItem = true;
            }
        }
    }

    for (let p = 0; p < g_processProblemList.length; p++) {
        for (let i = 0; i < g_processProblemList[p].items.length; i++) {
            let processName = g_processProblemList[p].items[i].name;
            if (processName.indexOf(ENINMS_PRIFIX) != 0) {
                continue;
            }
            alarmTboby.append(`<tr><td>${processName.replace(ENINMS_PRIFIX, "")}</td><td>${getDatetime(g_processProblemList[p].clock)}</td></tr>`);
            startBeep();
            showAlarmToggle();
            isAppendItem = true;
        }
    }

    if (isAppendItem == false) {
        hideAlarmToggle();
        stopBeep();
    }
}

function displayProcessList() {

    let processTable = $('#process_tbody');
    processTable.empty();
    let idx = 0;
    for (let t = 0; t < g_processTriggerList.length; t++) {
        for (let f = 0; f < g_processTriggerList[t].functions.length; f++) {
            let processName = g_processTriggerList[t].functions[f].item.name;
            if (processName.indexOf(ENINMS_PRIFIX) != 0) {
                continue;
            }
            processTable.append(`<tr><td id="pro-${idx}">${processName.replace(ENINMS_PRIFIX, "")}</td></tr>`);
            //5, 4등급은 WARNING, 나머지 등급은 DISATER로 표시
            let proName = $(`#pro-${idx}`);
            if (g_processTriggerList[t].priority == 5 || g_processTriggerList[t].priority == 4) {
                let text = ' - WARNING';
                proName.append(text);
            } else {
                let text = ' - DISATER';
                proName.append(text);
            }
            idx++;
        }
    }
}

function display_data() {

    clearScreen();
    //서버가 다운되었을때 차트를 삭제하는 함수
    for (let groupIndex = 0; groupIndex < g_arrGroup.length; groupIndex++) {
        for (let hostIndex = 0; hostIndex < g_arrGroup[groupIndex].hosts.length; hostIndex++) {
            if (g_arrGroup[groupIndex].hosts[hostIndex].avaliable == "2") {
                removeAllChart();
                break;
            }
        }
    }
    //left 그룹ID 데이터를 적용시키는 함수
    for (let groupIndex = 0; groupIndex < g_arrGroup.length; groupIndex++) {
        appendGroupElement(groupIndex, g_arrGroup[groupIndex]);
        for (let hostIndex = 0; hostIndex < g_arrGroup[groupIndex].hosts.length; hostIndex++) {
            if (g_arrGroup[groupIndex].hosts[hostIndex].available == "2") {
                continue;
            }
            appendServerElement(hostIndex, groupIndex, g_arrGroup[groupIndex].hosts[hostIndex]);
        }
    }

    //g_arrGroup 배열에 hoids 배열을 1차원 배열로 생성한다
    //생성된 배열을 sort()함수를 적용시킨다
    //아래의 2중 for문을 hostid 배열을 순환하는 단일 for문으로 만든다
    //적용된 배열의 hostIndex를 appendChart()에 적용시킨다
    //g_arrGroup[groupIndex].hosts[hostIndex] -> hosts[hostIndex]

    // //가운데 화면에 차트를 그리는 함수
    // for (let groupIndex = 0; groupIndex < g_arrGroup.length; groupIndex++) {
    //     for (let hostIndex = 0; hostIndex < g_arrGroup[groupIndex].hosts.length; hostIndex++) {
    //         if (g_arrGroup[groupIndex].hosts[hostIndex].available == "2") {
    //             continue;
    //         }
    //         appendChart(g_arrGroup[groupIndex].hosts[hostIndex]);
    //     }
    // }
    display_chart();
}

function sortArr() {
    //2차원 group배열을 1차원 host배열로 변경 
    var hostsIndex = 0;
    for (let groupIndex = 0; groupIndex < g_arrGroup.length; groupIndex++) {
        for (let hostIndex = 0; hostIndex < g_arrGroup[groupIndex].hosts.length; hostIndex++) {
            hosts[hostsIndex] = g_arrGroup[groupIndex].hosts[hostIndex];
            hostsIndex++;
        }
    }
    //cpu사용량이 많은 순서로 저장
    //if문을 걸어서 memory, disk순으로 정렬
    if (CHART_SORT_INDEX == CHART_CPU_INDEX) {
        sortHosts = hosts.sort(function (a, b) {
            return b.cpu - a.cpu;
        });
    } else if (CHART_SORT_INDEX == CHART_MEMORY_INDEX) {
        sortHosts = hosts.sort(function (a, b) {
            return b.memory - a.memory;
        });
    } else if (CHART_SORT_INDEX == CHART_DISK_INDEX) {
        sortHosts = hosts.sort(function (a, b) {
            return b.disk - a.disk;
        });
    }
}

//현재는 차트오브젝트를 화면에 그린 후 호스트ID로 기존 만들어진 오브젝트를 찾아서 가져오게 되어있다
//데이터가 갱신될 때 정렬된 데이터에 대한 차트가 그려지는게 아니라 기존의 차트에 갱신된 데이터가 적용되어 그려진다. 화면에 표시되는 차트는 정렬이 안된다
//기존의 호스트ID 값이 키값으로 설정된 차트의 카값을 인덱스로 변경한다.
//정렬된 데이터를 루프를 돌면서 해당 인덱스의 차트를 가져온다. appendChart.getHostItemChart
//해당 차트의 데이터를 갱신한다. appendChart
function display_chart() {
    sortArr();
    //차트 생성시 스크롤이 위로 올라가기때문에 지우면 안된다
    // removeAllChart(); //차트를 지운다
    for (let sortIndex = 0; sortIndex < sortHosts.length; sortIndex++) {
        appendChart(sortIndex, sortHosts[sortIndex]);
    }
}

function onSortButtonClicked(val) {
    //정렬기준이 변경되었는지 검사
    //새로운 정렬기준 val이고, 기존의 정렬기준은 CHART_SORT_INDEX 이다
    //새로운 정렬기준과 기존의 정렬기준이 같은 값이면 return한다. 
    if (CHART_SORT_INDEX === val) {
        return;
    }
    //다르면 새로운 정렬기준 값을 변수에 저장한다 
    CHART_SORT_INDEX = val;
    //localStorage에 새로운 정렬기준을 저장한다.
    localStorage.setItem('sortBtn', val);
    //버튼상태 변경
    doChangeButtonStatus(val);

}

// function search() {
//     var searchInput = document.getElementById('searchProcess').value;
//     var stringCompare = [];
//     console.log(searchInput);

//     let compartIndex = 0;
//     for (let t = 0; t < g_processTriggerList.length; t++) {
//         for (let f = 0; f < g_processTriggerList[t].functions.length; f++) {
//             stringCompare[compartIndex] = g_processTriggerList[t].functions[f].item.name;
//             compartIndex++;
//         }
//     }

//     if (searchInput != null) {
//         let processTable = $('#process_tbody');
//         processTable.empty();

//         for (let i = 0; i < stringCompare.length; i++) {
//             if (stringCompare[i].indexOf(ENINMS_PRIFIX) != 0) {
//                 continue;
//             }
//             if (stringCompare[i].indexOf(searchInput) != -1) {
//                 console.log(stringCompare[i].search(searchInput));
//                 processTable.append(`<tr><td>${stringCompare[i].replace(ENINMS_PRIFIX, "")}</td></tr>`);
//             }
//         }

//     } else {
//         displayProcessList();
//     }

// }
