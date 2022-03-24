package repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import dao.nmsDAO;
import dto.processItemDTO;

public class processItemRepository {
	private List<processItemDTO> processItemRepository = new ArrayList<processItemDTO>();
	
	@Autowired
	nmsDAO nms_dao;
	
	public void setNms_dao(nmsDAO nms_dao) {
		this.nms_dao = nms_dao;
	}

    public void addprocessItem(List<processItemDTO> processItemList) {
    	processItemRepository.addAll(processItemList);
    }
    
    public processItemDTO getProcessItemDto(String id) {
    	String itemid="";
    	for(int i=0; i<processItemRepository.size(); i++) {
    		itemid = processItemRepository.get(i).getItemid();
    		if(id.equals(itemid)) {
    			return processItemRepository.get(i);
    		}
    	}
    	return null;
    }
    
    public boolean updateProcessItemDto(processItemDTO newItem) {
    	String itemid="";
    	for(int i=0; i<processItemRepository.size(); i++) {
    		itemid = processItemRepository.get(i).getItemid();
    		if(newItem.getItemid().equals(itemid)) {
    			processItemRepository.set(i, newItem);
    			return true;
    		}
    	}
    	return false;
    }
    
    public boolean appendProcessItemDto(processItemDTO newItem) {
    	if(updateProcessItemDto(newItem)==true) {
    		return true;
    	}
    	return processItemRepository.add(newItem);
    }
    
    public List<processItemDTO> findAll() {
        return processItemRepository;
    }
}
