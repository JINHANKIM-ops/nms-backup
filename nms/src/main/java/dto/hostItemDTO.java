package dto;

public class hostItemDTO {
	private String itemid;
	private String key_;
	private String lastvalue;
	private String name;
	private String hostid;
	private String prevvalue;

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
	
	@Override
	public String toString() {
		return "[itemid=" + itemid + ", key_=" + key_ + ", lastvalue=" + lastvalue + ", name=" + name
				+ ", hostid=" + hostid + ", prevvalue=" + prevvalue + "]";
	}
	
}
