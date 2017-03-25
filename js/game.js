var assetsObj = {
	"sprites": {
		// This spritesheet has 16 images, in a 2 by 8 grid
		// The dimensions are 832x228
		"images/spr_walk_strip11.png": {
			// This is the width of each image in pixels
			tile: 32,
			// The height of each image
			tileh: 34,
			// We give names to three individual images
			map: {
				walker_start: [0, 0],
				walker_middle: [5, 0],
				walker_end: [10, 0]
			}
		}
	}
};

window.onload = function() {
	Crafty.init(640, 360, document.getElementById('game'));
	Crafty.load(assetsObj, game);
};

function game() {
	var walker = Crafty.e('2D, Canvas, walker_start, SpriteAnimation, Collision, Gravity, Twoway')
        .collision()
        .bind('Moved', function(e) {
            var hitDatas, hitData;
            if ((hitDatas = this.hit('Solid'))) {
                hitData = hitDatas[0];
                if (hitData.obj.has("Green") || hitData.obj.has("Floor")) {
                    this._falling = false;
                    this.x -= hitData.overlap * hitData.normal.x;
                    this.y -= hitData.overlap * hitData.normal.y;
                }
            }
        })
        .twoway(200)
        .gravity('Solid')
	walker.reel("walking", 500, [
		[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [8, 0], [10, 0]
	]);
	walker.animate("walking", -1);
}
