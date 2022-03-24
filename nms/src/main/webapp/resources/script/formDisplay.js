let groupItems = [];
let sortHosts = [];
let status = "cpu";
let g_alarmToggle = false;
let beep_timer = null;
let beep_audio = null;

//Alarm Sound ON
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
//Alarm Sound OFF
function stopBeep() {
    if (beep_timer != null) {
        clearInterval(beep_timer);
        beep_timer = null;
    }
}
//Alarm Sign ON 
function showAlarmToggle() {
    let warnning_bell = $('#warnning_bell');
    warnning_bell.show();
}
//Alarm Sign OFF
function hideAlarmToggle() {
    let warnning_bell = $('#warnning_bell');
    warnning_bell.hide();
}
//AlarmButton
function beepBtn(){
	$('[type = "checkbox"]').click(function () {
        let ischecked = $(this).is(":checked");
		console.log(ischecked);
        g_alarmToggle = ischecked;
        localStorage.setItem("alarmBtn_status", ischecked);

		//Alarm 소리 제어
		if (ischecked == true) {
			startBeep();
		} else {
			stopBeep();
		}
	});
}

function display_groupName(groupname){
	var left = $('#left');
	left.append(`<a href="javascript:;" class="has-arrow">
							<div class="parent-icon">
								<i class='bx bx-folder-open'></i>
							</div>
							<div class="menu-title">${groupname}</div>
						</a>`);
}

function display_chart_inPageDiv(hostIdx){
	var page= $('#page');
	page.append(`<div class="row" id="div_row${hostIdx}"></div>`);
}

function display_chart_host(name, cpu, mem, disk){
	var page= $('#page');
	page.append(`<div class="chart_title_form">
							<span class="chart_title">${name}</span>
							<div style="float:right;margin-right:2%;">
								<span class="chart_tit">CPU :</span>
								<span class="chart_data">${cpu}</span>
								<span class="chart_sym">%</span>
								
								<span class="chart_tit">MEM :</span>
								<span class="chart_data">${mem}</span>
								<span class="chart_sym">%</span>
								
								<span class="chart_tit">DISK :</span>
								<span class="chart_data">${disk}</span>
								<span class="chart_sym">%</span>
							</div>
						</div>`);
}

function display_chart(idx, str, uservalue, hostIdx, status){
	var div_row = $(`#div_row${hostIdx}`);
	
	
	div_row.append(`<div class="col-12 col-lg-4 ">
							<div class="card radius-10">
								<div class="card-body" id="card_chart${idx}">
									<div>
										<h6 class="mb-0">${str}</h6>
									</div>
									<div class="chart-container-2 mt-4">
										<canvas id="chart${idx}-${str}"></canvas>
									</div>
									<div class="usage_form">
										<h6 class="mb-0">사용량</h6>
										<span class="badge bg-danger rounded-pill">${uservalue}%</span>
									</div>
								</div>
							</div>
						</div>
						   `);
}

function dislplay_host(name, cpu, mem, disk){
	var left = $(`#left`);
	left.append(`<ul class="menu_slide">
							<li class="menu_floor"><i class="bx bx-right-arrow-alt"></i>
								<span class="main_title">${name}</span>
									<p>
										<span class="menu_tit">CPU : </span> 
										<span class="menu_data">${cpu}</span>
										<span class="menu_sym">%</span> 
											
										<span class="menu_tit">MEM : </span> 
										<span class="menu_data">${mem}</span> 
										<span class="menu_sym">%</span>
											
										<span class="menu_tit">DISK : </span> 
										<span class="menu_data">${disk}</span>
										<span class="menu_sym">%</span>
									</p>
							</li>
						</ul>`);
}

function getGroupItems(res){
	let name = [];
			for(let i=0; i<res.length; i++){
				name[i] = res[i].groupname;	
			}
			
			name = Array.from(new Set(name));	
			
			let groupItem_arr = [];
			for(let i=0; i<name.length; i++){
				let group = [];
				let items= {};
				items.groupid = res[i].groupid;
				items.groupname = res[i].groupname;
				items.available = res[i].available;
				items.disable_until = res[i].disable_until;
				group.push(items);
				for(let j=0; j<res.length; j++){
					if(name[i] == res[j].groupname){
						let host = {};
						host.hostid = res[j].hostid;
						host.name = res[j].name;
						host.cpu = res[j].cpu;
						host.mem = res[j].mem;
						host.disk = res[j].disk;
						group.push(host);
					}
				}
				groupItem_arr[i] = group;
			}
			groupItems = groupItem_arr;
			//console.log(JSON.stringify(groupItem_arr));
			gethostItem(groupItem_arr);
			sort_chart_display(localStorage.getItem('btn_status'));
			
}

function gethostItem(groupItem_arr){
	for (let groupIndex = 0; groupIndex < groupItem_arr.length; groupIndex++) {
		display_groupName(groupItem_arr[groupIndex][0].groupname.substr(7,15));
		for (let hostIndex = 1; hostIndex < groupItem_arr[groupIndex].length; hostIndex++) {
			dislplay_host(groupItem_arr[groupIndex][hostIndex].name,
				parseFloat(groupItem_arr[groupIndex][hostIndex].cpu).toFixed(2),
				parseFloat(groupItem_arr[groupIndex][hostIndex].mem).toFixed(2),
				parseFloat(groupItem_arr[groupIndex][hostIndex].disk).toFixed(2));
		}
	}
}

