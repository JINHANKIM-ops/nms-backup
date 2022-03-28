package dto;

public class groupItemDetailDTO {
	private String hostid;
	private String name;
	public String getHostid() {
		return hostid;
	}
	public void setHostid(String hostid) {
		this.hostid = hostid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return "groupItemDetaiDTO [hostid=" + hostid + ", name=" + name + "]";
	}
	
}
