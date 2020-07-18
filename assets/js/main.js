let size = [1990,1080];
var ratio = size[0] / size[1];
// Aliases
let Application = PIXI.Application,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite;

let bucketSheet = [];

let game = new Application({width : 256, height : 256});

// game.renderer.view.style.position = "absolute";
game.renderer.view.style.display = "block";
game.renderer.autoResize = true;
game.renderer.resize(1920, 1080);
game.maxFPS = 59.99;

game.stage;

loader.add("assets/images/game-background.jpg")
	  .add("bucket","assets/images/bucket-HD.png")
	  .add("arrow","assets/images/arrow-HD.png")
	  .load(setup);

function setup() {
	let background = new Sprite(resources['assets/images/game-background.jpg'].texture);
	background.width = 1920;
	background.height = 1080;

	let bucket_image =  new PIXI.BaseTexture.from(loader.resources['bucket'].url);

	let arrow_image = new PIXI.BaseTexture.from(loader.resources['arrow'].url);


	bucketSheet['open'] = [
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(994,344,260,324)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(725,301,265,335)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(441,301,280,329)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(1326,334,288,311)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(1592,2,294,297)),
	];


	bucketSheet['close'] = [
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(1592,2,294,297)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(1326,334,288,311)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(441,301,280,329)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(725,301,265,335)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(994,344,260,324)),
	];


	bucketSheet['bucketLight'] = [
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(2,2,435,478)),
	];


	bucketSheet['bucketMoving'] = [
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(2,484,299,323)),
	];

	bucketSheet['shadow'] = [
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(1616,301,276,325)),
	];

	bucketSheet['arrow'] = [
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,2,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,66,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,130,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,194,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,258,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,322,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,386,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,450,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,514,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,578,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,642,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,706,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,770,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,834,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,898,52,62)),
		new PIXI.Texture(arrow_image , new PIXI.Rectangle(0,962,52,62)),
	];


	// BUCKET 1
	openBucketA = new PIXI.AnimatedSprite(bucketSheet.open);
	openBucketA.interactive   = true;
	openBucketA.buttonMode  = true;
	openBucketA.defaultCursor  = 'pointer';
	openBucketA.on('mousedown',bucketA_Anim);
	openBucketA.on('touchstart',bucketA_Anim);
	openBucketA.anchor.set(0.5);
	openBucketA.animationSpeed = .3;
	openBucketA.loop = false;
	openBucketA.x = game.view.width / 5.5;
	openBucketA.y = game.view.height / 2.4;

	closeBucketA = new PIXI.AnimatedSprite(bucketSheet.close);
	closeBucketA.alpha = 0;
	closeBucketA.anchor.set(0.5);
	closeBucketA.animationSpeed = .3;
	closeBucketA.loop = false;
	closeBucketA.x = game.view.width / 5.5;
	closeBucketA.y = game.view.height / 2.4;

	openBucketAMove = new PIXI.AnimatedSprite(bucketSheet.bucketMoving);
	openBucketAMove.x = openBucketA.x - 130;
	openBucketAMove.y = openBucketA.y - 165;
	openBucketAMove.alpha = 0;


	openBucketALight = new PIXI.AnimatedSprite(bucketSheet.bucketLight);
	openBucketALight.alpha = 0;
	openBucketALight.anchor.set(0.5);
	openBucketALight.animationSpeed = .3;
	openBucketALight.loop = false;
	openBucketALight.x = game.view.width / 5.85;
	openBucketALight.y = game.view.height / 2.25;
	openBucketALight.scale.set(1.02,1.02);

	openBucketAShadow = new PIXI.AnimatedSprite(bucketSheet.shadow);
	openBucketAShadow.anchor.set(0.5);
	openBucketAShadow.x = openBucketA.x + 50;
	openBucketAShadow.y = openBucketA.y + 120;
	openBucketAShadow.scale.set(1.35,1.1)
	openBucketAShadow.alpha = 0.7;

	openBucketA_arrow = new PIXI.AnimatedSprite(bucketSheet.arrow);
	openBucketA_arrow.anchor.set(0.5);
	openBucketA_arrow.animationSpeed = .3;
	openBucketA_arrow.x = openBucketA.x + 3;
	openBucketA_arrow.y = openBucketA.y - 200;
	openBucketA_arrow.play();
	animatedArrow(openBucketA_arrow);

	A_Bucket = new PIXI.Container();
	A_Bucket.addChild(openBucketAShadow,closeBucketA,openBucketALight,openBucketA,openBucketA_arrow,openBucketAMove);


	// BUCKET 2
	openBucketB = new PIXI.AnimatedSprite(bucketSheet.open);
	openBucketB.on('mousedown',bucketB_Anim);
	openBucketB.on('touchstart',bucketA_Anim);
	openBucketB.interactive   = true;
	openBucketB.buttonMode  = true;
	openBucketB.defaultCursor  = 'pointer';
	openBucketB.anchor.set(0.5);
	openBucketB.animationSpeed = .3;
	openBucketB.loop = false;
	openBucketB.x = game.view.width /2.75;
	openBucketB.y = game.view.height / 2.4;

	closeBucketB = new PIXI.AnimatedSprite(bucketSheet.close);
	closeBucketB.alpha = 0;
	closeBucketB.anchor.set(0.5);
	closeBucketB.animationSpeed = .3;
	closeBucketB.loop = false;
	closeBucketB.x = game.view.width /2.75;
	closeBucketB.y = game.view.height / 2.4;


	openBucketBMove = new PIXI.AnimatedSprite(bucketSheet.bucketMoving);
	openBucketBMove.x = openBucketB.x - 130;
	openBucketBMove.y = openBucketB.y - 165;
	openBucketBMove.alpha = 0;



	openBucketBLight = new PIXI.AnimatedSprite(bucketSheet.bucketLight);
	openBucketBLight.alpha = 0;
	openBucketBLight.anchor.set(0.5);
	openBucketBLight.animationSpeed = .3;
	openBucketBLight.loop = false;
	openBucketBLight.x = game.view.width / 2.84;
	openBucketBLight.y = game.view.height / 2.25;
	openBucketBLight.scale.set(1.02,1.02);


	openBucketBShadow = new PIXI.AnimatedSprite(bucketSheet.shadow);
	openBucketBShadow.anchor.set(0.5);
	openBucketBShadow.x = openBucketB.x + 50;
	openBucketBShadow.y = openBucketB.y + 120;
	openBucketBShadow.scale.set(1.35,1.1)
	openBucketBShadow.alpha = 0.7;

	openBucketB_arrow = new PIXI.AnimatedSprite(bucketSheet.arrow);
	openBucketB_arrow.anchor.set(0.5);
	openBucketB_arrow.animationSpeed = .3;
	openBucketB_arrow.x = openBucketB.x + 3;
	openBucketB_arrow.y = openBucketB.y - 200;
	openBucketB_arrow.play();
	animatedArrow(openBucketB_arrow);

	B_Bucket = new PIXI.Container();
	B_Bucket.addChild(openBucketBShadow,closeBucketB,openBucketBLight,openBucketB,openBucketB_arrow,openBucketBMove);



	// BUCKET 3
	openBucketC = new PIXI.AnimatedSprite(bucketSheet.open);
	openBucketC.on('mousedown',bucketC_Anim);
	openBucketC.on('touchstart',bucketA_Anim);
	openBucketC.interactive   = true;
	openBucketC.buttonMode  = true;
	openBucketC.defaultCursor  = 'pointer';
	openBucketC.anchor.set(0.5);
	openBucketC.animationSpeed = .3;
	openBucketC.loop = false;
	openBucketC.x = game.view.width /1.83;
	openBucketC.y = game.view.height / 2.4;

	closeBucketC = new PIXI.AnimatedSprite(bucketSheet.close);
	closeBucketC.alpha = 0;
	closeBucketC.anchor.set(0.5);
	closeBucketC.animationSpeed = .3;
	closeBucketC.loop = false;
	closeBucketC.x = game.view.width /1.83;
	closeBucketC.y = game.view.height / 2.4;


	openBucketCMove = new PIXI.AnimatedSprite(bucketSheet.bucketMoving);
	openBucketCMove.x =  openBucketC.x - 130;
	openBucketCMove.y =  openBucketC.y - 165;
	openBucketCMove.alpha = 0;



	openBucketCLight = new PIXI.AnimatedSprite(bucketSheet.bucketLight);
	openBucketCLight.alpha = 0;
	openBucketCLight.anchor.set(0.5);
	openBucketCLight.animationSpeed = .3;
	openBucketCLight.loop = false;
	openBucketCLight.x = game.view.width / 1.87;
	openBucketCLight.y = game.view.height / 2.25;
	openBucketCLight.scale.set(1.02,1.02);


	openBucketCShadow = new PIXI.AnimatedSprite(bucketSheet.shadow);
	openBucketCShadow.anchor.set(0.5);
	openBucketCShadow.x = openBucketC.x + 50;
	openBucketCShadow.y = openBucketC.y + 120;
	openBucketCShadow.scale.set(1.35,1.1)
	openBucketCShadow.alpha = 0.7;

	openBucketC_arrow = new PIXI.AnimatedSprite(bucketSheet.arrow);
	openBucketC_arrow.anchor.set(0.5);
	openBucketC_arrow.animationSpeed = .3;
	openBucketC_arrow.x = openBucketC.x + 3;
	openBucketC_arrow.y = openBucketC.y - 200;
	openBucketC_arrow.play();
	animatedArrow(openBucketC_arrow);


	C_Bucket = new PIXI.Container();
	C_Bucket.addChild(openBucketCShadow,closeBucketC,openBucketCLight,openBucketC,openBucketC_arrow,openBucketCMove);



	let arrow =  new PIXI.BaseTexture.from(loader.resources['arrow'].url);

	game.stage.addChild(background,A_Bucket,B_Bucket,C_Bucket);

	completeLoad();

	// _callAnim();

}


