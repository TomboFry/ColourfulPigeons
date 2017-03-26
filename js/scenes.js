var sinRot = 0;

Crafty.defineScene("title", function() {

	Crafty.background('#3FA9F5 url(images/hillside.png) repeat-x');

	var title = Crafty.e('2D, Canvas, SpriteAnimation, title_sprite, Mouse')
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
				Crafty.enterScene("game");
			}
		});

	Crafty.e("2D, Canvas, Text")
		.attr({ x: WIDTH / 2, y: 248})
		.text("Press ENTER to Start!")
		.textColor("#FFF")
		.textAlign("center")
		.textFont({ size: '20px', weight: 'bold', family: "Montserrat" })

	Crafty.e("2D, Canvas, Text")
		.attr({ x: WIDTH / 2, y: 270})
		.text("Controls: Z = Blue, X = Orange, C = Purple")
		.textColor("#FFF")
		.textAlign("center")
		.textFont({ size: '20px', weight: 'bold', family: "Montserrat" })
});

Crafty.defineScene("gameend", function() {

	var highscore = 0;
	var hasHighscore = false;
	if (localStorage.getItem("highscore")) {
		highscore = localStorage.getItem("highscore");
	}
	if (SCORE > highscore) {
		localStorage.setItem("highscore", SCORE)
		hasHighscore = true;
		highscore = SCORE
	}

	Crafty.e("2D, Canvas, Text")
		.attr({ x: WIDTH / 2, y: 16 })
		.text("GAME OVER!")
		.textColor("#FFF")
		.textAlign("center")
		.textFont({ size: "42px", weight: "900", family: "Montserrat" })

	setTimeout(function() {
		Crafty.e("2D, Canvas, Text")
			.attr({ x: WIDTH / 2, y: 70 })
			.text("Your Score:")
			.textColor("#FFF")
			.textAlign("center")
			.textFont({ size: "28px", weight: "700", family: "Montserrat" })

		Crafty.e("2D, Canvas, Text")
			.attr({ x: WIDTH / 2, y: 92 })
			.text(Math.round(SCORE))
			.textColor("#FFF")
			.textAlign("center")
			.textFont({ size: "64px", weight: "900", family: "Montserrat" })
	}, 1000)

	setTimeout(function() {
		Crafty.e("2D, Canvas, Text")
			.attr({ x: WIDTH / 2, y: 160 })
			.text("Your Highscore:")
			.textColor("#FFF")
			.textAlign("center")
			.textFont({ size: "28px", weight: "700", family: "Montserrat" })

		Crafty.e("2D, Canvas, Text")
			.attr({ x: WIDTH / 2, y: 182 })
			.text(Math.round(highscore))
			.textColor("#FFF")
			.textAlign("center")
			.textFont({ size: "64px", weight: "900", family: "Montserrat" })

		if (hasHighscore) {
			Crafty.e("2D, Canvas, Image")
				.attr({ x: (WIDTH / 2) - 160, y: 166, w: 32, h: 16 })
				.image("images/highscore_new.png")
				.bind("EnterFrame", function() {
					sinRot += 0.1;
					this.rotation = Math.sin(sinRot) * 8;
				});
		}
	}, 2000);

	setTimeout(function() {
		Crafty.e("2D, Canvas, Text")
			.attr({ x: WIDTH / 2, y: 270})
			.text("Press ENTER to play again")
			.textColor("#FFF")
			.textAlign("center")
			.textFont({ size: '20px', weight: 'bold', family: "Montserrat" })
			.bind("KeyDown", function(e) {
				if (e.key == Crafty.keys.ENTER) {
					Crafty.enterScene("game")
				}
			});
	}, 2500);
});

function lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t
}
