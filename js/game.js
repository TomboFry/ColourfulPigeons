var assetsObj = {
	"sprites": {
		"images/spr_walk_orange.png": {
			tile: 64,
			tileh: 68,
			map: {
				Orange: [0, 0],
			}
		},
		"images/spr_walk_blue.png": {
			tile: 64,
			tileh: 68,
			map: {
				Blue: [0, 0],
			}
		},
		"images/spr_walk_purple.png": {
			tile: 64,
			tileh: 68,
			map: {
				Purple: [0, 0],
			}
		}
	}
};

window.onload = function() {
	Crafty.init(640, 360, document.getElementById('game'));
	Crafty.load(assetsObj, game);
};

function game() {
	var walker = Crafty.e('2D, Canvas, Purple, SpriteAnimation, Collision, Gravity, Jumper, Motion')
        .collision()
        .bind('Moved', function(e) {
            var hitDatas, hitData;
            if ((hitDatas = this.hit('Solid'))) {
                hitData = hitDatas[0];
                 if (hitData.obj.has("Floor")) {
                    this.x -= hitData.overlap * hitData.normal.x;
                    this.y -= hitData.overlap * hitData.normal.y;
                } else if (!hitData.obj.has(walker.player_colour)) {
                    this.velocity().x = 50;
                    this.x -= hitData.overlap * hitData.normal.x;
                    this.y -= hitData.overlap * hitData.normal.y;
                }
            }
        })
        .jumper(400, ['UP_ARROW'])
        .gravity('Floor')
        .reel("walking", 500, [
			[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0]
		])
		.animate("walking", -1)
		.bind('KeyDown', function(e) {
			if(e.key == Crafty.keys.Z) {
				walker.removeComponent("Orange");
				walker.removeComponent("Purple");
				walker.addComponent("Blue");
				walker.player_colour = "Blue";
			} else if(e.key == Crafty.keys.X) {
				walker.removeComponent("Purple");
				walker.removeComponent("Blue");
				walker.addComponent("Orange");
				walker.player_colour = "Orange";
			} else if(e.key == Crafty.keys.C) {
				walker.removeComponent("Orange");
				walker.removeComponent("Blue");
				walker.addComponent("Purple");
				walker.player_colour = "Purple";
			}
		});

	walker.player_colour = "Purple";
    walker.velocity().x = 50;
    walker.ax = 30;

	Crafty.e("2D, Canvas, Solid, Floor, Collision, Color")
		.attr({ x: 0, y: 350, w: 1280, h: 10 })
		.color('black')
		.collision();

	Crafty.e("2D, Canvas, Solid, Collision, Orange, Color")
		.attr({ x: 480, y: 0, w: 20, h: 350 })
		.color('orange')
		.collision();
    Crafty.viewport.bounds = {min:{x:0, y:0}, max:{x:+Infinity, y:360}};
    Crafty.viewport.scale(1);
    Crafty.viewport.follow(walker, 0, 0);
}
