package repository;

import java.util.ArrayList;
import java.util.List;

public class problemsGroupCheck {
	private String problemsGroupCheck = "";
	private List<String> checkHostId = new ArrayList<String>();
	
	public String getProblemsGroupCheck() {
		return problemsGroupCheck;
	}

	public List<String> getCheckHostId() {
		return checkHostId;
	}

	public void setCheckHostId(List<String> checHostkId) {
		this.checkHostId = checHostkId;
	}

}
