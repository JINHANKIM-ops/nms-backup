package repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import dao.nmsDAO;
import dto.hostItemDTO;

public class hostItemRepository {
	private List<hostItemDTO> hostItemRepository = new ArrayList<hostItemDTO>();
	
	@Autowired
	nmsDAO nms_dao;
	
	public void setNms_dao(nmsDAO nms_dao) {
		this.nms_dao = nms_dao;
	}

    public void addhostItem(List<hostItemDTO> hostItemList) {
    	hostItemRepository.addAll(hostItemList);
    }
    
    public hostItemDTO getHostItemDto(String id) {
    	String itemid="";
    	for(int i=0; i<hostItemRepository.size(); i++) {
    		itemid = hostItemRepository.get(i).getItemid();
    		if(id.equals(itemid)) {
    			return hostItemRepository.get(i);
    		}
    	}
    	return null;
    }
    
    public boolean updateHostItemDto(hostItemDTO newItem) {
    	String itemid="";
    	for(int i=0; i<hostItemRepository.size(); i++) {
    		itemid = hostItemRepository.get(i).getItemid();
    		if(newItem.getItemid().equals(itemid)) {
    			hostItemRepository.set(i, newItem);
    			return true;
    		}
    	}
    	return false;
    }
    
    public boolean appendHostItemDto(hostItemDTO newItem) {
    	if(updateHostItemDto(newItem)==true) {
    		return true;
    	}
    	return hostItemRepository.add(newItem);
    }
    
    public List<hostItemDTO> findAll() {
        return hostItemRepository;
    }
}