function animatedArrow(obj) {
	createjs.Tween.get(obj,{loop : true})
	.to({ y : obj.y + 6},1000)
	.to({ y : obj.y - 1},1000)
}



function completeLoad() {
	openBucketA.mouseover = function () {
		openBucketALight.alpha = 1;
	}
	openBucketA.mouseout = function () {
		openBucketALight.alpha = 0;
	}

	openBucketB.mouseover = function () {
		openBucketBLight.alpha = 1;
	}

	openBucketB.mouseout = function () {
		openBucketBLight.alpha = 0;
	}

	openBucketC.mouseover = function () {
		openBucketCLight.alpha = 1;
	}

	openBucketC.mouseout = function () {
		openBucketCLight.alpha = 0;
	}

}

let animSpeed = 80;

function L_to_R(obj1,obj2) {
	let animType = _animRandomizer();
	if (animType == 0) {
		createjs.Tween.get(obj2 , {loop : false})
		.to({x :-Math.abs(349.09090909090907) , y : 170} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x :-Math.abs(699.1803278688524) , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 0 , y : 0})

		createjs.Tween.get(obj1, {loop : false})
		.to({x :349.09090909090907 , y : -170} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x :699.1803278688524 , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 0 , y : 0})
	} else {
		createjs.Tween.get(obj2 , {loop : false})
		.to({x :-Math.abs(349.09090909090907) , y : -170} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x :-Math.abs(699.1803278688524) , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 0 , y : 0})

		createjs.Tween.get(obj1, {loop : false})
		.to({x :349.09090909090907 , y : 170} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x :699.1803278688524 , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 0 , y : 0})
	}
	
}

