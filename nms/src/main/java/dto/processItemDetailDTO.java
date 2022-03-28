package dto;

public class processItemDetailDTO {
	private String p_itemId;
	private String p_name;
	private String p_hostName;
	
	public String getP_itemId() {
		return p_itemId;
	}
	public void setP_itemId(String p_itemId) {
		this.p_itemId = p_itemId;
	}
	public String getP_name() {
		return p_name;
	}
	public void setP_name(String p_name) {
		this.p_name = p_name;
	}
	public String getP_hostName() {
		return p_hostName;
	}
	public void setP_hostName(String p_hostName) {
		this.p_hostName = p_hostName;
	}
	
	@Override
	public String toString() {
		return "processItemDetailDTO [p_itemId=" + p_itemId + ", p_name=" + p_name + ", p_hostName=" + p_hostName + "]";
	}
	
}
