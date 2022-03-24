package api;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import dto.groupItemDTO;
import dto.hostItemDTO;

public class hostItemApi {
	public List<hostItemDTO> hostItem() throws ParseException {
		String hostData;
		String auth = "47405086481398866b0696edf90bfa53";
		String g_invokeId = "0";

		zabbixAPI api = new zabbixAPI();
		JSONObject json = new JSONObject();
		JSONObject param = new JSONObject();
		JSONObject filter = new JSONObject();

		JSONArray output = new JSONArray();
		JSONArray key_ = new JSONArray();
		JSONArray hostids = new JSONArray();
		
		json.put("jsonrpc", "2.0");
		json.put("method", "item.get");
		json.put("params", param);
		param.put("output", output);
		output.add(0, "hostid");
		output.add(1, "name");
		output.add(2, "key_");
		output.add(3, "prevvalue");
		output.add(4, "lastvalue");
		param.put("filter", filter);
		filter.put("key_", key_);
		key_.add(0, "system.cpu.util");
		key_.add(1, "vm.memory.utilization");
		key_.add(2, "vfs.fs.size[/,pused]");
		json.put("id", g_invokeId);
		json.put("auth", auth);
		param.put("sortfield", "name");
		param.put("hostids", hostids);
		groupItemApi groupItem = new groupItemApi();
		List<groupItemDTO> group_list = groupItem.groupItem();
		for(int groupIndex=0; groupIndex < group_list.size(); groupIndex++) {
			hostids.add(groupIndex, group_list.get(groupIndex).getHostid());
		}
		hostData = api.Post(json);

		JSONParser parser = new JSONParser();
		JSONObject host = (JSONObject)parser.parse(hostData);
		JSONArray host_arr = (JSONArray) host.get("result");
		
		List<hostItemDTO> host_list = new ArrayList<hostItemDTO>();
		for(int idx=0; idx < host_arr.size(); idx++) {
			hostItemDTO hostItemDto = new hostItemDTO();
			JSONObject host_obj = (JSONObject)host_arr.get(idx);
			hostItemDto.setItemid(host_obj.get("itemid").toString());
			hostItemDto.setHostid(host_obj.get("hostid").toString());
			hostItemDto.setName(host_obj.get("name").toString());
			hostItemDto.setKey_(host_obj.get("key_").toString());
			hostItemDto.setPrevvalue(host_obj.get("prevvalue").toString());
			hostItemDto.setLastvalue(host_obj.get("lastvalue").toString());
			
			host_list.add(hostItemDto);
		}
		return host_list;
	}
}