function L_to_M(obj1,obj2) {
	let animType = _animRandomizer();
	if (animType == 0) {
		createjs.Tween.get(obj2 , {loop : false})
		.to({x :-Math.abs(349.09090909090907 / 2) , y : 170} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x :-Math.abs(349.09090909090907) , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 0 , y : 0})

		createjs.Tween.get(obj1, {loop : false})
		.to({x :349.09090909090907 / 2 , y : -170} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x :349.09090909090907 , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 0 , y : 0})
	} else {
		createjs.Tween.get(obj2 , {loop : false})
		.to({x :-Math.abs(349.09090909090907 / 2) , y : -170} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x :-Math.abs(349.09090909090907) , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 0 , y : 0})

		createjs.Tween.get(obj1, {loop : false})
		.to({x :349.09090909090907 / 2 , y : 170} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x :349.09090909090907 , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 0 , y : 0})
	}

}



function _animRandomizer(){
	return Math.floor(Math.random() * 2);
}

let _animPoint = [
	0,1,2,1,0,2,1,0,1,0,
	// {1,2,0,1,2,2,0,1,2,0,1,2,2,0},
	// {2,1,0,1,1,0,2,1,0,1,0,2,0,1},
]


function _callAnim () {

	openBucketA_arrow.alpha = 0;
	openBucketB_arrow.alpha = 0;
	openBucketC_arrow.alpha = 0;
	openBucketA.interactive = false;
	openBucketB.interactive = false;
	openBucketC.interactive = false;

	let _animCount = 0;
	_animRecall(_animCount);

	function _animRecall(_animCount) {
		let animType = _animPoint[_animCount];
		if (animType == 1) {
			L_to_M(B_Bucket,C_Bucket)
			_fadeobj(openBucketC,openBucketCMove);
			_fadeobj(openBucketB,openBucketBMove);
		} else if (animType == 2) {
			L_to_M(A_Bucket,B_Bucket)
			_fadeobj(openBucketA,openBucketAMove);
			_fadeobj(openBucketB,openBucketBMove);
		} else {
			L_to_R(A_Bucket,C_Bucket)
			_fadeobj(openBucketA,openBucketAMove);
			_fadeobj(openBucketC,openBucketCMove);
		}

		_animCount++;
		if (_animCount < _animPoint.length) {
			setTimeout(function(){
				return _animRecall(_animCount);
			},(animSpeed * 2) + 50);
		} else {
			_animCount = 0;
			setTimeout(function(){

				openBucketA_arrow.alpha = 1;
				openBucketB_arrow.alpha = 1;
				openBucketC_arrow.alpha = 1;
				openBucketA.interactive = true;
				openBucketB.interactive = true;
				openBucketC.interactive = true;
			},(animSpeed * 2) + 50)
		}
	}

}


