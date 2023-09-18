

var electricityChart;
var gasChart;
var gasChartHistoric;



document.addEventListener("DOMContentLoaded", (event) => {
	setupColorManagement();
	createCharts();
});



function createCharts(){

	var ctx = document.getElementById('chart-electricity');
	if (ctx) {
		electricityChart = new Chart(ctx.getContext('2d'), {
			type: 'line',
			data: {
				labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
				datasets: [
					{
						label: 'PV Power',
						data: [0, 0, 0, 0, 0, 89, 302, 528, 1050, 2020, 6015, 9247, 10500],
						borderColor: ['#845ec2'],
						yAxisID: 'y',
						borderWidth: 2
					},
					{
						label: 'Consumption',
						data: [80, 85, 70, 90, 90, 80, 105, 226, 249, 311, 334, 352, 302],
						borderColor: ['#ff6f91'],
						yAxisID: 'y',
						borderWidth: 2
					},
					{
						label: 'Battery SOC',
						data: [15, 10, 5, 0, 0, 0, 0, 8, 20, 34, 49, 67, 98],
						borderColor: ['#ffc75f'],
						yAxisID: 'y2',
						borderWidth: 2
					}
				]
			},
			options: {
				animation: {
					duration: 2000            
				},
				scales: {
					y: {
						grid: {
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-line")
						},
						ticks: {
							maxTicksLimit: 6,
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-font"),
							callback: function(value, index, ticks) {
								return value/1000 + "kW";
							}
						},
						suggestedMax: 1000,
						suggestedMin: 0,
					},
					y2: {
						position: 'right',
						grid: {
							display: false
						},
						gridLines: {
							display: false,
							drawBorder: false,
							drawOnChartArea: false
						},
						ticks: {
							maxTicksLimit: 6,
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-font"),
							callback: function(value, index, ticks) {
								return value + "%";
							}
						},
						suggestedMax: 100,
						suggestedMin: 0,
					},
					x: {
						grid: {
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-line")
						},
						ticks: {
							maxTicksLimit: 6,
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-font"),
						},
					}
				},
				elements: {
					point: {
						radius: 4,
						hitRadius: 20
					}
				},
				plugins: {
					legend: {
						position: 'top',
						align: 'end',
						labels: {
							boxWidth: 6,
							boxHeight: 6,
							usePointStyle: true,
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-font"),
							font: {
								size: 12,
								weight: 'bold',
							}
						}
					},
					tooltip: {
						displayColors: false,
						callbacks: {
							label: function(context) {
								var label = [];
								if(context.dataset.yAxisID == "y2"){
									label.push(context.dataset.label + ': ' + context.parsed.y + '%');
								}else{
									label.push(context.dataset.label + ': ' + context.parsed.y + 'W');
								}
								return label;
							}
						}
					}
				},
				tooltips: {
					mode: 'index',
					intersect: false
				},
				hover: {
					mode: 'nearest',
					intersect: true
				}
			}
		});
	}


	var ctx = document.getElementById('chart-gas');
	if (ctx) {
		gasChart = new Chart(ctx.getContext('2d'), {
			type: 'line',
			data: {
				labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
				datasets: [
					{
						label: 'Consumption',
						data: [3, 1, 2, 2, 2, 1, 5, 6, 2, 1, 1, 0, 1],
						borderColor: ['#ff9671'],
						yAxisID: 'y',
						borderWidth: 2
					}
				]
			},
			options: {
				animation: {
					duration: 2000
				},
				scales: {
					y: {
						grid: {
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-line")
						},
						ticks: {
							maxTicksLimit: 6,
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-font"),
							callback: function(value, index, ticks) {
								return value + "kWh";
							}
						},
						suggestedMax: 1,
						suggestedMin: 0,
					},
					x: {
						grid: {
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-line")
						},
						ticks: {
							maxTicksLimit: 6,
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-font"),
						},
					}
				},
				elements: {
					point: {
						radius: 4,
						hitRadius: 20
					}
				},
				plugins: {
					legend: {
						position: 'top',
						align: 'end',
						labels: {
							boxWidth: 6,
							boxHeight: 6,
							usePointStyle: true,
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-font"),
							font: {
								size: 12,
								weight: 'bold',
							}
						}
					},
					tooltip: {
						displayColors: false,
						callbacks: {
							label: function(context) {
								var label = [];
								label.push(context.dataset.label + ': ' + context.parsed.y + 'kWh');
								return label;
							}
						}
					}
				},
				tooltips: {
					mode: 'index',
					intersect: false
				},
				hover: {
					mode: 'nearest',
					intersect: true
				}
			}
		});
	}


	var ctx = document.getElementById('chart-gas-month');
	if (ctx) {
		gasChartHistoric = new Chart(ctx.getContext('2d'), {
			type: 'bar',
			data: {
				labels: ['01.09.', '02.09.', '03.09.', '04.09.', '05.09.', '06.09.', '07.09.', '08.09.'],
				datasets: [
					{
						label: 'Consumption',
						data: [30, 32, 34, 21, 28, 24, 30, 27],
						borderColor: ['#d65db1'],
						backgroundColor: ['#d65db1'],
						yAxisID: 'y',
						borderWidth: 2
					}
				]
			},
			options: {
				animation: {
					duration: 2000
				},
				scales: {
					y: {
						border: {
							display: false,
						},
						grid: {
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-line")
						},
						ticks: {
							maxTicksLimit: 6,
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-font"),
							callback: function(value, index, ticks) {
								return value + "kWh";
							}
						},
						suggestedMax: 1,
						suggestedMin: 0,
					},
					x: {
						grid: {
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-line")
						},
						ticks: {
							maxTicksLimit: 6,
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-font"),
						},
					}
				},
				elements: {
					point: {
						radius: 4,
						hitRadius: 20
					}
				},
				plugins: {
					legend: {
						position: 'top',
						align: 'end',
						labels: {
							boxWidth: 6,
							boxHeight: 6,
							usePointStyle: true,
							color: getComputedStyle(ctx).getPropertyValue("--color-chart-font"),
							font: {
								size: 12,
								weight: 'bold',
							}
						}
					},
					tooltip: {
						displayColors: false,
						callbacks: {
							label: function(context) {
								var label = [];
								label.push(context.dataset.label + ': ' + context.parsed.y + 'kWh');
								return label;
							}
						}
					}
				},
				tooltips: {
					mode: 'index',
					intersect: false
				},
				hover: {
					mode: 'nearest',
					intersect: true
				}
			}
		});
	}
}



