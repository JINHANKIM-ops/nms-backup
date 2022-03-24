<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--plugins-->
<link href="resources/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />
<link href="resources/assets/plugins/metismenu/css/metisMenu.min.css" rel="stylesheet" />
<link href="resources/assets/plugins/datatable/css/dataTables.bootstrap5.min.css" rel="stylesheet" />
<link href="resources/assets/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
<!-- loader-->
<link href="resources/assets/css/pace.min.css" rel="stylesheet" />
<script src="resources/assets/js/pace.min.js"></script>
<!-- Bootstrap CSS -->
<link href="resources/assets/css/bootstrap.min.css" rel="stylesheet">
<link href="resources/assets/css/bootstrap-extended.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
<link href="resources/assets/css/app.css" rel="stylesheet">
<link href="resources/assets/css/icons.css" rel="stylesheet" >
<link rel="stylesheet" href="resources/assets/css/style.css" />
<script src="resources/script/jquery-3.6.0.min.js"></script>
<script src="resources/script/scripts.js"></script>
<script src="resources/script/formDisplay.js"></script>
<script src="resources/script/util_chart.js"></script>
<!--app JS-->
<!-- <script src="resources/assets/js/app.js"></script> -->
<script>
	$(document).ready(function(){
		groupItem();
	});
</script>
<META http-equiv=refresh content="30">
	<title>NMS</title>
