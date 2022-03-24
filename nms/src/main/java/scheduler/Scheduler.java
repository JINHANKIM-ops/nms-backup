package scheduler;

import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import service.nmsService;

@Component
public class Scheduler {
	
	private static final Logger logger = LoggerFactory.getLogger(Scheduler.class);
	
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
	}
	
}
