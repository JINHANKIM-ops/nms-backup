package api;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class loginItemApi {
	private static final Logger logger = LoggerFactory.getLogger(loginItemApi.class);
	public String loginItem() throws ParseException {
		String loginItem;
		String auth = null;
		String g_invokeId = "0";

		zabbixAPI api = new zabbixAPI();
		JSONObject json = new JSONObject();
		JSONObject param = new JSONObject();

		json.put("jsonrpc", "2.0");
		json.put("method", "user.login");
		json.put("id", g_invokeId);
		json.put("auth", auth);
		json.put("params", param);
		param.put("user", "Admin");
		param.put("password", "zabbix");

		loginItem = api.Post(json);

		JSONParser parser = new JSONParser();
		JSONObject login_obj = (JSONObject)parser.parse(loginItem);
		String login_auth = login_obj.get("result").toString();
		
		return login_auth;
	}
}
