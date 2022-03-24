package repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import dao.nmsDAO;
import dto.processTriggerDTO;

public class processTriggerRepository {
	private List<processTriggerDTO> processTriggerRepository = new ArrayList<processTriggerDTO>();
	
	@Autowired
	nmsDAO nms_dao;
	
	public void setNms_dao(nmsDAO nms_dao) {
		this.nms_dao = nms_dao;
	}

    public void addprocessTrigger(List<processTriggerDTO> processTriggerList) {
    	processTriggerRepository.addAll(processTriggerList);
    }
    
    public processTriggerDTO getProcessTriggerDto(String id) {
    	String itemid="";
    	for(int i=0; i<processTriggerRepository.size(); i++) {
    		itemid = processTriggerRepository.get(i).getItemid();
    		if(id.equals(itemid)) {
    			return processTriggerRepository.get(i);
    		}
    	}
    	return null;
    }
    
    public boolean updateProcessTriggerDto(processTriggerDTO newItem) {
    	String itemid="";
    	for(int i=0; i<processTriggerRepository.size(); i++) {
    		itemid = processTriggerRepository.get(i).getItemid();
    		if(newItem.getItemid().equals(itemid)) {
    			processTriggerRepository.set(i, newItem);
    			return true;
    		}
    	}
    	return false;
    }
    
    public boolean appendProcessTriggerDto(processTriggerDTO newItem) {
    	if(updateProcessTriggerDto(newItem)==true) {
    		return true;
    	}
    	return processTriggerRepository.add(newItem);
    }
    
    public List<processTriggerDTO> findAll() {
        return processTriggerRepository;
    }
}
