kaboom({
  global: true,
  fullscreen: true,
	debug: true,
	scale: 2
})

//loadRoot("/assets/dino/sheets");
//loadSprite("doux", "doux.png");
loadSprite("grass", "/assets/grass.png");
loadSprite("mort", "/assets/dino/gifs/mort.gif");
loadSprite("doux", "/assets/dino/sheets/doux.png", {
  sliceX: 24, // Width of each frame
  sliceY: 24, // Height of each frame
  anims: {
    main: {
      from: 0, // Range of frames for main animation
      to: 23,
    },
    running: {
      from: 24, // Range of frames for running animation
      to: 47,
    }
  }
})

scene("main", () => {

	
	add([rect(1500, 650), color(0, 123, 123), origin("center"), pos(0, 0)])

	const dino1 = add([sprite("doux"), pos(80, 80), scale(4)])
  //const dino2 = add([sprite("dino2"), pos(100, 0), scale(4)])
  //const dino3 = add([sprite("dino3"), pos(200, 0), scale(4)])
  //const dino4 = add([sprite("dino4"), pos(300, 0), scale(4)])

  dino1.play("main")
  //dino2.play("main")
  //dino3.play("main")
  //dino4.play("main")


	const mort = add([
		sprite("mort"),
		pos(200, 100),
		body(),
	]);

	keyPress('w', () => {mort.jump(350)})
	keyDown('d', () => {mort.move(100, 0)})
	keyDown('a', () => {mort.move(-100, 0)})

  add([text("Hello Human!", 32), pos(300, 115), color(55, 1, 25), origin("center")])

  add([
    text("Very Cool. Use wasd, space to restart", 8),
    pos(300, 160),
    color(255, 155, 255),
    origin("center"),
  ])

	keyPress('space', () => {go('main')})


	mort.action(() => {
		if (mort.pos.y >= height()) {
			go("gameover", score.value);
		}
	});



	const floor = addLevel(["========="], {
		width: 15,
		height: 15,
		pos: vec2(150, 260),
    '=': [
      sprite('grass'),
      solid()
    ],
	});


	const score = add([
		pos(20, 20),
		text("0", 32),
		layer("ui"),
		{
			value: 0,
		},
	]);


});


scene("gameover", (score) => {

	add([
		text(`score: ${score}`, 24),
		pos(width() / 2, height() / 2),
		origin("center"),
	]);

	keyPress("space", () => {
		go("main");
	});

});


start("main")
