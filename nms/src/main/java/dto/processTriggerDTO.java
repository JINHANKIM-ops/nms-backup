package dto;

public class processTriggerDTO {
	private String expression;
	private String itemid;
	private String functionid;
	private String triggerid;
	private String description;
	private String priority;
	
	public String getExpression() {
		return expression;
	}
	public void setExpression(String expression) {
		this.expression = expression;
	}
	public String getItemid() {
		return itemid;
	}
	public void setItemid(String itemid) {
		this.itemid = itemid;
	}
	public String getFunctionid() {
		return functionid;
	}
	public void setFunctionid(String functionid) {
		this.functionid = functionid;
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
		return "processTriggerDTO [expression=" + expression + ", itemid=" + itemid + ", functionid=" + functionid
				+ ", triggerid=" + triggerid + ", description=" + description + ", priority=" + priority + "]";
	}
	
}