function _fadeobj(obj1,obj2){
	obj1.alpha = 0;
	obj2.alpha = 1;

	setTimeout(function(){
		obj1.alpha = 1;
		obj2.alpha = 0;
	},150)
}



function bucketA_Anim(eventData){
 	openBucketA.play()
 	openBucketA_arrow.alpha = 0;
 	openBucketALight.alpha = 0;
 	openBucketA.interactive = false;

 	createjs.Tween.get(openBucketA,{loop : false})
 	.to({y : openBucketA.y - 160 , x : openBucketA.x - 11},250, createjs.Ease.getPowInOut(1))
 	.to({ x : openBucketA.x - 10},100, createjs.Ease.getPowInOut(1))

 	createjs.Tween.get(openBucketAShadow,{loop : false})
 	.to({
 		height : openBucketAShadow.height + 300,
 		width : openBucketAShadow.width - 100,
 		rotation : -1 ,
 	 	x : openBucketAShadow.x + 50 ,
 	 	y : openBucketAShadow.y - 90
 	 },250, createjs.Ease.getPowInOut(1))

 	setTimeout(function(){
 		closeBucketA.x = openBucketA.x;
 		closeBucketA.y = openBucketA.y;
 		closeBucketA.alpha = 1;
 		openBucketA.alpha = 0;
 	},500);


 	setTimeout(function(){
 		openBucketB.play()
 		openBucketB_arrow.alpha = 0;
 		openBucketBLight.alpha = 0;
 		openBucketB.interactive = false;
 		createjs.Tween.get(openBucketB,{loop : false})
 		.to({y : openBucketB.y - 160 , x : openBucketB.x - 11},250, createjs.Ease.getPowInOut(1))
 		.to({ x : openBucketB.x - 10},100, createjs.Ease.getPowInOut(1))
 		createjs.Tween.get(openBucketBShadow,{loop : false})
 		.to({
 			height : openBucketBShadow.height + 300,
 			width : openBucketBShadow.width - 100,
 			rotation : -1 ,
 		 	x : openBucketBShadow.x + 50 ,
 		 	y : openBucketBShadow.y - 90
 		 },250, createjs.Ease.getPowInOut(1))

 		setTimeout(function(){
 			closeBucketB.x = openBucketB.x;
 			closeBucketB.y = openBucketB.y;
 			closeBucketB.alpha = 1;
 			openBucketB.alpha = 0;
 		},500);

 		openBucketC.play()
 		openBucketC_arrow.alpha = 0;
 		openBucketCLight.alpha = 0;
 		openBucketC.interactive = false;
 		createjs.Tween.get(openBucketC,{loop : false})
 		.to({y : openBucketC.y - 160 , x : openBucketC.x - 11},250, createjs.Ease.getPowInOut(1))
 		.to({ x : openBucketC.x - 10},100, createjs.Ease.getPowInOut(1))
 		createjs.Tween.get(openBucketCShadow,{loop : false})
 		.to({
 			height : openBucketCShadow.height + 300,
 			width : openBucketCShadow.width - 100,
 			rotation : -1 ,
 		 	x : openBucketCShadow.x + 50 ,
 		 	y : openBucketCShadow.y - 90
 		 },250, createjs.Ease.getPowInOut(1))

 		setTimeout(function(){
 			closeBucketC.x = openBucketC.x;
 			closeBucketC.y = openBucketC.y;
 			closeBucketC.alpha = 1;
 			openBucketC.alpha = 0;

 			closeBucketAnim();
 		},500);

 	},1000);
}