function setupColorManagement(){
	var theme="dark";
	if(localStorage.getItem("ui-theme")){
		if(localStorage.getItem("ui-theme") == "light"){
			theme = "light";
		}
	}
	/*  
		//light mode is ugly so we leave this out
		if(window.matchMedia){
			if(window.matchMedia("(prefers-color-scheme: light)").matches){
				theme = "light";
			}
		}
	*/
	document.documentElement.setAttribute("ui-theme", theme);
	localStorage.setItem('ui-theme', theme);
	if(theme == "light"){
		document.getElementById('appearance-icon-day').style.display = "none";
		document.getElementById('appearance-icon-night').style.display = "block";
	}else{
		document.getElementById('appearance-icon-night').style.display = "none";
		document.getElementById('appearance-icon-day').style.display = "block";
	}

	document.getElementById('btn-ui-theme').onclick = function() { 
		if (document.documentElement.getAttribute("ui-theme") == "light"){
			localStorage.setItem('ui-theme', 'dark');
			document.documentElement.setAttribute('ui-theme', 'dark');
			document.getElementById('appearance-icon-night').style.display = "none";
			document.getElementById('appearance-icon-day').style.display = "block";
		}else{
			localStorage.setItem('ui-theme', 'light');
			document.documentElement.setAttribute('ui-theme', 'light');
			document.getElementById('appearance-icon-day').style.display = "none";
			document.getElementById('appearance-icon-night').style.display = "block";
		}

		electricityChart.options.scales.x.ticks.color = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-font");
		electricityChart.options.scales.y.ticks.color = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-font");
                electricityChart.options.scales.y2.ticks.color = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-font");
		electricityChart.options.plugins.legend.labels.color = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-font");
		electricityChart.update();


		gasChart.options.scales.x.ticks.color = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-font");
		gasChart.options.scales.y.ticks.color = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-font");
		gasChart.options.plugins.legend.labels.color = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-font");
		gasChart.update();


		gasChartHistoric.options.scales.x.ticks.color = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-font");
		gasChartHistoric.options.scales.y.ticks.color = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-font");
		gasChartHistoric.options.plugins.legend.labels.color = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-font");
		gasChartHistoric.update();
	};

}
