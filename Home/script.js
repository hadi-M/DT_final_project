var s = Snap("#anim");
var fade;

function loader(dist, radius, speed, delay, mode) {
	var dist = dist;
	var radius = radius;
	var speed = speed;
	var delay = delay;
	var mode = mode;

	$("#anim").css("width", dist);
	$("#anim").css("height", dist);

	circles = [];
	circles[0] = s.circle(radius, radius, radius);
	circles[1] = s.circle(dist-radius, radius, radius);
	circles[2] = s.circle(dist-radius, dist-radius, radius);
	circles[3] = s.circle(radius, dist-radius, radius);

	circles[0].attr({
		fill: "#EC1C24"
	});
	circles[1].attr({
		fill: "#545457"
	});
	circles[2].attr({
		fill: "#919496"
	});
	circles[3].attr({
		fill: "#F2664D"
	})

	var position = new Array(2);
	position[0] = new Array(4);
	position[1] = new Array(4);

	for (var i=0; i< circles.length; i++) {
		position[0][i] = circles[i].attr("cx");
		position[1][i] = circles[i].attr("cy");
	}

	var turn=mode;

	Loop = function() {

		for (var i=0; i< circles.length; i++) {
			circles[i].animate({
				cx: position[0][(i+turn)%4],
				cy: position[1][(i+turn)%4]
			}, speed);
		}
		turn=(turn+mode+4)%4;

		setInterval(function(){		
			for (var i=0; i< circles.length; i++) {
				circles[i].animate({
					cx: position[0][(i+turn)%4],
					cy: position[1][(i+turn)%4]
				}, speed);
			}
			turn=(turn+mode+4)%4;
		}, delay+speed);	
	}
	Loop();

	end = function(speed, delay, mode){
		$.each(circles, function(i, e){
			setTimeout(function() {
				circles[i].animate({
					opacity: 0
				}, speed)
			}, delay*(i+1));
			if (mode == 1) {
				setTimeout(function() {
					circles[3-i].animate({
						opacity: 0
					}, speed)
				}, delay*(i+1));
			}
		});
	}
}

loader(dist=80, radius=15, speed=500, delay=0, mode=3);
// setTimeout(function(){end(200, 500, 3);}, 3000);


$(window).on("load", function() {
	end(200, 500, 3);
	setTimeout(function() {
		$(".loading").fadeOut();
	}, 2500 );
	var Initial_annimation  = function(){
		$(".title h1").addClass("animated");
	};
	setTimeout(function() {
		Initial_annimation();
	}, 3500 );
	
});