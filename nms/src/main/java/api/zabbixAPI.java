package api;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import config.NmsConfig;
import service.nmsService;


public class zabbixAPI {
	private static final Logger logger = LoggerFactory.getLogger(zabbixAPI.class);
	@Autowired
	nmsService nmsservice;
	public String Post(JSONObject json) {
		try {
			//TODO: http://119.66.109.149:10480/zabbix/api_jsonrpc.php 설정파일에서 불러온 내용으로 변경
			URL url = new URL("http://119.66.109.149:10480/zabbix/api_jsonrpc.php");
			
            HttpURLConnection connection = null;
            JSONObject response = null;
            try {
                connection = (HttpURLConnection) url.openConnection();
                connection.setDoOutput(true);
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                json.put("auth", "47405086481398866b0696edf90bfa53");
                
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream(),
                        StandardCharsets.UTF_8));
                writer.write(json.toString()); //Throw JSON data here
                writer.flush();
                
                if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    InputStreamReader isr = new InputStreamReader(connection.getInputStream(),
                            StandardCharsets.UTF_8);
                         BufferedReader reader = new BufferedReader(isr);
                         StringBuilder sb = new StringBuilder();
                         String line = "";
                        while ((line = reader.readLine()) != null) {
//                        	logger.info("ZabbixApi : {}", line);
                        	sb.append(line);
//                            return line; //Receive JSON data here
                        }
//                        NmsConfig nmsConfig = nmsservice.getNms_configBean();
//                        logger.info("config : {}", nmsConfig.getProperty("auth"));
                    //error.code: -32602 일때 
                    //zabbix에 로그인 다시 해야함
                    //재로그인한 결과에 오는 Authkey를 프로퍼티에 업데이트하고 이 authKey를 사용해서 다시 데이터를 가져와야 된다
                    //잘못된 Authkey로 접속했을때 결과값을 전부 받아와야 한다
//                    JSONObject response = new JSONObject(sb.toString());
                        //성공해뜰때, 실패했을때 겨롸값을 전부 읽어야 한다
                       // 실패: response: {"id":"0","jsonrpc":"2.0","error":{"code":-32602,"data":"Session terminated, re-login, please.","message":"Invalid params."}}
                       // 성공: response: {"result":[{"disable_until":"0","name":"DEV.107","available":"1","hostid":"10439","groups":[{"internal":"0","groupid":"20","name":"ENINMS ENI UCE","flags":"0"}]},{"disable_until":"0","name":"DEV.109","available":"1","hostid":"10441","groups":[{"internal":"0","groupid":"18","name":"ENINMS ENI IVR","flags":"0"}]},{"disable_until":"0","name":"IVR.102","available":"1","hostid":"10438","groups":[{"internal":"0","groupid":"19","name":"ENINMS ENI SMS","flags":"0"}]},{"disable_until":"0","name":"NMS.104","available":"1","hostid":"10084","groups":[{"internal":"0","groupid":"21","name":"ENINMS ENI NMS","flags":"0"}]},{"disable_until":"0","name":"NMS.108","available":"1","hostid":"10440","groups":[{"internal":"0","groupid":"21","name":"ENINMS ENI NMS","flags":"0"}]},{"disable_until":"0","name":"UCE.106","available":"1","hostid":"10443","groups":[{"internal":"0","groupid":"20","name":"ENINMS ENI UCE","flags":"0"}]}],"id":"0","jsonrpc":"2.0"}
                      
                        JSONParser parser = new JSONParser();
        	            Object obj = parser.parse(sb.toString());
        	            response = new JSONObject();
        	            response = (JSONObject) obj;
//        	            logger.info("response: {}", response.toJSONString());
        	            //결과값 중에 error 메시시 유무 황인
        	            if(response.get("error") == null) {
        	            	return sb.toString();
        	            } else {
        	            	//결과값 중에 result 메시지 유무 확인
        	            	loginItemApi loginApi = new loginItemApi();
        	            	String auth = loginApi.loginItem();
        	            	logger.info("auth : {}", auth);
        	            	return "";
        	            }
        	            
                }
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
        	e.printStackTrace();
        }
		
        return "";
    }
	
//	public JSONObject GET() {
//		HttpURLConnection connection = null;
//		JSONObject response = null;
//		
//		try {
//	        URL url = new URL("http://119.66.109.149:10480/zabbix/api_jsonrpc.php");
//	        connection = (HttpURLConnection) url.openConnection();
//	        
//	        connection.setDoOutput(true);
//	        connection.setRequestMethod("GET");
//	        connection.setRequestProperty("Content-Type", "application/json");
//	        connection.setRequestProperty("id", "0");
//	 
//	        int responseCode = connection.getResponseCode();
//	        if (responseCode == 401) {
//	            System.out.println("401:: Header를 확인해주세요.");
//	        } else if (responseCode == 500) {
//	            System.out.println("500:: 서버 에러");
//	        } else { // response
//	            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
//	            StringBuilder sb = new StringBuilder();
//	            String line = "";
//	            while ((line = br.readLine()) != null) {
//	                sb.append(line);
//	            }
//	            JSONParser parser = new JSONParser();
//	            Object obj = parser.parse(sb.toString());
//	            response = new JSONObject();
//	            response = (JSONObject) obj;
//	            JSONObject error = (JSONObject) response.get("error");
//	            logger.info("response: {}", response.toJSONString());
//	            	if(error.get("code").equals("-32682")) {
//		            	
//		            }
//	            
//	        }
//	    } catch (MalformedURLException e) {
//	        e.printStackTrace();
//	    } catch (IOException e) {
//	        e.printStackTrace();
//	    } catch (Exception e) {
//	    	e.printStackTrace();
//	    }
//
//		return response;
//	}
 }

