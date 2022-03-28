package api;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import dto.problemsAlarmDTO;
import dto.processTriggerDTO;

public class problemsAlarmApi {
	
	private static final Logger logger = LoggerFactory.getLogger(problemsAlarmApi.class);
	
	public List<problemsAlarmDTO> problemsAlarm() throws ParseException{
		String auth = "47405086481398866b0696edf90bfa53";
		String g_invokeId = "0";
		String problemsAlarmData;
		
		zabbixAPI api = new zabbixAPI();
		JSONObject json = new JSONObject();
		JSONObject param = new JSONObject();
		JSONArray output = new JSONArray();
		JSONArray sortfield = new JSONArray();
		JSONArray objectids = new JSONArray();

		json.put("jsonrpc", "2.0");
		json.put("method", "problem.get");
		json.put("id", g_invokeId);
		json.put("auth", auth);
		json.put("params", param);
		param.put("output", output);
		output.add(0, "objectid");
		output.add(0, "clock");
		output.add(0, "r_eventid");
		output.add(0, "r_clock");
		output.add(0, "r_ns");
		output.add(0, "name");
		param.put("objectids", objectids); //TriggerId
		processTriggerApi processTrigger = new processTriggerApi();
		List<processTriggerDTO> processTrigger_List = processTrigger.processTrigger();
		for(int triggerIdx=0; triggerIdx < processTrigger_List.size(); triggerIdx++) {
			objectids.add(triggerIdx, processTrigger_List.get(triggerIdx).getTriggerid());
		}
		param.put("recent",true);
		param.put("sortfield", sortfield);
		sortfield.add(0, "eventid");
		param.put("sortorder", "DESC");

		problemsAlarmData = api.Post(json);

		JSONParser parser = new JSONParser();
		Object problemAlarm = parser.parse(problemsAlarmData);
		JSONObject problemAlarm_obj = (JSONObject) problemAlarm;
		JSONArray problemAlarm_arr = (JSONArray) problemAlarm_obj.get("result");
		
		
		List<problemsAlarmDTO> problemAlarm_list = new ArrayList<problemsAlarmDTO>();
		for(int idx=0; idx < problemAlarm_arr.size(); idx++) {
			problemsAlarmDTO problemsAlarmDto = new problemsAlarmDTO();
			JSONObject problemAlarm_objs = (JSONObject)problemAlarm_arr.get(idx);
			problemsAlarmDto.setEventid(problemAlarm_objs.get("eventid").toString());
			problemsAlarmDto.setR_eventid(problemAlarm_objs.get("r_eventid").toString());
			problemsAlarmDto.setR_ns(problemAlarm_objs.get("r_ns").toString());
			problemsAlarmDto.setName(problemAlarm_objs.get("name").toString());
			problemsAlarmDto.setR_clock(problemAlarm_objs.get("r_clock").toString());
			problemsAlarmDto.setClock(problemAlarm_objs.get("clock").toString());
			problemsAlarmDto.setObjectid(problemAlarm_objs.get("objectid").toString());
			
			problemAlarm_list.add(problemsAlarmDto);
//			logger.info("problem: {}",problemsAlarmDto);
		}
		return problemAlarm_list;
	}
}