function bucketB_Anim(eventData){
 	openBucketB.play()
 	openBucketB_arrow.alpha = 0;
 	openBucketBLight.alpha = 0;
 	openBucketB.interactive = false;
 	createjs.Tween.get(openBucketB,{loop : false})
 	.to({y : openBucketB.y - 160 , x : openBucketB.x - 11},250, createjs.Ease.getPowInOut(1))
 	.to({ x : openBucketB.x - 10},100, createjs.Ease.getPowInOut(1))
 	createjs.Tween.get(openBucketBShadow,{loop : false})
 	.to({
 		height : openBucketBShadow.height + 300,
 		width : openBucketBShadow.width - 100,
 		rotation : -1 ,
 	 	x : openBucketBShadow.x + 50 ,
 	 	y : openBucketBShadow.y - 90
 	 },250, createjs.Ease.getPowInOut(1))


 	setTimeout(function(){
 		closeBucketB.x = openBucketB.x;
 		closeBucketB.y = openBucketB.y;
 		closeBucketB.alpha = 1;
 		openBucketB.alpha = 0;
 	},500);

 	setTimeout(function(){
 		openBucketC.play()
 		openBucketC_arrow.alpha = 0;
 		openBucketCLight.alpha = 0;
 		openBucketC.interactive = false;
 		createjs.Tween.get(openBucketC,{loop : false})
 		.to({y : openBucketC.y - 160 , x : openBucketC.x - 11},250, createjs.Ease.getPowInOut(1))
 		.to({ x : openBucketC.x - 10},100, createjs.Ease.getPowInOut(1))
 		createjs.Tween.get(openBucketCShadow,{loop : false})
 		.to({
 			height : openBucketCShadow.height + 300,
 			width : openBucketCShadow.width - 100,
 			rotation : -1 ,
 		 	x : openBucketCShadow.x + 50 ,
 		 	y : openBucketCShadow.y - 90
 		 },250, createjs.Ease.getPowInOut(1))

 		setTimeout(function(){
 			closeBucketC.x = openBucketC.x;
 			closeBucketC.y = openBucketC.y;
 			closeBucketC.alpha = 1;
 			openBucketC.alpha = 0;
 		},500);


 		openBucketA.play()
 		openBucketA_arrow.alpha = 0;
 		openBucketALight.alpha = 0;
 		openBucketA.interactive = false;
 		createjs.Tween.get(openBucketA,{loop : false})
 		.to({y : openBucketA.y - 160 , x : openBucketA.x - 11},250, createjs.Ease.getPowInOut(1))
 		.to({ x : openBucketA.x - 10},100, createjs.Ease.getPowInOut(1))

 		createjs.Tween.get(openBucketAShadow,{loop : false})
 		.to({
 			height : openBucketAShadow.height + 300,
 			width : openBucketAShadow.width - 100,
 			rotation : -1 ,
 		 	x : openBucketAShadow.x + 50 ,
 		 	y : openBucketAShadow.y - 90
 		 },250, createjs.Ease.getPowInOut(1))

 		setTimeout(function(){
 			closeBucketA.x = openBucketA.x;
 			closeBucketA.y = openBucketA.y;
 			closeBucketA.alpha = 1;
 			openBucketA.alpha = 0;

 			closeBucketAnim();
 		},500);


 	},1000);
 	
}

