package api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import dto.groupItemDTO;
import dto.processItemDTO;

public class processItemApi {
	
	public List<processItemDTO> processItem() throws ParseException{
		String auth = "47405086481398866b0696edf90bfa53";
		String g_invokeId = "0";
		String processData;
		
		zabbixAPI api = new zabbixAPI();
		JSONObject json = new JSONObject();
		JSONObject param = new JSONObject();
		JSONArray output = new JSONArray();
		JSONArray hostids = new JSONArray();
		JSONObject search = new JSONObject();
		
		json.put("jsonrpc", "2.0");
		json.put("method", "item.get");
		json.put("id", g_invokeId);
		json.put("auth", auth);
		json.put("params", param);
		param.put("output", output);
		output.add(0, "hostid");
		output.add(0, "itemid");
		output.add(0, "name");
		output.add(0, "key_");
		output.add(0, "state");
		output.add(0, "error");
		output.add(0, "lastclock");
		output.add(0, "lastns");
		output.add(0, "lastvalue");
		output.add(0, "prevvalue");
		param.put("hostids", hostids); //Group HostId
		groupItemApi groupItem = new groupItemApi();
		List<groupItemDTO> group_list = groupItem.groupItem();
		for(int groupIndex=0; groupIndex < group_list.size(); groupIndex++) {
			hostids.add(groupIndex, group_list.get(groupIndex).getHostid());
		}
		
		param.put("search", search);
		search.put("name", "ENINMS");

		processData = api.Post(json);

		JSONParser parser = new JSONParser();
		Object process = parser.parse(processData);
		JSONObject process_obj = (JSONObject) process;
		JSONArray process_arr = (JSONArray) process_obj.get("result");

		List<processItemDTO> processItem_list = new ArrayList<processItemDTO>();
		for(int idx=0; idx < process_arr.size(); idx++) {
			processItemDTO processItemDto = new processItemDTO();
			JSONObject processItem_obj = (JSONObject)process_arr.get(idx);
			processItemDto.setItemid(processItem_obj.get("itemid").toString());
			processItemDto.setHostid(processItem_obj.get("hostid").toString());
			processItemDto.setName(processItem_obj.get("name").toString());
			processItemDto.setKey_(processItem_obj.get("key_").toString());
			processItemDto.setPrevvalue(processItem_obj.get("prevvalue").toString());
			processItemDto.setLastvalue(processItem_obj.get("lastvalue").toString());
			processItemDto.setState(processItem_obj.get("state").toString());
			processItemDto.setError(processItem_obj.get("error").toString());
			processItemDto.setLastclock(processItem_obj.get("lastclock").toString());
			processItemDto.setLastns(processItem_obj.get("lastns").toString());
			
			processItem_list.add(processItemDto);
		}
		return processItem_list;
	}
}
