package dto;

import java.util.ArrayList;

public class problemsAlarmDTO {
	private String eventid;
	private String r_eventid;
	private String r_ns;
	private String name;
	private String r_clock;
	private String clock;
	private String objectid;
	private ArrayList<String> item = new ArrayList<String>();
	
	public String getEventid() {
		return eventid;
	}
	public void setEventid(String eventid) {
		this.eventid = eventid;
	}
	public String getR_eventid() {
		return r_eventid;
	}
	public void setR_eventid(String r_eventid) {
		this.r_eventid = r_eventid;
	}
	public String getR_ns() {
		return r_ns;
	}
	public void setR_ns(String r_ns) {
		this.r_ns = r_ns;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getR_clock() {
		return r_clock;
	}
	public void setR_clock(String r_clock) {
		this.r_clock = r_clock;
	}
	public String getClock() {
		return clock;
	}
	public void setClock(String clock) {
		this.clock = clock;
	}
	public String getObjectid() {
		return objectid;
	}
	public void setObjectid(String objectid) {
		this.objectid = objectid;
	}
	public ArrayList<String> getItem() {
		return item;
	}
	public void setItem(ArrayList<String> item) {
		this.item = item;
	}
	@Override
	public String toString() {
		return "problemsAlarmDTO [eventid=" + eventid + ", r_eventid=" + r_eventid + ", r_ns=" + r_ns + ", name=" + name
				+ ", r_clock=" + r_clock + ", clock=" + clock + ", objectid=" + objectid + ", item=" + item + "]";
	}
	
}
