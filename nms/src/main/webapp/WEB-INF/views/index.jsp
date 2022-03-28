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
<script src="resources/scripts/form_scripts.js"></script>
<script src="resources/scripts/items_scripts.js"></script>
<script src="resources/scripts/process_scripts.js"></script>
<script src="resources/scripts/util_chart.js"></script>
	<title>NMS</title>
</head>

<body onload="init()">
	<!--wrapper-->
	<div class="wrapper">
		<!--sidebar wrapper -->
		<div class="sidebar-wrapper" data-simplebar="true">
			<h2>SK M&SERVICE</h2>
			<ul class="metismenu" id="menu">
				<!-- <li>
					<a href="javascript:;" class="has-arrow">
						<div class="parent-icon"><i class='bx bx-folder-open'></i>
						</div>
						<div class="menu-title">01.CTI</div>
					</a>
					<ul class="menu_slide">
						<li class="menu_floor">
							<i class="bx bx-right-arrow-alt"></i>
							<span class="main_title">nxSwitch-01</span>
							<p>
								<span class="menu_tit">CPU : </span>
								<span class="menu_data">72.00</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">MEM : </span>
								<span class="menu_data">28.00</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">DISK : </span>
								<span class="menu_data">68.00</span>
								<span class="menu_sym">%</span>
							</p>
						</li>
						<li class="menu_floor">
							<i class="bx bx-right-arrow-alt"></i>
							<span class="main_title">CUBE#02</span>
							<p>
								<span class="menu_tit">CPU : </span>
								<span class="menu_data">72</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">MEM : </span>
								<span class="menu_data">28</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">DISK : </span>
								<span class="menu_data">68</span>
								<span class="menu_sym">%</span>
							</p>
						</li>
						<li class="menu_floor">
							<i class="bx bx-right-arrow-alt"></i>
							<span class="main_title">CUBE#03</span>
							<p>
								<span class="menu_tit">CPU : </span>
								<span class="menu_data">72</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">MEM : </span>
								<span class="menu_data">28</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">DISK : </span>
								<span class="menu_data">68</span>
								<span class="menu_sym">%</span>
							</p>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;" class="has-arrow">
						<div class="parent-icon"><i class='bx bx-folder-open'></i>
						</div>
						<div class="menu-title">02.CTI</div>
					</a>
					<ul class="menu_slide">
						<li class="menu_floor">
							<i class="bx bx-right-arrow-alt"></i>
							<span class="main_title">nxSwitch-01</span>
							<p>
								<span class="menu_tit">CPU : </span>
								<span class="menu_data">72.00</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">MEM : </span>
								<span class="menu_data">28.00</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">DISK : </span>
								<span class="menu_data">68.00</span>
								<span class="menu_sym">%</span>
							</p>
						</li>
						<li class="menu_floor">
							<i class="bx bx-right-arrow-alt"></i>
							<span class="main_title">CUBE#02</span>
							<p>
								<span class="menu_tit">CPU : </span>
								<span class="menu_data">72</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">MEM : </span>
								<span class="menu_data">28</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">DISK : </span>
								<span class="menu_data">68</span>
								<span class="menu_sym">%</span>
							</p>
						</li>
						<li class="menu_floor">
							<i class="bx bx-right-arrow-alt"></i>
							<span class="main_title">CUBE#03</span>
							<p>
								<span class="menu_tit">CPU : </span>
								<span class="menu_data">72</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">MEM : </span>
								<span class="menu_data">28</span>
								<span class="menu_sym">%</span>
								<span class="menu_tit">DISK : </span>
								<span class="menu_data">68</span>
								<span class="menu_sym">%</span>
							</p>
						</li>
					</ul>
				</li> -->
			</ul>
			<!--end navigation-->
		</div>
		<!--end sidebar wrapper -->
		<!--start header -->
		<header>
			<div class="topbar d-flex align-items-center">
				<a href="javascript:onSortButtonClicked('cpu');" class="tab_btn" id="cpu" data-value="cpu">CPU</a>
				<a href="javascript:onSortButtonClicked('memory');" class="tab_btn" id="memory">MEM</a>
				<a href="javascript:onSortButtonClicked('disk');" class="tab_btn" id="disk">DISK</a>
			</div>
		</header>
		<!--end header -->
		<!--start page wrapper -->
		<div class="page-wrapper">
			<div class="page-content" id="page">
				<!-- <div class="chart_title_form"> -->
				<!-- <span class="chart_title">nxSwitch-01</span>
					<div style="float:right;margin-right:2%;">
						<span class="chart_tit">CPU :</span>
						<span class="chart_data">100.00</span>
						<span class="chart_sym">%</span>
						<span class="chart_tit">MEM :</span>
						<span class="chart_data">28.00</span>
						<span class="chart_sym">%</span>
						<span class="chart_tit">DISK :</span>
						<span class="chart_data">68.00</span>
						<span class="chart_sym">%</span>
					</div> -->
				<!-- </div> -->
				<!-- <div class="row"> -->
				<!-- <div class="col-12 col-lg-4 ">
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
									<span class="badge bg-danger rounded-pill">81%</span>
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
									<span class="badge bg-danger rounded-pill">28%</span>
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
									<span class="badge bg-danger rounded-pill">68%</span>
								</div>
							</div>
						</div>
					</div> -->
				<!-- </div> -->
				<!--end row-->
				<!-- <p class="chart_title_form">
					<span class="chart_title">IVR#05</span>
					<span class="chart_tit">CPU :</span>
					<span class="chart_data">100.00%</span>
					<span class="chart_tit">MEM :</span>
					<span class="chart_data">28%</span>
					<span class="chart_tit">DISK :</span>
					<span class="chart_data">68%</span>
				</p>
				<div class="row">
					<div class="col-12 col-lg-4">
						<div class="card radius-10">
							<div class="card-body blue_border">
								<div>
									<h6 class="mb-0">CPU</h6>
								</div>
								<div class="chart-container-2 mt-4">
									<canvas id="chart4"></canvas>
								</div>
								<div class="usage_form">
									<h6 class="mb-0">사용량</h6>
									<span class="badge bg-danger rounded-pill">81%</span>
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
									<canvas id="chart5"></canvas>
								</div>
								<div class="usage_form">
									<h6 class="mb-0">사용량</h6>
									<span class="badge bg-danger rounded-pill">28%</span>
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
									<canvas id="chart6"></canvas>
								</div>
								<div class="usage_form">
									<h6 class="mb-0">사용량</h6>
									<span class="badge bg-danger rounded-pill">68%</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--end row-->
				<!-- <p class="chart_title_form">
					<span class="chart_title">IVR#05</span>
					<span class="chart_tit">CPU :</span>
					<span class="chart_data">100.00%</span>
					<span class="chart_tit">MEM :</span>
					<span class="chart_data">28%</span>
					<span class="chart_tit">DISK :</span>
					<span class="chart_data">68%</span>
				</p> -->
				<!-- <div class="row last-card">
					<div class="col-12 col-lg-4">
						<div class="card radius-10">
							<div class="card-body blue_border">
								<div>
									<h6 class="mb-0">CPU</h6>
								</div>
								<div class="chart-container-2 mt-4">
									<canvas id="chart7"></canvas>
								</div>
								<div class="usage_form">
									<h6 class="mb-0">사용량</h6>
									<span class="badge bg-danger rounded-pill">81%</span>
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
									<canvas id="chart8"></canvas>
								</div>
								<div class="usage_form">
									<h6 class="mb-0">사용량</h6>
									<span class="badge bg-danger rounded-pill">28%</span>
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
									<canvas id="chart9"></canvas>
								</div>
								<div class="usage_form">
									<h6 class="mb-0">사용량</h6>
									<span class="badge bg-danger rounded-pill">68%</span>
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<!--end row-->
			</div>
			<!--page-content row-->
			<!--sidebar wrapper -->
			<div class="sidebar-wrapper right_menu" data-simplebar="true">
				<div class="card">
					<div class="card-body">
						<div class="d-flex align-items-center">
							<div>
								<h6 class="mb-0 text-uppercase">장애알람</h6>
							</div>
							<div id="warnning_bell" class="spinner-grow" role="status"></div>
							<label class="switch-button"> <input type="checkbox" id="checkbox" /> <span
									class="onoff-switch" onclick="beepBtn()"></span> </label>
						</div>
						<div class="table-responsive warning_list">
							<table id="table-precess" class="table table-striped table-bordered">
								<thead>
									<tr>
										<th>Process Name</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody id="alram-tbody">
									<!-- <tr>
										<td>Tiger Nixon</td>
										<td>220119/11:00:00</td>
									</tr>
									<tr>
										<td>Garrett Winters</td>
										<td>220120/1:00:00</td>
									</tr>
									<tr>
										<td title="Ashton CoxAshton CoxAshton CoxAshton Cox">
											<p class="ellipsis">Ashton CoxAshton CoxAshton CoxAshton Cox</p>
										</td>
										<td>220121/00:00:00</td>
									</tr> -->
								</tbody>
							</table>
						</div>
						<!--end table-responsive-->
					</div>
					<!--end card-body-->
				</div>
				<!--end card-->
				<div class="table-responsive">
					<table id="example3" class="table table-striped table-bordered">
						<thead>
							<tr>
								<th>Process Name</th>
							</tr>
						</thead>

						<tbody id="process_tbody">
							<!--<tr>
								<td>Tiger Nixon</td>
							</tr>
							<tr>
								<td>Garrett Winters</td>
							</tr>
							<tr>
								<td>Ashton Cox</td>
							</tr>
							<tr>
								<td>Cedric Kelly</td>
							</tr>
							<tr>
								<td>Airi Satou</td>
							</tr>
							<tr>
								<td>Brielle Williamson</td>
							</tr>
							<tr>
								<td>Herrod Chandler</td>
							</tr>
							<tr>
								<td>Rhona Davidson</td>
							</tr>
							<tr>
								<td>Colleen Hurst</td>
							</tr>
							<tr>
								<td>Sonya Frost</td>
							</tr>
							<tr>
								<td>Jena Gaines</td>
							</tr>
							<tr>
								<td>Quinn Flynn</td>
							</tr>
							<tr>
								<td>Charde Marshall</td>
							</tr>
							<tr>
								<td>Haley Kennedy</td>
							</tr>
							<tr>
								<td>Tatyana Fitzpatrick</td>
							</tr>
							<tr>
								<td>Michael Silva</td>
							</tr>
							<tr>
								<td>Paul Byrd</td>
							</tr>
							<tr>
								<td>Gloria Little</td>
							</tr>
							<tr>
								<td>Bradley Greer</td>
							</tr>
							<tr>
								<td>Dai Rios</td>
							</tr>
							<tr>
								<td>Jenette Caldwell</td>
							</tr>
							<tr>
								<td>Yuri Berry</td>
							</tr>
							<tr>
								<td>Caesar Vance</td>
							</tr>
							<tr>
								<td>Doris Wilder</td>
							</tr>
							<tr>
								<td>Angelica Ramos</td>
							</tr>
							<tr>
								<td>Gavin Joyce</td>
							</tr>
							<tr>
								<td>Jennifer Chang</td>
							</tr>
							<tr>
								<td>Brenden Wagner</td>
							</tr>
							<tr>
								<td>Fiona Green</td>
							</tr>
							<tr>
								<td>Shou Itou</td>
							</tr>
							<tr>
								<td>Michelle House</td>
							</tr>
							<tr>
								<td>Suki Burks</td>
							</tr>
							<tr>
								<td>Prescott Bartlett</td>
							</tr>
							<tr>
								<td>Gavin Cortez</td>
							</tr>
							<tr>
								<td>Martena Mccray</td>
							</tr>
							<tr>
								<td>Unity Butler</td>
							</tr>
							<tr>
								<td>Howard Hatfield</td>
							</tr>
							<tr>
								<td>Hope Fuentes</td>
							</tr>
							<tr>
								<td>Vivian Harrell</td>
							</tr>
							<tr>
								<td>Timothy Mooney</td>
							</tr>
							<tr>
								<td>Jackson Bradshaw</td>
							</tr>
							<tr>
								<td>Olivia Liang</td>
							</tr>
							<tr>
								<td>Bruno Nash</td>
							</tr>
							<tr>
								<td>Sakura Yamamoto</td>
							</tr>
							<tr>
								<td>Thor Walton</td>
							</tr>
							<tr>
								<td>Finn Camacho</td>
							</tr>
							<tr>
								<td>Serge Baldwin</td>
							</tr>
							<tr>
								<td>Zenaida Frank</td>
							</tr>
							<tr>
								<td>Zorita Serrano</td>
							</tr>
							<tr>
								<td>Jennifer Acosta</td>
							</tr>
							<tr>
								<td>Cara Stevens</td>
							</tr>
							<tr>
								<td>Hermione Butler</td>
							</tr>
							<tr>
								<td>Lael Greer</td>
							</tr>
							<tr>
								<td>Jonas Alexander</td>
							</tr>
							<tr>
								<td>Shad Decker</td>
							</tr>
							<tr>
								<td>Michael Bruce</td>
							</tr>
							<tr>
								<td>Donna Snider</td>
							</tr> -->
						</tbody>
					</table>
				</div>
				<!--end table-responsive-->
			</div>
			<!--end list_form-->
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
	<!-- <div class="switcher-wrapper">
		<div class="switcher-btn"><i class='bx bx-cog bx-spin'></i>
		</div>
		<div id="main_menu">
			<ul>
				<li>
					<a href="">
						<img src="assets/images/menu/menu01_w.png" alt="" class="main_menu_icon">
						<span class="main_menu_tit_on">통합 모니터링</span>
					</a>
				</li>
				<li>
					<a href="">
						<img src="assets/images/menu/menu03_gray.png" alt="" class="main_menu_icon">
						<span class="main_menu_tit">서버 등록</span>
					</a>
				</li>
				<li>
					<a href="">
						<img src="assets/images/menu/menu04_gray.png" alt="" class="main_menu_icon">
						<span class="main_menu_tit">프로세스 등록</span>
					</a>
				</li>
				<li>
					<a href="">
						<img src="assets/images/menu/menu05_gray.png" alt="" class="main_menu_icon">
						<span class="main_menu_tit">사용자 등록</span>
					</a>
				</li>
			</ul>
		</div> <!!-- main_menu End --!!>
	</div> -->
	<!--end switcher-->
	<!-- Bootstrap JS -->
	<script src="resources/assets/js/bootstrap.bundle.min.js"></script>
	<script src="resources/assets/js/jquery.min.js"></script>
	<script src="resources/assets/plugins/simplebar/js/simplebar.min.js"></script>
	<script src="resources/assets/plugins/metismenu/js/metisMenu.min.js"></script>
	<script src="resources/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js"></script>
	<script src="resources/assets/plugins/chartjs/js/Chart.min.js"></script>
	<script src="resources/assets/plugins/chartjs/js/Chart.extension.js"></script>
	<script src="resources/assets/plugins/datatable/js/jquery.dataTables.min.js"></script>
	<script src="resources/assets/plugins/datatable/js/dataTables.bootstrap5.min.js"></script>
	<!-- <script src="assets/js/index.js"></script> -->
	<script>
		$(document).ready(function () {
			$('#example').DataTable();
		});
	</script>
	<script>
		$(document).ready(function () {
			var table = $('#example2').DataTable({
				lengthChange: false,
				bFilter: false,
				bInfo: false,
				paging: false,
				//buttons: [ 'copy', 'excel', 'pdf', 'print']
			});

			var table = $('#example3').DataTable({
				searching: false, //02-14 kjh search 태그 숨기기
				lengthChange: false,
				bInfo: false,
				paging: false,
				//buttons: [ 'copy', 'excel', 'pdf', 'print']
			});

			table.buttons().container()
				.appendTo('#example2_wrapper .col-md-6:eq(0)');
		});
	</script>
	<!--app JS-->
	<script src="assets/js/app.js"></script>
</body>

</html>
</html>