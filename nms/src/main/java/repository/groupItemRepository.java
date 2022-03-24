package repository;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import dao.nmsDAO;
import dto.groupItemDTO;

public class groupItemRepository {
	
	@Autowired
	nmsDAO nms_dao;
	
	public void setNms_dao(nmsDAO nms_dao) {
		this.nms_dao = nms_dao;
	}
	
	private List<groupItemDTO> groupItemRepository = new ArrayList<groupItemDTO>();

    public void addgroupItem(List<groupItemDTO> groupItemList) {
    	groupItemRepository.addAll(groupItemList);
    }
    
    public groupItemDTO getGroupItemDto(String id) {
    	String hostid="";
    	for(int i=0; i<groupItemRepository.size(); i++) {
    		hostid = groupItemRepository.get(i).getHostid();
    		if(id.equals(hostid)) {
    			return groupItemRepository.get(i);
    		}
    	}
    	return null;
    }
    
    public boolean updateGroupItemDto(groupItemDTO newItem) {
    	String hostid="";
    	for(int i=0; i<groupItemRepository.size(); i++) {
    		hostid = groupItemRepository.get(i).getHostid();
    		if(newItem.getHostid().equals(hostid)) {
    			groupItemRepository.set(i, newItem);
    			return true;
    		}
    	}
    	return false;
    }
    
    public boolean appendGroupItemDto(groupItemDTO newItem) {
    	if(updateGroupItemDto(newItem)==true) {
    		return true;
    	}
    	return groupItemRepository.add(newItem);
    }
   
    
    public List<groupItemDTO> findAll() {
        return groupItemRepository;
    }
}