function getChartItem(){
	let index=1;
	for (let hostIndex = 0; hostIndex < sortHosts.length; hostIndex++) {
			
			display_chart_host(sortHosts[hostIndex].name,
				parseFloat(sortHosts[hostIndex].cpu).toFixed(2),
				parseFloat(sortHosts[hostIndex].mem).toFixed(2),
				parseFloat(sortHosts[hostIndex].disk).toFixed(2));
			
			display_chart_inPageDiv(hostIndex + 1);
			//cpu	
			for (let idx = 0; idx < 1; idx++) {
				display_chart(index, 'CPU', parseFloat(sortHosts[hostIndex].cpu).toFixed(2),  hostIndex+1);
				util_chart(index, parseFloat(sortHosts[hostIndex].cpu).toFixed(2), 'CPU');
				if(status == 'cpu'){
					$(`#card_chart${index}`).attr('class', 'card-body blue_border');
					$('#sort_btn_cpu').attr('class', 'tab_btn blue');
					$('#sort_btn_mem').attr('class', 'tab_btn');
					$('#sort_btn_disk').attr('class', 'tab_btn');
				}
				index++;
			}
			//mem
			for (let idx = 0; idx < 1; idx++) {
				display_chart(index, 'MEM', parseFloat(sortHosts[hostIndex].mem).toFixed(2),  hostIndex+1);
				util_chart(index, parseFloat(sortHosts[hostIndex].mem).toFixed(2), 'MEM');
				if(status == 'mem'){
					$(`#card_chart${index}`).attr('class', 'card-body blue_border');
					$('#sort_btn_cpu').attr('class', 'tab_btn');
					$('#sort_btn_mem').attr('class', 'tab_btn blue');
					$('#sort_btn_disk').attr('class', 'tab_btn');
				}
				index++;
			}
			//disk
			for (let idx = 0; idx < 1; idx++) {
				display_chart(index, 'DISK', parseFloat(sortHosts[hostIndex].disk).toFixed(2),  hostIndex+1);
				util_chart(index, parseFloat(sortHosts[hostIndex].disk).toFixed(2), 'DISK');
				if(status == 'disk'){
					$(`#card_chart${index}`).attr('class', 'card-body blue_border');
					$('#sort_btn_cpu').attr('class', 'tab_btn');
					$('#sort_btn_mem').attr('class', 'tab_btn');
					$('#sort_btn_disk').attr('class', 'tab_btn blue');
				}
				index++;
			}
	}
}

function getProcessItem(processTrigger_list){
	var processs_tbody = $('#process_tbody');
	processs_tbody.empty();
	let idx=0;
	
	for(let i=0; i < processTrigger_list.length; i++){
		processs_tbody.append(`<tr>
							<td id="pro-${idx}">${processTrigger_list[i].item.name.replace('ENINMS', '').replace('ENI NMS', '')}</td>									
						</tr>`);
		//5, 4등급은 WARNING, 나머지 등급은 DISATER로 표시
		let proName = $(`#pro-${idx}`);
		if (processTrigger_list[i].priority == 5 || processTrigger_list[i].priority == 4) {
			let text = ' - WARNING';
			proName.append(text);
		} else {
			let text = ' - DISATER';
			proName.append(text);
		}
		idx++;
	}
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

function getProblemAlarmItem(problemAlarm_list){
	var alarm_tbody = $('#alarm_tbody');
	alarm_tbody.empty();
	for(let i=0; i<problemAlarm_list.length; i++){
		alarm_tbody.append(`<tr>
							<td>${problemAlarm_list[i].name.substr(7).replace('trigger', '')}</td>	
							<td>${getDatetime(problemAlarm_list[i].clock)}</td>
						</tr>`);
	}
	//알람신호 제어
	if($('#alarm_tbody').children().length){
		showAlarmToggle();
	}else{
		hideAlarmToggle();
	}
}

function sort_chart_display(btn_status){
	status = btn_status;
	localStorage.setItem('btn_status', btn_status);
	sort_chart_data(status);
	$('#page *').remove();
	getChartItem();
}

function sort_chart_data(btn_status){
	let hosts = [];
	var index = 0;
    for (let groupIndex = 0; groupIndex < groupItems.length; groupIndex++) {
        for (let hostIndex = 1; hostIndex < groupItems[groupIndex].length; hostIndex++) {
            hosts[index] = groupItems[groupIndex][hostIndex];
            index++;
        }
    }
	
	if(btn_status == 'cpu'){
		sortHosts = hosts.sort(function (a, b) {
            return b.cpu - a.cpu;
        });
	} else if(btn_status == 'mem'){
		sortHosts = hosts.sort(function (a, b) {
            return b.mem - a.mem;
        });
	} else if(btn_status == 'disk'){
		sortHosts = hosts.sort(function (a, b) {
            return b.disk - a.disk;
        });
	}
}