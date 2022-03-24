package api;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import dto.processTriggerDTO;

public class processTriggerApi {
	
	public List<processTriggerDTO> processTrigger() throws ParseException{
		String auth = "47405086481398866b0696edf90bfa53";
		String g_invokeId = "0";
		String processTriggerData;
		
		zabbixAPI api = new zabbixAPI();
		JSONObject json = new JSONObject();
		JSONObject param = new JSONObject();
		JSONObject search = new JSONObject();
		JSONArray output = new JSONArray();
		JSONArray selectFunctions = new JSONArray();

		json.put("jsonrpc", "2.0");
		json.put("method", "trigger.get");
		json.put("id", g_invokeId);
		json.put("auth", auth);
		json.put("params", param);
		param.put("output", output);
		output.add(0, "triggerid");
		output.add(0, "expression");
		output.add(0, "description");
		output.add(0, "functions");
		output.add(0, "priority");
		param.put("search", search);
		search.put("description", "ENINMS");
		param.put("selectFunctions", selectFunctions);
		selectFunctions.add(0, "functionid");
		selectFunctions.add(0, "itemid");

		processTriggerData = api.Post(json);

		JSONParser parser = new JSONParser();
		Object processTrigger = parser.parse(processTriggerData);
		JSONObject processTrigger_obj = (JSONObject) processTrigger;
		JSONArray processTrigger_arr = (JSONArray) processTrigger_obj.get("result");

		List<processTriggerDTO> processTrigger_list = new ArrayList<processTriggerDTO>();
		for(int idx=0; idx < processTrigger_arr.size(); idx++) {
			processTriggerDTO processTriggerDto = new processTriggerDTO();
			JSONObject processTrigger_objs = (JSONObject)processTrigger_arr.get(idx);
			processTriggerDto.setExpression(processTrigger_objs.get("expression").toString());
			JSONArray functions_arr = (JSONArray)processTrigger_objs.get("functions");
			JSONObject functions_obj = (JSONObject)functions_arr.get(0);
			processTriggerDto.setItemid(functions_obj.get("itemid").toString());
			processTriggerDto.setFunctionid(functions_obj.get("functionid").toString());
			processTriggerDto.setTriggerid(processTrigger_objs.get("triggerid").toString());
			processTriggerDto.setDescription(processTrigger_objs.get("description").toString());
			processTriggerDto.setPriority(processTrigger_objs.get("priority").toString());
			
			processTrigger_list.add(processTriggerDto);
		}
		return processTrigger_list;
	}
}
