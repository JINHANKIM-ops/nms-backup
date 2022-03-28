package scheduler;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import dto.groupItemDTO;
import dto.groupItemDetailDTO;
import dto.hostItemDTO;
import dto.problemsAlarmDTO;
import dto.processItemDTO;
import dto.processItemDetailDTO;
import dto.processTriggerDTO;
import repository.groupItemRepository;
import repository.hostItemRepository;
import repository.problemsAlarmRepository;
import repository.processItemRepository;
import repository.processTriggerRepository;
import service.nmsService;

@Component
public class Scheduler {
	
	private static final Logger logger = LoggerFactory.getLogger(Scheduler.class);
	String problemsAlarmCheck = "";
	// @Autowired
	// groupItemRepository groupItemrepository;
	
	@Autowired
	nmsService nmsservice;
	
	int num = 0;
	@Scheduled(cron = "0/5 * * * * 1-5")// 5초마다 실행
	public void task() throws ParseException{
		logger.info("{} Test Log", num);
		num++;
		nmsservice.groupInfo();
		nmsservice.hostInfo();
		nmsservice.processInfo();
		nmsservice.processTriggerInfo();
		nmsservice.problemAlarmInfo();
		
		problemsAlarmRepository problemsAlarmrepository  = nmsservice.getProblems_Alarmrepository();
		processTriggerRepository processTriggerrepository = nmsservice.getProcess_Triggerrepository();
		processItemRepository processItemrepository = nmsservice.getProcess_Itemrepository();
		groupItemRepository groupItemrepository = nmsservice.getGroupItemrepository();
		
		List<problemsAlarmDTO> problemsAlarmList = problemsAlarmrepository.findAll();
		List<processTriggerDTO> processTriggerList = processTriggerrepository.findAll();
		List<processItemDTO> processItemList = processItemrepository.findAll();
		List<groupItemDTO> groupItemList = groupItemrepository.findAll();
		
		for(int i=0; i<problemsAlarmList.size(); i++) {
			if(problemsAlarmList.get(i).getR_eventid().equals("0")==false) {
				continue;
			}
			for(int j=0; j<processTriggerList.size(); j++) {
				if(problemsAlarmList.get(i).getObjectid().equals(processTriggerList.get(j).getTriggerid())) {
					for(int k=0; k<processTriggerList.get(j).getFunctions().size(); k++) {
						JSONObject obj = (JSONObject)processTriggerList.get(j).getFunctions().get(k);
						problemsAlarmList.get(i).getItem().add(obj.get("itemid").toString());
					}
				}
			}
		}
		
		
		// 다시 살아난 프로세스Item의 ID를 레퍼지토리에서 삭제한다
		// Zabbix에서 받은 problemsAlarmList에 포로세스Item의ID가 없다면 포로세스는 살아있다. 이때 found flag가 false, 프로세스ItemId가 있다면 해당 프로세스는 죽어있다. 이때 found flag는 true
		// found flag가 true일때는 유지, found flag가 false일때는 삭제
		
		// Arrays.copyOf(nmsservice.getProblems_Alarmcheck().getSmscheckId(), nmsservice.getProblems_Alarmcheck().getSmscheckId().size());
		List<String> copySavedId = new ArrayList<String>(nmsservice.getProblems_Alarmcheck().getSmscheckId());
		for(int i=0; i<copySavedId.size(); i++) {
			Boolean found = false;
			String foundId = copySavedId.get(i);
			for(int j=0; j<problemsAlarmList.size(); j++) {
				if(problemsAlarmList.get(j).getR_eventid().equals("0")==false) {
					continue;
				}
				for(int k=0; k<problemsAlarmList.get(j).getItem().size(); k++) {
					if(copySavedId.get(i).equals(problemsAlarmList.get(j).getItem().get(k))) {
						found = true;
						break;
					}
				}
				if(found == true) {
					break;
				}
			}
			if(found == false) {
				for(int orgIndex=0; orgIndex<nmsservice.getProblems_Alarmcheck().getSmscheckId().size(); orgIndex++) {
					if(nmsservice.getProblems_Alarmcheck().getSmscheckId().get(orgIndex).equals(foundId)) {
						
						processItemDetailDTO detailDto = new processItemDetailDTO(); //출력
						
						logger.info("processItemList: {}", processItemList.toString());
						logger.info("hostItemList: {}", groupItemList.toString());
						
						for(int k=0; k<processItemList.size(); k++) {
							processItemDTO process = processItemList.get(k);
							String p_itemId = process.getItemid();
							
							if(foundId.equals(p_itemId)) {
								detailDto.setP_itemId(p_itemId);
								detailDto.setP_name(process.getName()); 
								
								for(int h=0; h<groupItemList.size(); h++) {
									groupItemDTO group = groupItemList.get(h);
									String hostHostId = group.getHostid();
									
									if(process.getHostid().equals(hostHostId)) {
										logger.info("hostid : {}", hostHostId);
										detailDto.setP_hostName(group.getName());
										break;
									}
								}
								break;
							}
						}
						
						if(detailDto.getP_itemId() != null) {
							logger.info("{}", String.format("send SMS => problem  alive ID: %s, process NAME: %s, host NAME: %s", detailDto.getP_itemId(), detailDto.getP_name(), detailDto.getP_hostName()));
							nmsservice.getProblems_Alarmcheck().getSmscheckId().remove(orgIndex);
							break;
						}
					}
				}
			}
		}
		
		// SMS 보내는 동작만 한다
		// i번째 장애알람을 가져온다
		for(int i=0; i<problemsAlarmList.size(); i++) {
			// i번째 장애알람에서 j번쨰 Item을 가져온다
			for(int j=0; j<problemsAlarmList.get(i).getItem().size(); j++) {
				// 레퍼지트리에 저장된 itemId배열에 j번째 아이디가 있는지 검사
				boolean check = false;
				for(int k=0; k<nmsservice.getProblems_Alarmcheck().getSmscheckId().size(); k++) {
					if(nmsservice.getProblems_Alarmcheck().getSmscheckId().get(k).equals(problemsAlarmList.get(i).getItem().get(j))) {
						// 있으면 break
						check = true;
						break;
					}
				}
				if(check == false) {
					// 없으면 SMS전송
					processItemDetailDTO detailDto = new processItemDetailDTO(); //출력
					problemsAlarmDTO problemsDto = problemsAlarmList.get(i);
					List<String> item = problemsDto.getItem();
					String itemId = item.get(j);
					
					logger.info("processItemList: {}", processItemList.toString());
					logger.info("hostItemList: {}", groupItemList.toString());
					
					for(int k=0; k<processItemList.size(); k++) {
						processItemDTO process = processItemList.get(k);
						String p_itemId = process.getItemid();
						
						if(itemId.equals(p_itemId)) {
							detailDto.setP_itemId(p_itemId);
							detailDto.setP_name(process.getName()); 
							
							for(int h=0; h<groupItemList.size(); h++) {
								groupItemDTO group = groupItemList.get(h);
								String hostHostId = group.getHostid();
								
								if(process.getHostid().equals(hostHostId)) {
									logger.info("hostid : {}", hostHostId);
									detailDto.setP_hostName(group.getName());
									break;
								}
							}
							break;
						}
					}
					
					if(detailDto.getP_itemId() != null) {
						//SMS전송
						logger.info("{}", String.format("send SMS => problem ID: %s, process NAME: %s, host NAME: %s", detailDto.getP_itemId(), detailDto.getP_name(), detailDto.getP_hostName()));
						// SMS를 보냈으므로 j번쨰 ItemId를 레퍼지토리에 저장한다
						nmsservice.getProblems_Alarmcheck().getSmscheckId().add(problemsAlarmList.get(i).getItem().get(j));
					}
				}
				
			}
		}
		
		//서버 죽었을때
		for(int i=0; i<groupItemList.size(); i++) {
			groupItemDTO dto = groupItemList.get(i);
			String available = dto.getAvailable();
			boolean check = false;
			for(int j=0; j<nmsservice.getProblems_Groupcheck().getCheckHostId().size(); j++) {
				if(nmsservice.getProblems_Groupcheck().getCheckHostId().get(j).equals(dto.getHostid())) {
					check = true;
					break;
				}
			}
			
			if(check == false) {
				if(available.equals("2")) {
					logger.info("{}", String.format("send SMS => Down host ID: %s, host NAME: %s", dto.getHostid(), dto.getName()));
					nmsservice.getProblems_Groupcheck().getCheckHostId().add(dto.getHostid());
				} 
			}
			
		}
		
		//서버가 살았을때
		List<String> copySavedHostId = new ArrayList<String>(nmsservice.getProblems_Groupcheck().getCheckHostId());
		for(int i=0; i<copySavedHostId.size(); i++) {
			Boolean found = false;
			String foundId = copySavedHostId.get(i);
			for(int j=0; j<groupItemList.size(); j++) {
				if(groupItemList.get(j).getAvailable().equals("2")==false) {
					continue;
				}
				if (copySavedHostId.get(i).equals(groupItemList.get(j).getHostid())) {
					found = true;
					break;
				}
			}
			
			//copySavedHostId(이전에 다운된 서버의 Hostid저장), groupItemList(신규Hostid를 가지고 있는 리스트)
			//copySavedHostId, groupItemList에 같은 Hodtid가 있고
			//groupItemList에는 available not 2가 아닐때 found false
			if(found == false) {
				for(int orgIndex=0; orgIndex < nmsservice.getProblems_Groupcheck().getCheckHostId().size(); orgIndex++) {
					if(nmsservice.getProblems_Groupcheck().getCheckHostId().get(orgIndex).equals(foundId)) {
						
						groupItemDetailDTO detailDto = new groupItemDetailDTO(); // 출력
						for (int k = 0; k < groupItemList.size(); k++) {
							groupItemDTO group = groupItemList.get(k);
							String g_hostid = group.getHostid();
							if(foundId.equals(g_hostid)) {
								detailDto.setHostid(group.getHostid());
								detailDto.setName(group.getName());
								break;
							}
						}
							
						 //출력
						if(detailDto.getHostid() != null) {
							logger.info("{}", String.format("send SMS => Alive host ID: %s, host NAME: %s", detailDto.getHostid(), detailDto.getName()));
							nmsservice.getProblems_Groupcheck().getCheckHostId().remove(orgIndex);
							break;
						}
					}
				}
			}
		}
		
		
	}
}
