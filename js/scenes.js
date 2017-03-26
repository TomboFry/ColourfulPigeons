var assetsObj = {
	"sprites": {
		"images/title_strip26.png": {
			tile: 502, tileh: 162,
			map: { title: [0, 0] }
		}
	}
}

Crafty.defineScene("title", function() {
	Crafty.background('#3FA9F5 url(images/hillside.png) repeat-x');

	var title = Crafty.e('2D, Canvas, SpriteAnimation, title')
		.attr({ x: 34, y: -162, w: 502, h: 162 })
        .reel("splash", 1000, [
			[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0],
			[10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0],
			[20, 0], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0]
		])
		.animate("splash", -1)
		.bind("EnterFrame", function(e) {
			this.y = lerp(this.y, 34, 0.05);
		})
		.bind("KeyDown", function(e) {
			if (e.key == Crafty.keys.ENTER) {
				Crafty.enterScene("gameend");
			}
		})
});

Crafty.defineScene("gameend", function() {
	Crafty.e("2D, DOM, Text")
          .attr({ w: 100, h: 20, x: 150, y: 120 })
          .text("Game Over!")
          .css({ "border": "1px solid red"})
          .textColor("#FFFFFF");
})

window.onload = function() {
	resizeWindow();
	Crafty.init(570, 320, document.getElementById('game'));
	Crafty.load(assetsObj, function() {
		Crafty.enterScene("title");
	});
}

function lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t
}

window.onresize = resizeWindow;
function resizeWindow() {
	var canvas = document.getElementById('game');
	var scale = window.innerHeight / 320;
	console.log(scale);
	canvas.style.transformOrigin = "0 0";
	canvas.style.transform = "scale(" + scale + ")";
}