function bucketC_Anim(eventData){
 	openBucketC.play()
 	openBucketC_arrow.alpha = 0;
 	openBucketCLight.alpha = 0;
 	openBucketC.interactive = false;


 	createjs.Tween.get(openBucketC,{loop : false})
 	.to({y : openBucketC.y - 160 , x : openBucketC.x - 11},250, createjs.Ease.getPowInOut(1))
 	.to({ x : openBucketC.x - 10},100, createjs.Ease.getPowInOut(1))
 	createjs.Tween.get(openBucketCShadow,{loop : false})
 	.to({
 		height : openBucketCShadow.height + 300,
 		width : openBucketCShadow.width - 100,
 		rotation : -1 ,
 	 	x : openBucketCShadow.x + 50 ,
 	 	y : openBucketCShadow.y - 90
 	 },250, createjs.Ease.getPowInOut(1))

 	setTimeout(function(){
 		closeBucketC.x = openBucketC.x;
 		closeBucketC.y = openBucketC.y;
 		closeBucketC.alpha = 1;
 		openBucketC.alpha = 0;
 	},500);


 	setTimeout(function(){
 		openBucketB.play()
 		openBucketB_arrow.alpha = 0;
 		openBucketBLight.alpha = 0;
 		openBucketB.interactive = false;
 		createjs.Tween.get(openBucketB,{loop : false})
 		.to({y : openBucketB.y - 160 , x : openBucketB.x - 11},250, createjs.Ease.getPowInOut(1))
 		.to({ x : openBucketB.x - 10},100, createjs.Ease.getPowInOut(1))
 		createjs.Tween.get(openBucketBShadow,{loop : false})
 		.to({
 			height : openBucketBShadow.height + 300,
 			width : openBucketBShadow.width - 100,
 			rotation : -1 ,
 		 	x : openBucketBShadow.x + 50 ,
 		 	y : openBucketBShadow.y - 90
 		 },250, createjs.Ease.getPowInOut(1))


 		setTimeout(function(){
 			closeBucketA.x = openBucketA.x;
 			closeBucketA.y = openBucketA.y;
 			closeBucketA.alpha = 1;
 			openBucketA.alpha = 0;
 		},500);


 		openBucketA.play()


 		openBucketA_arrow.alpha = 0;
 		openBucketALight.alpha = 0;
 		openBucketA.interactive = false;
 		createjs.Tween.get(openBucketA,{loop : false})
 		.to({y : openBucketA.y - 160 , x : openBucketA.x - 11},250, createjs.Ease.getPowInOut(1))
 		.to({ x : openBucketA.x - 10},100, createjs.Ease.getPowInOut(1))

 		createjs.Tween.get(openBucketAShadow,{loop : false})
 		.to({
 			height : openBucketAShadow.height + 300,
 			width : openBucketAShadow.width - 100,
 			rotation : -1 ,
 		 	x : openBucketAShadow.x + 50 ,
 		 	y : openBucketAShadow.y - 90
 		 },250, createjs.Ease.getPowInOut(1))


 		setTimeout(function(){
 			closeBucketB.x = openBucketB.x;
 			closeBucketB.y = openBucketB.y;
 			closeBucketB.alpha = 1;
 			openBucketB.alpha = 0;

 			closeBucketAnim();
 		},500);

 	},1000);
 	
}


