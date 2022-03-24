let processTriggerList = [];
let processItemList = [];

function groupItem(){
	$.ajax({
		type: "POST",
		url: "groupItem.do",
		success: function (res) {
			getGroupItems(res);
			processItem();
			problemAlarmItem();
			processTriggerItem();
			
			$('.metismenu li>ul').hide();
			$('.has-arrow').click(function() {
				$(this).next().slideToggle();
				$(this).next().next().slideToggle();
			});
		},
		error: function (){
			console.log("faild!");
		}
		
	});
}

function processItem(){
	$.ajax({
		type: "POST",
		url: "processItem.do",
		success: function (res) {
			processItemList = res;
			for(let triggerIndex=0; triggerIndex<processTriggerList.length; triggerIndex++){
				for(let processIndex=0; processItemList.length; processIndex++){
					if(processTriggerList[triggerIndex].itemid == processItemList[processIndex].itemid){
						processTriggerList[triggerIndex].item = processItemList[processIndex];
                        break;
					} 
				}
			}
			//console.log(JSON.stringify(processTriggerList));
			getProcessItem(processTriggerList);
		},
		error: function (){
			console.log("faild!");
		}
		
	});
}

function problemAlarmItem(){
	$.ajax({
		type: "POST",
		url: "problemAlarmItem.do",
		success: function (res) {
			getProblemAlarmItem(res);
		},
		error: function (){
			console.log("faild!");
		}
		
	});
}

function processTriggerItem(){
	$.ajax({
		type: "POST",
		url: "processTrigger.do",
		success: function (res) {
			//console.log("trigger:"+JSON.stringify(res));
			processTriggerList = res;
		},
		error: function (){
			console.log("faild!");
		}
		
	});
}
