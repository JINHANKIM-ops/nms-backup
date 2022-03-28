package dto;

import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class processTriggerDTO {
	private String expression;
	private JSONArray functions;
	private String triggerid;
	private String description;
	private String priority;
	
	public String getExpression() {
		return expression;
	}
	public void setExpression(String expression) {
		this.expression = expression;
	}
	public JSONArray getFunctions() {
		return functions;
	}
	public void setFunctions(JSONArray functions) {
		this.functions = functions;
	}
	public String getTriggerid() {
		return triggerid;
	}
	public void setTriggerid(String triggerid) {
		this.triggerid = triggerid;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	@Override
	public String toString() {
		return "processTriggerDTO [expression=" + expression + ", functions=" + functions + ", triggerid=" + triggerid
				+ ", description=" + description + ", priority=" + priority + "]";
	}
	
}
