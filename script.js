kaboom({
	global: true,
	fullscreen: true,
	debug: true,
	scale: 2
})

loadSprite("mort", "/assets/dino/gifs/mort.gif");

scene("main", () => {

	//layers

	layers([
		"game",
		"ui",
	], "game");

	//variables

	const PIPE_OPEN = 100;
	const PIPE_SPEED = 100;

  //adding background and player (dino)

	add([rect(1500, 650), color(0, 0, 0), origin("center"), pos(0, 0)])

	const mort = add([
		sprite("mort"),
		pos(200, 100),
		body(),
	]);

	keyPress('w', () => { mort.jump(350) })
	
	//adding start text

	add([
		text("Hello Human!", 32), 
		pos(300, 115), 
		color(55, 1, 25), 
		origin("center"),
		"text"	
	])

	add([
		text("Very Cool. Use W to jump & space to restart", 8),
		pos(300, 160),
		color(255, 155, 255),
		origin("center"),
		"text"
	])

	//move text left and destroy

	action("text", (text) => {

		text.move(-PIPE_SPEED, 0);

		if (text.pos.x + text.width < 0) {
			destroy(text);
		}

	});

	//hit space to restart

	keyPress('space', () => { go('main') })

  //checking lose conditions

	mort.action(() => {
		if (mort.pos.y >= height()) {
			go("gameover", score.value);
		}
	});

	mort.collides("pipe", () => {
		go("gameover", score.value);
	});

 //spawning pipes

	loop(1.5, () => {

		const pipePos = rand(0, height() - PIPE_OPEN);

		add([
			rect(30, 300), 
			color(0, 206, 62),
			origin("bot"),
			pos(width(), pipePos),
			"pipe",
		]);

		add([
			rect(30, 300), 
			color(0, 206, 62),
			pos(width(), pipePos + PIPE_OPEN),
			scale(1, -1),
			origin("bot"),
			"pipe",
			{ passed: false, },
		]);

	});

	//moving pipes to left

	action("pipe", (pipe) => {
/*
		if((score.value+5) <= score.value) {
			PIPE_SPEED += 10
		}
*/
		pipe.move(-PIPE_SPEED, 0);

		if (pipe.pos.x + pipe.width <= mort.pos.x && pipe.passed === false) {
			score.value++;
			score.text = score.value;
			pipe.passed = true;
		}

		if (pipe.pos.x + pipe.width < 0) {
			destroy(pipe);
		}

	});

	//score text
	const score = add([
		pos(20, 20),
		text("0", 32),
		layer("ui"),
		{
			value: 0,
		},
	]);


});

//gameover scene

scene("gameover", (score) => {

	add([rect(1500, 650), color(0, 0, 0), origin("center"), pos(0, 0)])

	add([
		text(`score: ${score}`, 24),
		pos(width() / 2, height() / 2),
		origin("center"),
	]);

	keyPress("space", () => {
		go("main");
	});

});

//run main scene
start("main")
