package repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import dao.nmsDAO;
import dto.problemsAlarmDTO;

public class problemsAlarmRepository {
	private List<problemsAlarmDTO> problemsAlarmRepository = new ArrayList<problemsAlarmDTO>();
	
	@Autowired
	nmsDAO nms_dao;
	
	public void setNms_dao(nmsDAO nms_dao) {
		this.nms_dao = nms_dao;
	}

    public void addproblemsAlarm(List<problemsAlarmDTO> problemsAlarmList) {
    	problemsAlarmRepository.addAll(problemsAlarmList);
    }
    
    public problemsAlarmDTO getProblemsAlarmDto(String id) {
    	String eventid="";
    	for(int i=0; i<problemsAlarmRepository.size(); i++) {
    		eventid = problemsAlarmRepository.get(i).getEventid();
    		if(id.equals(eventid)) {
    			return problemsAlarmRepository.get(i);
    		}
    	}
    	return null;
    }
    
    public boolean updateProblemsAlarmDto(problemsAlarmDTO newItem) {
    	String eventid="";
    	for(int i=0; i<problemsAlarmRepository.size(); i++) {
    		eventid = problemsAlarmRepository.get(i).getEventid();
    		if(newItem.getEventid().equals(eventid)) {
    			problemsAlarmRepository.set(i, newItem);
    			return true;
    		}
    	}
    	return false;
    }
    
    public boolean appendProblemsAlarmDto(problemsAlarmDTO newItem) {
    	if(updateProblemsAlarmDto(newItem)==true) {
    		return true;
    	}
    	return problemsAlarmRepository.add(newItem);
    }
    
    public List<problemsAlarmDTO> findAll() {
        return problemsAlarmRepository;
    }
}
