package dto;

import java.util.ArrayList;
import java.util.List;

public class groupItemDTO {
	private String disable_until;
	private String name;
	private String available;
	private String hostid;
	private ArrayList<String> groups;
	
	public String getDisable_until() {
		return disable_until;
	}
	public void setDisable_until(String disable_until) {
		this.disable_until = disable_until;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAvailable() {
		return available;
	}
	public void setAvailable(String available) {
		this.available = available;
	}
	public String getHostid() {
		return hostid;
	}
	public void setHostid(String hostid) {
		this.hostid = hostid;
	}
	public ArrayList<String> getGroups() {
		return groups;
	}
	public void setGroups(ArrayList<String> groups) {
		this.groups = groups;
	}
	@Override
	public String toString() {
		return "groupItemDTO [disable_until=" + disable_until + ", name=" + name + ", available=" + available
				+ ", hostid=" + hostid + ", groups=" + groups + "]";
	}
	
}