</head>
<body>
	<!--wrapper-->
	<div class="wrapper">
		<!--sidebar wrapper -->
		<div class="sidebar-wrapper" data-simplebar="true">
		<h2>SK M&SERVICE</h2>
			<ul class="metismenu" id="menu">
					<li id="left">
						<!--
						<a href="javascript:;" class="has-arrow">
							<div class="parent-icon">
								<i class='bx bx-folder-open'></i>
							</div>
							<div class="menu-title">ENI UCE</div>
						</a>
						-->
						<!--
						<ul class="menu_slide">
							<li class="menu_floor"><i class="bx bx-right-arrow-alt"></i>
								<span class="main_title">DEV.219</span>
									<p>
										<span class="menu_tit">CPU : </span> 
										<span class="menu_data">12</span>
										<span class="menu_sym">%</span> 
											
										<span class="menu_tit">MEM : </span> 
										<span class="menu_data">45</span> 
										<span class="menu_sym">%</span>
											
										<span class="menu_tit">DISK : </span> 
										<span class="menu_data">50</span>
										<span class="menu_sym">%</span>
									</p>
							</li>
						</ul> 
						-->
					</li>
			</ul>
			<!--end navigation-->
		</div>
		<!--end sidebar wrapper -->
		<!--start header -->
		<header>
			<div class="topbar d-flex align-items-center">
				<a href="javascript:sort_chart_display('cpu');" class="tab_btn" id="sort_btn_cpu">CPU</a>
				<a href="javascript:sort_chart_display('mem');" class="tab_btn" id="sort_btn_mem">MEM</a>
				<a href="javascript:sort_chart_display('disk');" class="tab_btn" id="sort_btn_disk">DISK</a>
			</div>
		</header>
		<!--end header -->
		<!--start page wrapper -->
		<div class="page-wrapper">
			<div class="page-content" id="page">
						<!-- <div class="chart_title_form">
							<span class="chart_title">DEV.219</span>
							<div style="float:right;margin-right:2%;">
								<span class="chart_tit">CPU :</span>
								<span class="chart_data">22</span>
								<span class="chart_sym">%</span>
								
								<span class="chart_tit">MEM :</span>
								<span class="chart_data">72</span>
								<span class="chart_sym">%</span>
								
								<span class="chart_tit">DISK :</span>
								<span class="chart_data">65</span>
								<span class="chart_sym">%</span>
							</div>
						</div> -->
						<!--  <div class="row" id="div_row"> -->
					<!-- 	<div class="col-12 col-lg-4 ">
							<div class="card radius-10">
								<div class="card-body blue_border">
									<div>
										<h6 class="mb-0">CPU</h6>
									</div>
									<div class="chart-container-2 mt-4">
										<canvas id="chart1"></canvas>
									</div>
									<div class="usage_form">
										<h6 class="mb-0">사용량</h6>
										<span class="badge bg-danger rounded-pill">80%</span>
									</div>
								</div>
							</div>
						   </div> 
						   <div class="col-12 col-lg-4">
		                       <div class="card radius-10">
								   <div class="card-body">
									<div>
										<h6 class="mb-0">MEM</h6>
									</div>
									<div class="chart-container-2 mt-4">
										<canvas id="chart2"></canvas>
									</div>
									<div class="usage_form">
										<h6 class="mb-0">사용량</h6>
										<span class="badge bg-danger rounded-pill">75%</span>
									</div>
								   </div>
							   </div>
						   </div>
						   <div class="col-12 col-lg-4">
		                       <div class="card radius-10">
								   <div class="card-body">
									<div>
										<h6 class="mb-0">DISK</h6>
									</div>
									<div class="chart-container-2 mt-4">
										<canvas id="chart3"></canvas>
									</div>
									<div class="usage_form">
										<h6 class="mb-0">사용량</h6>
										<span class="badge bg-danger rounded-pill">65%</span>
									</div>
								   </div>
							   
							   </div>
						   </div> -->
						<!--  </div> --><!--end row--> 
			</div><!--page-content row-->
			<!--sidebar wrapper -->
			<div class="sidebar-wrapper right_menu" data-simplebar="true">
				<div class="card">
					<div class="card-body">
						<div class="d-flex align-items-center">
							   <div>
								   <h6 class="mb-0 text-uppercase">장애알람</h6>
							   </div>
							   <div id="warnning_bell" class="spinner-grow" role="status"></div>
							   <label class="switch-button"> <input type="checkbox" id="alarm_sign_check"/> <span class="onoff-switch" id="alarm_btn" onclick="beepBtn()"></span> </label>
						</div>
						<div class="table-responsive warning_list">
							<table id="table-precess" class="table table-striped table-bordered">
								<thead>
									<tr>
										<th>Process Name</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody id="alarm_tbody">
										<!-- <tr>
											<td>dummy</td>	
											<td>22/01/19</td>
										</tr> -->
								</tbody>
							</table>
						</div><!--end table-responsive-->
					</div><!--end card-body-->
				</div><!--end card-->	
				<div class="table-responsive">
					<table id="example3" class="table table-striped table-bordered">
						<thead>
						<tr>
							<th>Process Name</th>
						</tr>
						</thead>
						<tbody id="process_tbody">
						<!-- <tr>
							<td>zabbix</td>									
						</tr> -->
						</tbody>
					</table>
				</div><!--end table-responsive-->					
			</div><!--end list_form-->
		</div>		
		<!--end page wrapper -->
		<!--start overlay-->
		<div class="overlay toggle-icon"></div>
		<!--end overlay-->
		<!--Start Back To Top Button-->
		  <a href="javaScript:;" class="back-to-top"><i class='bx bxs-up-arrow-alt'></i></a>
		<!--End Back To Top Button-->
	</div>
	<!--end wrapper-->
	<!--start switcher-->
	<div class="switcher-wrapper">
		<div class="switcher-btn"><i class='bx bx-cog bx-spin'></i>
		</div>
		<div id="main_menu">
		<ul>
		<li>
		<a href="">
		<img src="resources/assets/images/menu/menu01_w.png" alt="" class="main_menu_icon">
		<span class="main_menu_tit_on">통합 모니터링</span>
		</a>
		</li>
		<li>
		<a href="">
		<img src="resources/assets/images/menu/menu03_gray.png" alt="" class="main_menu_icon">
		<span class="main_menu_tit">서버 등록</span>
		</a>
		</li>
		<li>
		<a href="">
		<img src="resources/assets/images/menu/menu04_gray.png" alt="" class="main_menu_icon">
		<span class="main_menu_tit">프로세스 등록</span>
		</a>
		</li>
		<li>
		<a href="">
		<img src="resources/assets/images/menu/menu05_gray.png" alt="" class="main_menu_icon">
		<span class="main_menu_tit">사용자 등록</span>
		</a>
		</li>
	</ul>
	</div><!-- main_menu End -->
	</div>
	<!--end switcher-->
	<!-- Bootstrap JS -->
	<script src="resources/assets/js/bootstrap.bundle.min.js"></script>
	<script src="resources/assets/plugins/simplebar/js/simplebar.min.js"></script>
	<script src="resources/assets/plugins/metismenu/js/metisMenu.min.js"></script>
	<script src="resources/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js"></script>
	<script src="resources/assets/plugins/chartjs/js/Chart.min.js"></script>
	<script src="resources/assets/plugins/chartjs/js/Chart.extension.js"></script>
	<script src="resources/assets/plugins/datatable/js/jquery.dataTables.min.js"></script>
	<script src="resources/assets/plugins/datatable/js/dataTables.bootstrap5.min.js"></script>
	<!-- <script src="resources/assets/js/index.js"></script> -->
	<script>
		$(document).ready(function() {
			$('#example').DataTable();
		  } );
	</script>
	<script>
		$(document).ready(function() {
			var table = $('#example2').DataTable( {
				lengthChange: false,
				bFilter: false,
				bInfo: false,
				paging: false,
				//buttons: [ 'copy', 'excel', 'pdf', 'print']
			} );

			/* var table = $('#example3').DataTable( {
				lengthChange: false,
				bInfo: false,
				paging: false,
				//buttons: [ 'copy', 'excel', 'pdf', 'print']
			} ); */
		 
			table.buttons().container()
				.appendTo( '#example2_wrapper .col-md-6:eq(0)' );
			
		} );
	</script>
</body>
</html>