function closeBucketAnim(){

	
	createjs.Tween.get(closeBucketA,{loop : false})
	.to({y : closeBucketA.y - 20 },150, createjs.Ease.getPowInOut(1))
	.to({y : closeBucketA.y + 160 , x : closeBucketA.x + 11},250, createjs.Ease.getPowInOut(1))
	.to({ x : closeBucketA.x + 10},100, createjs.Ease.getPowInOut(1))
	setTimeout(function(){
		closeBucketA.play()
		createjs.Tween.get(openBucketAShadow,{loop : false})
		.to({
			height : openBucketAShadow.height - 300,
			width : openBucketAShadow.width + 100,
			rotation : 0 ,
		 	x : openBucketAShadow.x - 50 ,
		 	y : openBucketAShadow.y + 90
		 },250, createjs.Ease.getPowInOut(1))



		setTimeout(function(){
			openBucketA.x = closeBucketA.x;
			openBucketA.y = closeBucketA.y;
			closeBucketA.alpha = 0;
			openBucketA.alpha = 1;
			closeBucketA.gotoAndStop(0);
			openBucketA.gotoAndStop(0);

		},500);
	},150)






	createjs.Tween.get(closeBucketB,{loop : false})
	.to({y : closeBucketB.y - 20 },150, createjs.Ease.getPowInOut(1))
	.to({y : closeBucketB.y + 160 , x : closeBucketB.x + 11},250, createjs.Ease.getPowInOut(1))
	.to({ x : closeBucketB.x + 10},100, createjs.Ease.getPowInOut(1))
	setTimeout(function(){
		closeBucketB.play()
		createjs.Tween.get(openBucketBShadow,{loop : false})
		.to({
			height : openBucketBShadow.height - 300,
			width : openBucketBShadow.width + 100,
			rotation : 0 ,
		 	x : openBucketBShadow.x - 50 ,
		 	y : openBucketBShadow.y + 90
		 },250, createjs.Ease.getPowInOut(1))



		setTimeout(function(){
			openBucketB.x = closeBucketB.x;
			openBucketB.y = closeBucketB.y;
			closeBucketB.alpha = 0;
			openBucketB.alpha = 1;
			closeBucketB.gotoAndStop(0)
			openBucketB.gotoAndStop(0)
		},500);
	},150)



	
	createjs.Tween.get(closeBucketC,{loop : false})
	.to({y : closeBucketC.y - 20 },150, createjs.Ease.getPowInOut(1))
	.to({y : closeBucketC.y + 160 , x : closeBucketC.x + 11},250, createjs.Ease.getPowInOut(1))
	.to({ x : closeBucketC.x + 10},100, createjs.Ease.getPowInOut(1))
	setTimeout(function(){
		closeBucketC.play();
		createjs.Tween.get(openBucketCShadow,{loop : false})
		.to({
			height : openBucketCShadow.height - 300,
			width : openBucketCShadow.width + 100,
			rotation : 0 ,
		 	x : openBucketCShadow.x - 50 ,
		 	y : openBucketCShadow.y + 90
		 },250, createjs.Ease.getPowInOut(1))


		setTimeout(function(){
			openBucketC.x = closeBucketC.x;
			openBucketC.y = closeBucketC.y;
			closeBucketC.alpha = 0;
			openBucketC.alpha = 1;
			closeBucketC.gotoAndStop(0);
			openBucketC.gotoAndStop(0);
		},500);
	},150)



	setTimeout(function(){
		_callAnim();
	},1000);


}




function resize() {
    if (window.innerWidth / window.innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
    }
    game.renderer.view.style.width = w + 'px';
    game.renderer.view.style.height = h + 'px';
}

window.onresize = resize;


createjs.Ticker.framerate = 60;
document.body.appendChild(game.view);