package api;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import dto.groupItemDTO;

public class groupItemApi {
	
	public List<groupItemDTO> groupItem() throws ParseException {
		String groupData;
		//TODO: authKey를 property 객체의 값으로 변경
//		String auth = "47405086481398866b0696edf90bfa53";
		String auth = "47405086481398866b0696edf90b";
		String g_invokeId = "0";

		zabbixAPI api = new zabbixAPI();
		JSONObject json = new JSONObject();
		JSONObject param = new JSONObject();

		JSONArray output = new JSONArray();

		json.put("jsonrpc", "2.0");
		json.put("method", "host.get");
		json.put("id", g_invokeId);
		json.put("auth", auth);
		json.put("params", param);
		param.put("output", output);
		output.add(0, "hostid");
		output.add(1, "name");
		output.add(2, "available");
		output.add(3, "disable_until");
		param.put("selectGroups", "extend");
		param.put("sortfield", "name");

		groupData = api.Post(json);

		JSONParser parser = new JSONParser();
		JSONObject group_obj = (JSONObject)parser.parse(groupData);
		JSONArray group_arr = (JSONArray) group_obj.get("result");
		
		List<groupItemDTO> group_list = new ArrayList<groupItemDTO>();
		for(int idx=0; idx < group_arr.size(); idx++) {
			groupItemDTO groupItemDto = new groupItemDTO();
			JSONObject group_info_obj = (JSONObject)group_arr.get(idx);
			JSONArray groups_arr = (JSONArray)group_info_obj.get("groups");
			groupItemDto.setGroups(groups_arr);
			groupItemDto.setName(group_info_obj.get("name").toString());
			groupItemDto.setHostid(group_info_obj.get("hostid").toString());
			groupItemDto.setAvailable(group_info_obj.get("available").toString());
			groupItemDto.setDisable_until(group_info_obj.get("disable_until").toString());
			
			group_list.add(groupItemDto);
		}
		return group_list;
	}
}
