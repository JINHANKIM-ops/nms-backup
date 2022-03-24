package service;

import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.groupItemApi;
import api.hostItemApi;
import api.problemsAlarmApi;
import api.processItemApi;
import api.processTriggerApi;
import dao.nmsDAO;
import dto.groupItemDTO;
import dto.hostItemDTO;
import dto.problemsAlarmDTO;
import dto.processItemDTO;
import dto.processTriggerDTO;
import repository.groupItemRepository;
import repository.hostItemRepository;
import repository.problemsAlarmRepository;
import repository.processItemRepository;
import repository.processTriggerRepository;

@Service
public class nmsService {
	
	@Autowired
	nmsDAO nms_dao;
	
	public void setNms_dao(nmsDAO nms_dao) {
		this.nms_dao = nms_dao;
	}
	
	@Autowired
	groupItemRepository groupItemrepository;
	
	public void setGroup_Itemrepository(groupItemRepository groupItemrepository) {
		this.groupItemrepository = groupItemrepository;
	}

	public List<groupItemDTO> groupInfo() throws ParseException {
		groupItemApi groupItem = new groupItemApi();
		List<groupItemDTO> group_list = groupItem.groupItem();
		for(int i=0; i<group_list.size(); i++) {
			if(groupItemrepository.getGroupItemDto(group_list.get(i).getHostid()) != null) {
				groupItemrepository.updateGroupItemDto(group_list.get(i));
			} else {
				groupItemrepository.appendGroupItemDto(group_list.get(i));
			}
		}
		
		// TODO: delete 처리 해야됨
		
		return group_list;
	}
	
	@Autowired
	hostItemRepository hostItemrepository;
	
	 public void setHost_Itemrepository(hostItemRepository hostItemrepository) {
		this.hostItemrepository = hostItemrepository;
	}

	public List<hostItemDTO> hostInfo() throws ParseException{ 
		 hostItemApi hostItem = new hostItemApi(); 
		 List<hostItemDTO> host_list = hostItem.hostItem();
		 for(int i=0; i<host_list.size(); i++) {
				if(hostItemrepository.getHostItemDto(host_list.get(i).getItemid()) != null) {
					hostItemrepository.updateHostItemDto(host_list.get(i));
				} else {
					hostItemrepository.appendHostItemDto(host_list.get(i));
				}
			}
		 return host_list; 
	}
	
	@Autowired
	processItemRepository processItemrepository;

	public void setProcess_Itemrepository(processItemRepository processItemrepository) {
		this.processItemrepository = processItemrepository;
	}
	
	public List<processItemDTO> processInfo() throws ParseException {
		processItemApi processItem = new processItemApi();
		List<processItemDTO> process_list = processItem.processItem();
		for(int i=0; i<process_list.size(); i++) {
			if(processItemrepository.getProcessItemDto(process_list.get(i).getItemid()) != null) {
				processItemrepository.updateProcessItemDto(process_list.get(i));
			} else {
				processItemrepository.appendProcessItemDto(process_list.get(i));
			}
		}
		return process_list;
	}
	
	@Autowired
	processTriggerRepository processTriggerrepository;

	public void setProcess_Triggerrepository(processTriggerRepository processTriggerrepository) {
		this.processTriggerrepository = processTriggerrepository;
	}
	
	public List<processTriggerDTO> processTriggerInfo() throws ParseException {
		processTriggerApi processTrigger = new processTriggerApi();
		List<processTriggerDTO> processTrigger_List = processTrigger.processTrigger();
		for(int i=0; i<processTrigger_List.size(); i++) {
			if(processTriggerrepository.getProcessTriggerDto(processTrigger_List.get(i).getItemid()) != null) {
				processTriggerrepository.updateProcessTriggerDto(processTrigger_List.get(i));
			} else {
				processTriggerrepository.appendProcessTriggerDto(processTrigger_List.get(i));
			}
		}
		return processTrigger_List;
	}
	
	@Autowired
	problemsAlarmRepository problemsAlarmrepository;

	public void setProblems_Alarmrepository(problemsAlarmRepository problemsAlarmrepository) {
		this.problemsAlarmrepository = problemsAlarmrepository;
	}
	
	public List<problemsAlarmDTO> problemAlarmInfo() throws ParseException {
		problemsAlarmApi problemAlarm = new problemsAlarmApi();
		List<problemsAlarmDTO> problemAlarm_List = problemAlarm.problemsAlarm();
		for(int i=0; i<problemAlarm_List.size(); i++) {
			if(problemsAlarmrepository.getProblemsAlarmDto(problemAlarm_List.get(i).getObjectid()) != null) {
				problemsAlarmrepository.updateProblemsAlarmDto(problemAlarm_List.get(i));
			} else {
				problemsAlarmrepository.appendProblemsAlarmDto(problemAlarm_List.get(i));
			}
		}
		return problemAlarm_List;
	}
	 
}
