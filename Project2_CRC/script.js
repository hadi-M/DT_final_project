$(document).ready(function (){
	var holder = Array(3000);
	var signal = Array(1000);
	var shift_amount;
	var step_counter=0;
	var correlation=Array(2000);
	function start() {
		setTimeout( function(){
			$("main h1").addClass("animated");
		}, 1000 );
		function load_graph() {
			$('#step-3 .content-hldr #graph-hldr-small').highcharts({
				chart: {
					type: 'spline'
				},
				title: {
					text: 'The correlation graph'
				},
				xAxis: {
					type: 'Shift amount (z)',
					labels: {
						overflow: 'justify'
					}
				},
				yAxis: {
					title: {
						text: 'S(t)*S(t-z)'
					},
					minorGridLineWidth: 0,
					gridLineWidth: 0,
					alternateGridColor: null,
				},
				plotOptions: {
					spline: {
						lineWidth: 4,
						states: {
							hover: {
								lineWidth: 5
							}
						},
						marker: {
							enabled: false
						},
					}
				},
				series: [ {
					name: 'Correlation',
					data: correlation
				}],
				navigation: {
					menuItemStyle: {
						fontSize: '10px'
					}
				}
			});
		};

		function array_sum(array) {
			var sum=0;
			for(i=0; i<array.length; i++) {
				sum+=array[i]
			}
			return sum;
		}

		function load_zoomed_graph() {
			$('#container').highcharts({
				chart: {
					type: 'spline'
				},
				title: {
					text: 'The correlation graph'
				},
				xAxis: {
					type: 'Shift amount (z)',
					labels: {
						overflow: 'justify'
					}
				},
				yAxis: {
					title: {
						text: 'S(t)*S(t-z)'
					},
					minorGridLineWidth: 0,
					gridLineWidth: 0,
					alternateGridColor: null,
				},
				plotOptions: {
					spline: {
						lineWidth: 4,
						states: {
							hover: {
								lineWidth: 5
							}
						},
						marker: {
							enabled: false
						},
					}
				},
				series: [ {
					name: 'Correlation',
					data: correlation
				}],
				navigation: {
					menuItemStyle: {
						fontSize: '10px'
					}
				}
			});
		};

		function show_modal() {
			$("#black-bg").fadeIn(200, function(){
				$("#modal").fadeIn(200);
				$("#container").fadeIn(200);
			});
		}

		function hide_modal() {
			$("#modal").fadeOut(200, function(){
				$("#container").fadeOut(200);
				$("#black-bg").fadeOut(200);
			});
			// $(".close-icon").unbind("click");
		}

		function reset_holder() {
			for (i=0; i<3000; i++) {
				holder[i]=0;
			}
		}

		function generate_signal() {
			for(i=0; i<1000; i++) {
				signal[i] = (Math.floor(Math.random()*1000))%2;
			}
		};

		function generate_shift_amount() {
			shift_amount = (Math.floor(Math.random()*10000))%2000;
		};
		function do_shifting() {
			for(i=0; i<1000; i++) {
				holder[i+shift_amount]=signal[i];
			}
		}

		function calculate() {
			var temp=Array(1000)
			for(var shft=0; shft<2000; shft++) {
				for(i=0; i<1000; i++) {
					temp[i]=holder[i+shft]*signal[i];
					if(shft==23 && i==980) {
						debugger;
					}
				}
				correlation[shft]=array_sum(temp);
			}
		}

		function disable_btn(btn) { // 1: play, 2: repeat
			if (btn == 1) {
				$(".fa-play")
				.removeClass("active")
				.addClass("disable")
				.unbind("click");
			}
			if (btn == 2) {
				$(".fa-repeat")
				.removeClass("active")
				.addClass("disable")
				.unbind("click");
			}
		};

		function enable_btn(btn) {
			if (btn==1) {
				$(".fa-play")
				.addClass("active")
				.removeClass("disable")
				.click(function(){
					if (step_counter==0) {
						$("#step-1 .step-number").addClass("selected");
						$("#step-1").addClass("selected");
						generate_signal();
						$("#step-1 .tick").addClass("done");
						step_counter+=1;
					}
					else if(step_counter==1) {
						step_counter+=1;
						$("#step-1").removeClass("selected");
						$("#step-2 .step-number").addClass("selected");
						$("#step-2").addClass("selected");
						generate_shift_amount();
						$("#step-2 span").append(shift_amount);
						reset_holder();
						do_shifting();
						$("#step-2 .tick").addClass("done");
					}
					else if(step_counter==2) {
						load_graph();
						$("#step-2").removeClass("selected");
						$("#step-3 .step-number").addClass("selected");
						$("#step-3").addClass("selected");
						$("#step-3 .tick").addClass("done");
						$(".zoom").addClass("selected");
						calculate();
						$(".zoom.selected").click(function(){
							show_modal();
							load_zoomed_graph()
						});
						$(".close-icon").click(function(){
							hide_modal();
						});
					}
				});
}
if (btn == 2) {
	$(".fa-repeat")
	.addClass("active")
	.removeClass("disable")
	.click();

}
};

enable_btn(1);
};
start();

});