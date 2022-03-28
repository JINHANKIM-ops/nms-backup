package com.enicoms.nms;

import java.util.List;

import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

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

@Controller
public class NMScontroller {

	private static final Logger logger = LoggerFactory.getLogger(NMScontroller.class);

	@Autowired
	groupItemRepository nms_groupItemBean;

	public void setNms_groupItemBean(groupItemRepository nms_groupItemBean) {
	this.nms_groupItemBean = nms_groupItemBean; }

	public groupItemRepository getNms_groupItemBean() {
		return nms_groupItemBean;
	}
	
	@Autowired
	hostItemRepository nms_hostItemBean;
	
	public hostItemRepository getNms_hostItemBean() {
		return nms_hostItemBean;
	}

	public void setNms_hostItemBean(hostItemRepository nms_hostItemBean) {
		this.nms_hostItemBean = nms_hostItemBean;
	}
	
	@Autowired
	processItemRepository nms_processItemBean;
	
	public processItemRepository getNms_processItemBean() {
		return nms_processItemBean;
	}

	public void setNms_processItemBean(processItemRepository nms_processItemBean) {
		this.nms_processItemBean = nms_processItemBean;
	}
	
	@Autowired
	processTriggerRepository nms_processTriggerBean;
	
	public processTriggerRepository getNms_processTriggerBean() {
		return nms_processTriggerBean;
	}

	public void setNms_processTriggerBean(processTriggerRepository nms_processTriggerBean) {
		this.nms_processTriggerBean = nms_processTriggerBean;
	}
	
	@Autowired
	problemsAlarmRepository nms_problemsAlarmBean;
	
	public problemsAlarmRepository getNms_problemsAlarmBean() {
		return nms_problemsAlarmBean;
	}

	public void setNms_problemsAlarmBean(problemsAlarmRepository nms_problemsAlarmBean) {
		this.nms_problemsAlarmBean = nms_problemsAlarmBean;
	}
	
	@RequestMapping("/")
	public String main() {
		return "index";
	}
	
	@RequestMapping("groupItem.do")
	@ResponseBody
	public String groupItem() throws ParseException {
		return new Gson().toJson(getNms_groupItemBean().findAll());
	}
	
	@RequestMapping("hostItem.do")
	@ResponseBody
	public String hostItem() throws ParseException {
		return new Gson().toJson(getNms_hostItemBean().findAll());
	}
	
	@RequestMapping("processItem.do") 
	@ResponseBody public String processItem() throws ParseException{
		return new Gson().toJson(getNms_processItemBean().findAll());
	}
	
	@RequestMapping("processTrigger.do")
	@ResponseBody
	public String processTrigger() throws ParseException {
		logger.info("trigger: {}",new Gson().toJson(getNms_processTriggerBean().findAll()));
		return new Gson().toJson(getNms_processTriggerBean().findAll());
	}
	 
	@RequestMapping("problemsAlarmItem.do")
	@ResponseBody
	public String problemAlarmItem() throws ParseException {
		return new Gson().toJson(getNms_problemsAlarmBean().findAll());
	}
	  
}
