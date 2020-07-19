
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (window.mobileCheck()) {
	size = [360,640];
} else {
	size = [1990,1080];
}

var ratio = size[0] / size[1];

// Aliases
let Application = PIXI.Application,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite;

let bucketSheet = [];

PIXI.settings.RESOLUTION = window.devicePixelRatio || 1; // added this

let game = new Application({width : 256, height : 256});

// game.renderer.view.style.position = "absolute";
game.renderer.view.style.display = "block";
game.renderer.autoResize = true;
if (window.mobileCheck()) {
	game.renderer.resize(360,640);
} else {
	game.renderer.resize(1920, 1080);
}



game.maxFPS = 59.99;

game.stage;

loader.add("assets/images/game-background.jpg")
	  .add("assets/images/mobile-background.jpg")
	  .add("glow","assets/images/bg-hd-glow.png")
	  .add("bucket","assets/images/bucket-HD.png")
	  .add("ui","assets/images/game-ui.png")
	  .add("arrow","assets/images/arrow-HD.png")
	  .load(setup);

function setup() {
	if (window.mobileCheck()) {
		background = new Sprite(resources['assets/images/mobile-background.jpg'].texture);
		background.width = 360;
		background.height = 640;
	} else {

		background = new Sprite(resources['assets/images/game-background.jpg'].texture);
		background.width = 1920;
		background.height = 1080;
	}


	let bucket_image =  new PIXI.BaseTexture.from(loader.resources['bucket'].url);

	let gameui = new PIXI.BaseTexture.from(loader.resources['ui'].url);

	let backgroundGlow = new PIXI.BaseTexture.from(loader.resources['glow'].url);

	let arrow_image = new PIXI.BaseTexture.from(loader.resources['arrow'].url);


	bucketSheet['logo'] = [
		new PIXI.Texture(gameui , new PIXI.Rectangle(495,637,292,98)),
	];



	bucketSheet['open'] = [
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(994,344,260,324)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(725,301,265,335)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(441,301,280,329)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(1326,334,288,311)),
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(1592,2,294,297)),
	];


	bucketSheet['soundOn'] = [
		new PIXI.Texture(gameui , new PIXI.Rectangle(329,789,61,62)),
	];



	bucketSheet['soundOff'] = [
		new PIXI.Texture(gameui , new PIXI.Rectangle(0,850,61,62)),
	];


	bucketSheet['help'] = [
		new PIXI.Texture(gameui , new PIXI.Rectangle(123,849,61,62)),
	];


	bucketSheet['circleBtn'] = [
		new PIXI.Texture(gameui , new PIXI.Rectangle(391,787,61,62)),
	];


	bucketSheet['arrowBtnOn'] = [
		new PIXI.Texture(gameui , new PIXI.Rectangle(214,786,115,102)),
	];



	bucketSheet['arrowBtnOff'] = [
		new PIXI.Texture(gameui , new PIXI.Rectangle(779,806,115,102)),
	];


	bucketSheet['glow'] = [
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(2,2,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(258,2,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(514,2,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(770,2,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1026,2,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1282,2,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1538,2,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1794,2,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(2050,2,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(2306,2,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(2,144,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(258,144,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(514,144,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(770,144,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1026,144,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1282,144,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1538,144,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1794,144,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(2050,144,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(2306,144,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(2,286,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(258,286,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(514,286,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(770,286,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1026,286,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1282,286,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1538,286,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(1794,286,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(2050,286,252,138)),
		new PIXI.Texture(backgroundGlow , new PIXI.Rectangle(2306,286,252,138)),
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

	bucketSheet['bucketGem'] = [
		new PIXI.Texture(bucket_image , new PIXI.Rectangle(909,670,147,166)),
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

	openBucketAGem = new PIXI.AnimatedSprite(bucketSheet.bucketGem);
	openBucketAGem.anchor.set(0.5);
	openBucketAGem.x = openBucketA.x;
	openBucketAGem.y = game.view.height / 2;
	openBucketAGem.alpha = 0;

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


	A_Bucket = new PIXI.Container();
	A_Bucket.addChild(openBucketAShadow,openBucketAGem,closeBucketA,openBucketALight,openBucketA,openBucketA_arrow,openBucketAMove);


	// BUCKET 2
	openBucketB = new PIXI.AnimatedSprite(bucketSheet.open);
	openBucketB.on('mousedown',bucketB_Anim);
	openBucketB.on('touchstart',bucketB_Anim);
	openBucketB.interactive   = true;
	openBucketB.buttonMode  = true;
	openBucketB.defaultCursor  = 'pointer';
	openBucketB.anchor.set(0.5);
	openBucketB.animationSpeed = .3;
	openBucketB.loop = false;
	openBucketB.x = game.view.width /2.75;
	openBucketB.y = game.view.height / 2.4;


	openBucketBGem = new PIXI.AnimatedSprite(bucketSheet.bucketGem);
	openBucketBGem.anchor.set(0.5);
	openBucketBGem.x = openBucketB.x;
	openBucketBGem.y = game.view.height / 2;
	openBucketBGem.alpha = 0;


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


	B_Bucket = new PIXI.Container();
	B_Bucket.addChild(openBucketBShadow,openBucketBGem,closeBucketB,openBucketBLight,openBucketB,openBucketB_arrow,openBucketBMove);



	// BUCKET 3
	openBucketC = new PIXI.AnimatedSprite(bucketSheet.open);
	openBucketC.on('mousedown',bucketC_Anim);
	openBucketC.on('touchstart',bucketC_Anim);
	openBucketC.interactive   = true;
	openBucketC.buttonMode  = true;
	openBucketC.defaultCursor  = 'pointer';
	openBucketC.anchor.set(0.5);
	openBucketC.animationSpeed = .3;
	openBucketC.loop = false;
	openBucketC.x = game.view.width /1.83;
	openBucketC.y = game.view.height / 2.4;

	openBucketCGem = new PIXI.AnimatedSprite(bucketSheet.bucketGem);
	openBucketCGem.anchor.set(0.5);
	openBucketCGem.x = openBucketC.x;
	openBucketCGem.y = game.view.height / 2;
	openBucketCGem.alpha = 0;
	

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



	C_Bucket = new PIXI.Container();
	C_Bucket.addChild(openBucketCShadow,openBucketCGem,closeBucketC,openBucketCLight,openBucketC,openBucketC_arrow,openBucketCMove);

	let arrow =  new PIXI.BaseTexture.from(loader.resources['arrow'].url);

	bgGlow = new PIXI.AnimatedSprite(bucketSheet.glow);
	bgGlow.animationSpeed = .2;
	bgGlow.alpha = 0.8;
	bgGlow.scale.set(5.14,5.14);
	bgGlow.x = 60;
	bgGlow.y = 130;
	bgGlow.play();





	soundOn = new PIXI.AnimatedSprite(bucketSheet.soundOn);
	soundOff = new PIXI.AnimatedSprite(bucketSheet.soundOff);
	help = new PIXI.AnimatedSprite(bucketSheet.help);
	circleBtn = new PIXI.AnimatedSprite(bucketSheet.circleBtn);

	rightArrowBtnOn = new PIXI.AnimatedSprite(bucketSheet.arrowBtnOn);
	rightArrowBtnOff = new PIXI.AnimatedSprite(bucketSheet.arrowBtnOff);

	rightArrowBtnOn.scale.set(1,1)
	rightArrowBtnOn.x = 940;
	rightArrowBtnOn.y = 932;

	rightArrowBtnOff.scale.set(1,1)
	rightArrowBtnOff.x = rightArrowBtnOn.x;
	rightArrowBtnOff.y = rightArrowBtnOn.y;
	rightArrowBtnOff.interactive   = true;
	rightArrowBtnOff.buttonMode  = true;
	rightArrowBtnOff.defaultCursor  = 'pointer';
	rightArrowBtnOff.on('mousedown',ArrowHoverOn);
	rightArrowBtnOff.on('mouseup',ArrowHoverOff);
	rightArrowBtnOff.on('touchstart',ArrowHoverOn);
	rightArrowBtnOff.on('touchend',ArrowHoverOff);
	rightArrowTxt = new PIXI.Text('MAX',{fontFamily : 'Arial', fontSize: 24, fill : 'black',  fontWeight : 'bold' ,align : 'center'});
	rightArrowTxt.x = rightArrowBtnOn.x + 30;
	rightArrowTxt.y = rightArrowBtnOn.y + 37;




	leftArrowBtnOn = new PIXI.AnimatedSprite(bucketSheet.arrowBtnOn);
	leftArrowBtnOff = new PIXI.AnimatedSprite(bucketSheet.arrowBtnOff);

	leftArrowBtnOn.scale.set(1,1)
	leftArrowBtnOn.x = 296;
	leftArrowBtnOn.y = 932;
	leftArrowBtnOn.anchor.set(1);
	leftArrowBtnOn.rotation = 3.15;


	leftArrowBtnOff.scale.set(1,1)
	leftArrowBtnOff.x = leftArrowBtnOn.x;
	leftArrowBtnOff.y = leftArrowBtnOn.y;
	leftArrowBtnOff.rotation = 3.15;
	leftArrowBtnOff.anchor.set(1);
	leftArrowBtnOff.interactive   = true;
	leftArrowBtnOff.buttonMode  = true;
	leftArrowBtnOff.defaultCursor  = 'pointer';
	leftArrowBtnOff.on('mousedown',ArrowHoverOn);
	leftArrowBtnOff.on('mouseup',ArrowHoverOff);
	leftArrowBtnOff.on('touchstart',ArrowHoverOn);
	leftArrowBtnOff.on('touchend',ArrowHoverOff);
	leftArrowTxt = new PIXI.Text('MIN',{fontFamily : 'Arial', fontSize: 24, fill : 'black',  fontWeight : 'bold' ,align : 'center'});
	leftArrowTxt.x = leftArrowBtnOn.x + 45;
	leftArrowTxt.y = leftArrowBtnOn.y + 37;

	betTitle = new PIXI.Text('Total Bet',{ fontSize: 35, fill : '#333',  fontWeight : '600' ,align : 'center'});
	betTitle.y = game.view.height / 1.2;
	betTitle.x = game.view.width / 3.2;
	betTitle.alpha = 0.8;


	gameLogo = new PIXI.AnimatedSprite(bucketSheet.logo);
	gameLogo.x = window.innerWidth / 3.5;
	gameLogo.y = 10;

	uiContainer = new PIXI.Container();

	uiContainer.addChild(rightArrowBtnOn,rightArrowBtnOff,rightArrowTxt , leftArrowBtnOn , leftArrowBtnOff , leftArrowTxt , betTitle , gameLogo)


	game.stage.addChild(background,bgGlow,uiContainer,A_Bucket,B_Bucket,C_Bucket);

	completeLoad();

	if (window.mobileCheck()) {
		mobileDevicesResize();
	}
	animatedArrow(openBucketA_arrow);
	animatedArrow(openBucketB_arrow);
	animatedArrow(openBucketC_arrow);

}

function mobileDevicesResize(){

	bgGlow.alpha = 0;
	openBucketA.scale.set(0.35,0.35);
	openBucketB.scale.set(0.35,0.35);
	openBucketC.scale.set(0.35,0.35);
	openBucketA.x = 65;
	openBucketB.x = 180;
	openBucketC.x = 295;

	openBucketA.y = 300;
	openBucketB.y = 300;
	openBucketC.y = 300;
	closeBucketA.scale.set(0.35,0.35);
	openBucketAMove.scale.set(0.35,0.35);
	openBucketALight.scale.set(0.35,0.35);
	openBucketAShadow.scale.set(0.5,0.5);
	openBucketA_arrow.scale.set(0.35,0.35);
	openBucketAMove.scale.set(0.35,0.35);
	// openBucketAMove.alpha = 1;


	// openBucketB.scale.set(0.35,0.35);
	closeBucketB.scale.set(0.35,0.35);
	openBucketBMove.scale.set(0.35,0.35);
	openBucketBLight.scale.set(0.35,0.35);
	openBucketBShadow.scale.set(0.5,0.5);
	openBucketB_arrow.scale.set(0.35,0.35);
	openBucketBMove.scale.set(0.35,0.35);
	// openBucketBMove.alpha = 1;

	// openBucketC.scale.set(0.35,0.35);
	closeBucketC.scale.set(0.35,0.35);
	openBucketCMove.scale.set(0.35,0.35);
	openBucketCLight.scale.set(0.35,0.35);
	openBucketCShadow.scale.set(0.5,0.5);
	openBucketC_arrow.scale.set(0.35,0.35);
	openBucketCMove.scale.set(0.35,0.35);
	// openBucketCMove.alpha = 1;


	openBucketAShadow.x = openBucketA.x + 15;
	openBucketAShadow.y = openBucketA.y + 50;

	openBucketBShadow.x = openBucketB.x + 15;
	openBucketBShadow.y = openBucketB.y + 50;

	openBucketCShadow.x = openBucketC.x + 15;
	openBucketCShadow.y = openBucketC.y + 50;


	openBucketC_arrow.x = openBucketC.x + 3;
	openBucketC_arrow.y = openBucketC.y - 80;

	openBucketB_arrow.x = openBucketB.x + 3;
	openBucketB_arrow.y = openBucketB.y - 80;

	openBucketA_arrow.x = openBucketA.x + 3;
	openBucketA_arrow.y = openBucketA.y - 80;

	openBucketAMove.y = openBucketA.y - 60;
	openBucketBMove.y = openBucketB.y - 60;
	openBucketCMove.y = openBucketC.y - 60;

	openBucketAMove.x = openBucketA.x - 55;
	openBucketBMove.x = openBucketB.x - 55;
	openBucketCMove.x = openBucketC.x - 55;


	rightArrowBtnOn.y = 129;
	rightArrowBtnOn.x = 299.8;
	rightArrowBtnOn.scale.set(0.48,0.48)
	rightArrowBtnOff.y = 129;
	rightArrowBtnOff.x = 299.8;
	rightArrowBtnOff.scale.set(0.48,0.48)

	leftArrowBtnOn.y = 129;
	leftArrowBtnOn.x = 5.5;
	leftArrowBtnOn.scale.set(0.48,0.48)
	leftArrowBtnOff.y = 129;
	leftArrowBtnOff.x = 5.5;
	leftArrowBtnOff.scale.set(0.48,0.48)

	rightArrowTxt.x = rightArrowBtnOn.x + 10;
	rightArrowTxt.style.fontSize = 12;
	rightArrowTxt.y = rightArrowBtnOn.y + 18;


	leftArrowTxt.x = leftArrowBtnOn.x + 20;
	leftArrowTxt.style.fontSize = 13;
	leftArrowTxt.y = leftArrowBtnOn.y + 16;

	betTitle.x = 150;
	betTitle.y = 120;
	betTitle.style.fontSize = 13;
	betTitle.style.fill = '#c19358';


	gameLogo.x = 70;
	gameLogo.y = 30;
	gameLogo.scale.set(0.7,0.7)


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
	if (window.mobileCheck()) {
		createjs.Tween.get(obj2 , {loop : false})
		.to({x : -110 , y : 100} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : -230 , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 0 , y : 0})

		createjs.Tween.get(obj1, {loop : false})
		.to({x : 110 , y : -100} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 230 , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
		.to({x : 0 , y : 0})
	} else {
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

	
}

function L_to_M(obj1,obj2) {
	let animType = _animRandomizer();
	if (window.mobileCheck()) {
			createjs.Tween.get(obj2 , {loop : false})
			.to({x : -30 , y : 50} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
			.to({x : -115 , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
			.to({x : 0 , y : 0})
			createjs.Tween.get(obj1, {loop : false})
			.to({x : 30 , y : -50} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
			.to({x : 115 , y : 0} ,  animSpeed ,  createjs.Ease.getPowInOut(1))
			.to({x : 0 , y : 0})


	} else {

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

}



function _animRandomizer(){
	return Math.floor(Math.random() * 2);
}

let _animPoint = [
	1,2,0,1,2,2,0,1,2,0,1,2,2,0
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

 	if (window.mobileCheck()) {
 		createjs.Tween.get(openBucketA,{loop : false})
 		.to({y : openBucketA.y - 80 , x : openBucketA.x - 6},250, createjs.Ease.getPowInOut(1))
 		.to({ x : openBucketA.x - 5},100, createjs.Ease.getPowInOut(1))

 		createjs.Tween.get(openBucketAShadow,{loop : false})
 		.to({
 			height : openBucketAShadow.height + 100,
 			width : openBucketAShadow.width - 50,
 			rotation : -0.8 ,
 		 	x : openBucketAShadow.x + 20,
 		 	y : openBucketAShadow.y - 60
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
	 		.to({y : openBucketB.y - 80 , x : openBucketB.x - 6},250, createjs.Ease.getPowInOut(1))
	 		.to({ x : openBucketB.x - 5},100, createjs.Ease.getPowInOut(1))
	 		createjs.Tween.get(openBucketBShadow,{loop : false})
	 		.to({
	 			height : openBucketBShadow.height + 100,
	 			width : openBucketBShadow.width - 50,
	 			rotation : -1 ,
	 		 	x : openBucketBShadow.x + 20 ,
	 		 	y : openBucketBShadow.y - 60
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
	 		.to({y : openBucketC.y - 80 , x : openBucketC.x - 6},250, createjs.Ease.getPowInOut(1))
	 		.to({ x : openBucketC.x - 5},100, createjs.Ease.getPowInOut(1))
	 		createjs.Tween.get(openBucketCShadow,{loop : false})
	 		.to({
	 			height : openBucketCShadow.height + 100,
	 			width : openBucketCShadow.width  - 50,
	 			rotation : -1 ,
	 		 	x : openBucketCShadow.x + 20 ,
	 		 	y : openBucketCShadow.y - 60
	 		 },250, createjs.Ease.getPowInOut(1))

	 		setTimeout(function(){
	 			closeBucketC.x = openBucketC.x;
	 			closeBucketC.y = openBucketC.y;
	 			closeBucketC.alpha = 1;
	 			openBucketC.alpha = 0;
	 			closeBucketAnim();
	 		},500);

 		},1000);
 	} else {
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



}


function bucketB_Anim(eventData){

 	if (window.mobileCheck()) {
 		openBucketB.play()
 		openBucketB_arrow.alpha = 0;
 		openBucketBLight.alpha = 0;
 		openBucketB.interactive = false;
 		createjs.Tween.get(openBucketB,{loop : false})
 		.to({y : openBucketB.y - 80 , x : openBucketB.x - 6},250, createjs.Ease.getPowInOut(1))
 		.to({ x : openBucketB.x - 5},100, createjs.Ease.getPowInOut(1))
 		createjs.Tween.get(openBucketBShadow,{loop : false})
 		.to({
 			height : openBucketBShadow.height + 100,
 			width : openBucketBShadow.width - 50,
 			rotation : -1 ,
 		 	x : openBucketBShadow.x + 20 ,
 		 	y : openBucketBShadow.y - 60
 		 },250, createjs.Ease.getPowInOut(1))

 		setTimeout(function(){
 			closeBucketB.x = openBucketB.x;
 			closeBucketB.y = openBucketB.y;
 			closeBucketB.alpha = 1;
 			openBucketB.alpha = 0;
 		},500);
		

 		setTimeout(function(){
			openBucketA.play()
			openBucketA_arrow.alpha = 0;
			openBucketALight.alpha = 0;
			openBucketA.interactive = false;

	 		createjs.Tween.get(openBucketA,{loop : false})
	 		.to({y : openBucketA.y - 80 , x : openBucketA.x - 6},250, createjs.Ease.getPowInOut(1))
	 		.to({ x : openBucketA.x - 5},100, createjs.Ease.getPowInOut(1))

	 		createjs.Tween.get(openBucketAShadow,{loop : false})
	 		.to({
	 			height : openBucketAShadow.height + 100,
	 			width : openBucketAShadow.width - 50,
	 			rotation : -0.8 ,
	 		 	x : openBucketAShadow.x + 20,
	 		 	y : openBucketAShadow.y - 60
	 		 },250, createjs.Ease.getPowInOut(1))

	 		setTimeout(function(){
	 			closeBucketA.x = openBucketA.x;
	 			closeBucketA.y = openBucketA.y;
	 			closeBucketA.alpha = 1;
	 			openBucketA.alpha = 0;
	 		},500);


	 		openBucketC.play()
	 		openBucketC_arrow.alpha = 0;
	 		openBucketCLight.alpha = 0;
	 		openBucketC.interactive = false;
	 		createjs.Tween.get(openBucketC,{loop : false})
	 		.to({y : openBucketC.y - 80 , x : openBucketC.x - 6},250, createjs.Ease.getPowInOut(1))
	 		.to({ x : openBucketC.x - 5},100, createjs.Ease.getPowInOut(1))
	 		createjs.Tween.get(openBucketCShadow,{loop : false})
	 		.to({
	 			height : openBucketCShadow.height + 100,
	 			width : openBucketCShadow.width  - 50,
	 			rotation : -1 ,
	 		 	x : openBucketCShadow.x + 20 ,
	 		 	y : openBucketCShadow.y - 60
	 		 },250, createjs.Ease.getPowInOut(1))

	 		setTimeout(function(){
	 			closeBucketC.x = openBucketC.x;
	 			closeBucketC.y = openBucketC.y;
	 			closeBucketC.alpha = 1;
	 			openBucketC.alpha = 0;
	 			closeBucketAnim();
	 		},500);

 		},1000);
 	} else {
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

 	
}

function bucketC_Anim(eventData){
	if(window.mobileCheck()){

		openBucketC.play()
		openBucketC_arrow.alpha = 0;
		openBucketCLight.alpha = 0;
		openBucketC.interactive = false;
		createjs.Tween.get(openBucketC,{loop : false})
		.to({y : openBucketC.y - 80 , x : openBucketC.x - 6},250, createjs.Ease.getPowInOut(1))
		.to({ x : openBucketC.x - 5},100, createjs.Ease.getPowInOut(1))
		createjs.Tween.get(openBucketCShadow,{loop : false})
		.to({
			height : openBucketCShadow.height + 100,
			width : openBucketCShadow.width  - 50,
			rotation : -1 ,
		 	x : openBucketCShadow.x + 20 ,
		 	y : openBucketCShadow.y - 60
		 },250, createjs.Ease.getPowInOut(1))

		setTimeout(function(){
			closeBucketC.x = openBucketC.x;
			closeBucketC.y = openBucketC.y;
			closeBucketC.alpha = 1;
			openBucketC.alpha = 0;
			
		},500);
		
 		setTimeout(function(){
			openBucketA.play()
			openBucketA_arrow.alpha = 0;
			openBucketALight.alpha = 0;
			openBucketA.interactive = false;

	 		createjs.Tween.get(openBucketA,{loop : false})
	 		.to({y : openBucketA.y - 80 , x : openBucketA.x - 6},250, createjs.Ease.getPowInOut(1))
	 		.to({ x : openBucketA.x - 5},100, createjs.Ease.getPowInOut(1))

	 		createjs.Tween.get(openBucketAShadow,{loop : false})
	 		.to({
	 			height : openBucketAShadow.height + 100,
	 			width : openBucketAShadow.width - 50,
	 			rotation : -0.8 ,
	 		 	x : openBucketAShadow.x + 20,
	 		 	y : openBucketAShadow.y - 60
	 		 },250, createjs.Ease.getPowInOut(1))

	 		setTimeout(function(){
	 			closeBucketA.x = openBucketA.x;
	 			closeBucketA.y = openBucketA.y;
	 			closeBucketA.alpha = 1;
	 			openBucketA.alpha = 0;
	 		},500);



	 		openBucketB.play()
	 		openBucketB_arrow.alpha = 0;
	 		openBucketBLight.alpha = 0;
	 		openBucketB.interactive = false;
	 		createjs.Tween.get(openBucketB,{loop : false})
	 		.to({y : openBucketB.y - 80 , x : openBucketB.x - 6},250, createjs.Ease.getPowInOut(1))
	 		.to({ x : openBucketB.x - 5},100, createjs.Ease.getPowInOut(1))
	 		createjs.Tween.get(openBucketBShadow,{loop : false})
	 		.to({
	 			height : openBucketBShadow.height + 100,
	 			width : openBucketBShadow.width - 50,
	 			rotation : -1 ,
	 		 	x : openBucketBShadow.x + 20 ,
	 		 	y : openBucketBShadow.y - 60
	 		 },250, createjs.Ease.getPowInOut(1))

	 		setTimeout(function(){
	 			closeBucketB.x = openBucketB.x;
	 			closeBucketB.y = openBucketB.y;
	 			closeBucketB.alpha = 1;
	 			openBucketB.alpha = 0;
	 			closeBucketAnim();
	 		},500);

 		},1000);
	} else {
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
 	
 	
}


function closeBucketAnim(){


	if (window.mobileCheck()) {
		createjs.Tween.get(closeBucketA,{loop : false})
		.to({y : closeBucketA.y - 20 },150, createjs.Ease.getPowInOut(1))
		.to({y : closeBucketA.y + 80 , x : closeBucketA.x + 11},250, createjs.Ease.getPowInOut(1))
		.to({ x : closeBucketA.x + 5},100, createjs.Ease.getPowInOut(1))
		setTimeout(function(){
			closeBucketA.play()
			createjs.Tween.get(openBucketAShadow,{loop : false})
			.to({
				height : openBucketAShadow.height - 100,
				width : openBucketAShadow.width + 50,
				rotation : 0 ,
			 	x : openBucketAShadow.x - 20 ,
			 	y : openBucketAShadow.y + 60
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
		.to({y : closeBucketB.y + 80 , x : closeBucketB.x + 11},250, createjs.Ease.getPowInOut(1))
		.to({ x : closeBucketB.x + 5},100, createjs.Ease.getPowInOut(1))
		setTimeout(function(){
			closeBucketB.play()
			createjs.Tween.get(openBucketBShadow,{loop : false})
			.to({
				height : openBucketBShadow.height - 100,
				width : openBucketBShadow.width + 50,
				rotation : 0 ,
			 	x : openBucketBShadow.x - 20 ,
			 	y : openBucketBShadow.y + 60
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
		.to({y : closeBucketC.y + 80 , x : closeBucketC.x + 11},250, createjs.Ease.getPowInOut(1))
		.to({ x : closeBucketC.x + 5},100, createjs.Ease.getPowInOut(1))
		setTimeout(function(){
			closeBucketC.play();
			createjs.Tween.get(openBucketCShadow,{loop : false})
			.to({
				height : openBucketCShadow.height - 100,
				width : openBucketCShadow.width + 50,
				rotation : 0 ,
			 	x : openBucketCShadow.x - 20 ,
			 	y : openBucketCShadow.y + 60
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
	} else {
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

function ArrowHoverOn(){
	this.alpha = 0;
}

function ArrowHoverOff(){
	this.alpha = 1;
}



window.onresize = resize;


createjs.Ticker.framerate = 60;
document.body.appendChild(game.view);