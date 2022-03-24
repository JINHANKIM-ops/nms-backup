package dto;

public class processItemDTO {
	private String itemid;
	private String key_;
	private String lastns;
	private String lastvalue;
	private String name;
	private String hostid;
	private String prevvalue;
	private String state;
	private String error;
	private String lastclock;
	
	public String getItemid() {
		return itemid;
	}
	public void setItemid(String itemid) {
		this.itemid = itemid;
	}
	public String getKey_() {
		return key_;
	}
	public void setKey_(String key_) {
		this.key_ = key_;
	}
	public String getLastns() {
		return lastns;
	}
	public void setLastns(String lastns) {
		this.lastns = lastns;
	}
	public String getLastvalue() {
		return lastvalue;
	}
	public void setLastvalue(String lastvalue) {
		this.lastvalue = lastvalue;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getHostid() {
		return hostid;
	}
	public void setHostid(String hostid) {
		this.hostid = hostid;
	}
	public String getPrevvalue() {
		return prevvalue;
	}
	public void setPrevvalue(String prevvalue) {
		this.prevvalue = prevvalue;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public String getLastclock() {
		return lastclock;
	}
	public void setLastclock(String lastclock) {
		this.lastclock = lastclock;
	}
	
	@Override
	public String toString() {
		return "processItemDTO [itemid=" + itemid + ", key_=" + key_ + ", lastns=" + lastns + ", lastvalue=" + lastvalue
				+ ", name=" + name + ", hostid=" + hostid + ", prevvalue=" + prevvalue + ", state=" + state + ", error="
				+ error + ", lastclock=" + lastclock + "]";
	}
	
}
