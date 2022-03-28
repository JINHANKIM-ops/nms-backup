package api;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class zabbixAPI {
	private static final Logger logger = LoggerFactory.getLogger(zabbixAPI.class);
	public String Post(JSONObject json) {
		try {
			URL url = new URL("http://119.66.109.149:10480/zabbix/api_jsonrpc.php");
			
            HttpURLConnection connection = null;

            try {
                connection = (HttpURLConnection) url.openConnection();
                connection.setDoOutput(true);
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");

                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream(),
                        StandardCharsets.UTF_8));
                writer.write(json.toString()); //Throw JSON data here
                writer.flush();

                if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    try (InputStreamReader isr = new InputStreamReader(connection.getInputStream(),
                            StandardCharsets.UTF_8);
                         BufferedReader reader = new BufferedReader(isr)) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                        	//logger.info("ZabbixApi : {}", line);
                                return line; //Receive JSON data here
                        }
                    }
                }
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }
}

