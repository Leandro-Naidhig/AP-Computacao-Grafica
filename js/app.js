/**************** Defining Scene and Cameras ****************/

// Adding scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500000);


/**************** Defining Listener ****************/
var listener = new THREE.AudioListener();
camera.add( listener );


/**************** Defining Reder WebGL ****************/

// Adding renderer WebGL
var renderer = new THREE.WebGLRenderer();
//var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight*0.95);
document.body.appendChild(renderer.domElement);
renderer.setClearColor( 0x7ec0ee ); 

/******* Defining Lights and adding them to scene ******/

var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
pointLight.position.set(0,1000,0);
camera.add( pointLight );
scene.add( camera );

var ambientLight = new THREE.AmbientLight( 0xdddddd, 0.9 );
scene.add( ambientLight );

var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.position.set( 0, 50000, 0 );
scene.add( hemiLight );


//scene.fog = new THREE.Fog( 0xffffff, 4000, 5000 );


var light = new THREE.DirectionalLight( 0xffffff, 1 );

light.position.multiplyScalar( 50 );
scene.add( light );
light.castShadow = true;
light.shadowMapWidth = 2048;
light.shadowMapHeight = 2048;
var d = 50;
light.shadowCameraLeft = -d;
light.shadowCameraRight = d;
light.shadowCameraTop = d;
light.shadowCameraBottom = -d;
light.shadowCameraFar = 3500;
light.shadowBias = -0.0001;
//light.shadowDarkness = 0.35;


// SKYDOME
var vertexShader = document.getElementById( 'vertexShader' ).textContent;
var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
var uniforms = {
	topColor: 	 { type: "c", value: new THREE.Color( 0x0077ff ) },
	bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
	offset:		 { type: "f", value: 33 },
	exponent:	 { type: "f", value: 0.6 }
}
uniforms.topColor.value.copy( hemiLight.color );
//scene.fog.color.copy( uniforms.bottomColor.value );
var skyGeo = new THREE.SphereGeometry( 260000, 32, 15 );
var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );
var sky = new THREE.Mesh( skyGeo, skyMat );
scene.add( sky );




// Allow update viewport size on resize
window.addEventListener('resize', function () {
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});


/**************** Defining controls ****************/

// Add orbit controls (Cool)
var controls = new THREE.OrbitControls(camera, renderer.domElement);


/*************** Trasformation Matrix **************/

//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:false} );
var material1 = new THREE.ShaderMaterial({
	uniforms: {
		trans: {
			type: "mat4",
			value: new THREE.Matrix4().set(
				25, 0, 0, 700,
				0, 25, 0, 0,
				0, 0, 25, 0,
				0, 0, 0, 1
			)
		}
	},

	vertexShader: document.getElementById("vertexShaders2").textContent,
	fragmentShader: document.getElementById("fragmentShaders").textContent
});

var material2 = new THREE.ShaderMaterial({
	uniforms: {
		trans: {
			type: "mat4",
			value: new THREE.Matrix4().set(
				10, 0, 0, 700,
				0, 10, 0, 0,
				0, 0, 10, 0,
				0, 0, 0, 1
			)
		}
	},

	vertexShader: document.getElementById("vertexShaders1").textContent,
	fragmentShader: document.getElementById("fragmentShaders").textContent
});


/********** Defining objects and textures **********/

//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:false} );
var material3 = new THREE.ShaderMaterial({
	vertexShader: document.getElementById("vertexShaders1").textContent,
	fragmentShader: document.getElementById("fragmentShaders").textContent
});


/********** Loading objects and textures **********/

// While on progress and when a error occoues messeges */
var onProgress = function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	}

var onError = function (error) {
		console.log('An error happened');
	}

// Load DDSLoader
THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());


// Objects list
var casa;
var knuckles;
var moon;
var castle;
var chef;
var water;
var star;
var fiona;
var sunKnucles;
var tailsPlanet;
var amyPlanet;
var sonicPlanet;


// Load Peach Castle
mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/PeachsCastle/');
mtlLoader.load("Castle.mtl", function(materials) {
    materials.preload();
    
    // Load  object to the scene
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/PeachsCastle/');
    objLoader.load("Castle.obj", function(object){
	        object.position.set(0, -4500, 0);
	        object.scale.set(10000, 10000, 10000);
	        castle = object;
	        scene.add(object);
    }, onProgress, onError);
}, onProgress, onError); 

// Load Moon
mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/Moon/');
mtlLoader.load("moon.mtl", function(materials) {
    materials.preload();
    
    // Load  object to the scene
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/Moon/');
    objLoader.load("moon.obj", function(object){
	        object.position.set(0, 40000, -70000);
	        object.scale.set(1, 1, 1);
	        moon = object;
	        scene.add(object);
    }, onProgress, onError);
}, onProgress, onError); 

// Load Chef
mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/Chef/');
mtlLoader.load("Chef.mtl", function(materials) {
    materials.preload();
    
    // Load  object to the scene
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/Chef/');
    objLoader.load("Chef.obj", function(object){
	        object.position.set(-12200, -3500, 20500);
	        object.scale.set(1000, 1000, 1000);
	        object.rotation.set(0, 0.7, 0); 
	        chef = object;
	        scene.add(object);
    }, onProgress, onError);
}, onProgress, onError); 

// Load house.obj
objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/house/');
objLoader.load(
	// Resource URL
	'house.obj',

	// Called when resource is loaded
	function (object) {
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				// Assigned a personal shader
				child.material = material1;
			}
		});
		object.scale.set(10.0, 10.0, 10.0);
		object.position.set(0.5, 10.5, 0.5);
		casa = object
		scene.add(object);
	}, onProgress, onError
);

// Load Fiona
objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/Fiona/');
var phongMaterialFiona = new THREE.MeshPhongMaterial({color: 0x004d00, specular: 0x333333, shininess: 40});
objLoader.load(
	// Resource URL
	'fiona.obj',

	// Called when resource is loaded
	function (object) {
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				// Assigned a personal shader
				child.material = phongMaterialFiona;
			}
		});
		object.scale.set(10, 10, 10);
		object.position.set(47546, 715, 49527);
		object.rotation.y = Math.PI / 2;
		fiona = object;
		scene.add(object);
	}, onProgress, onError
);

mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/knuckles/');
mtlLoader.load("Knuckles.obj.mtl", function(materials) {
    materials.preload();
    
    //Carregamento do objeto para a cena
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/knuckles/');
    objLoader.load("Knuckles.obj", function(object){
	        //Configuração de posição, escala e rotaçaõ do objeto
	        object.position.set(0, 0, 0);
	        object.scale.set(0.5, 0.5, 0.5);
	        object.rotation.set(0, 0.7, 2); 
	        knuckles = object;
	        scene.add(object);
    });
}); 

mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/Battery/');
mtlLoader.load("battery.mtl", function(materials) {
    materials.preload();
    
    // Load  object to the scene
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/Battery/');
    objLoader.load("battery.obj", function(object){
        object.position.set(170, 130, -300);
        object.scale.set(100.01, 100.01, 100.01);
        object.rotation.set(0, 0.7, 2);
        
        battery = object;

        scene.add(object);
    });
}); 

// Load tree.obj
new THREE.OBJLoader().load(
	// Resource URL
	'obj/tree/tree.obj',

	// Called when resource is loaded
	function (object) {
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				// Assigned a personal shader
				child.material = material1;
			}
		});
		object.scale.set(1.0, 1.0, 1.0);
		object.position.set(0, 0, 0);
		// = object;
		scene.add(object);
	}, onProgress, onError
);

//Load Peach
mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/Peach/');
mtlLoader.load("DolPeachR1.mtl", function(materials) {
    materials.preload();
    
    //Carregamento do objeto para a cena
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/Peach/');
    objLoader.load("DolPeachR1.obj", function(object){
	        //Configuração de posição, escala do objeto
	        object.position.set(-27990, -1070, -27195);
	        object.scale.set(25, 25, 25);
	        peach = object;
	        scene.add(object);
    });
}); 


//Load Sun
mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/Sun/');
mtlLoader.load("sun.mtl", function(materials) {
    materials.preload();
    
    //Carregamento do objeto para a cena
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/Sun/');
    objLoader.load("sun.obj", function(object){
	        //Configuração de posição, escala do objeto
	        object.position.set(0, 40000, -100000);
	        object.scale.set(1000, 1000, 1000);
	        sun = object;
	        scene.add(object);
    });
}); 

// Aux Variables to control sun and moon
var orbitRadius = 250000;
var date;

// Phong material
var phongMaterial = new THREE.MeshPhongMaterial({color: 0x88aacc, specular: 0x333333});
// Load tree.obj
new THREE.OBJLoader().load(
	// Resource URL
	'obj/Rock1/Rock1.obj',

	// Called when resource is loaded
	function (object) {
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				// Assigned a personal shader
				child.material = phongMaterial;
			}
		});
		object.scale.set(10.0, 10.0, 10.0);
		object.position.set(0, 50, 0);
		star = object;
		scene.add(object);
	}, onProgress, onError
);

var waterGeometry = new THREE.PlaneBufferGeometry( 500000, 500000 );
	water = new THREE.Water(
		waterGeometry,
		{
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			}),
			alpha: 1.0,
			sunDirection: light.position.clone().normalize(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale:  3.7,
			fog: scene.fog !== undefined
		}
	);

	water.rotation.x = - Math.PI / 2;
	//water.scale.set(100, 100, 1);
	water.position.y = -3550;
	scene.add( water );

//Objeto simples com textura
//Textura com phong
texture = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture("obj/sphere/knuckles.png") });
//Criando a esfera
var sphere = new THREE.Mesh( new THREE.SphereGeometry(50, 320,320), texture);
sphere.position.set(-12000, -3400, 19000);
scene.add(sphere);

/**************** Planetary ****************/
// Sun Knucles
mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/knuckles/');
mtlLoader.load("Knuckles.obj.mtl", function(materials) {
    materials.preload();
    
    //Carregamento do objeto para a cena
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/knuckles/');
    objLoader.load("Knuckles.obj", function(object){
	        //Configuração de posição, escala e rotaçaõ do objeto
	        object.position.set(55000, 50000, 0);
	        object.scale.set(25.5, 25.5, 25.5);
	        sunKnucles = object;
	        scene.add(object);
    });
});


// Tails PLanet
mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/Tails/');
mtlLoader.load("MilesTailsPrower01.mtl", function(materials) {
    materials.preload();

    //Carregamento do objeto para a cena
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/Tails/');
    objLoader.load("MilesTailsPrower01.obj", function(object){
	        //Configuração de posição, escala e rotaçaõ do objeto
	        object.position.set(10, 10, 10);
	        object.scale.set(500.5, 500.5, 500.5);
	        tailsPlanet = object;
	        scene.add(object);
    });
});


// Rose Planet
mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/AmyRose/');
mtlLoader.load("AmyRose.mtl", function(materials) {
    materials.preload();
    
    //Carregamento do objeto para a cena
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/AmyRose/');
    objLoader.load("AmyRose.obj", function(object){
	        //Configuração de posição, escala e rotaçaõ do objeto
	        object.position.set(10, 10, 10);
	        object.scale.set(500.5, 500.5, 500.5);
	        amyPlanet = object;
	        scene.add(object);
    });
});

// Sonic Planet
mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/Sonic/');
mtlLoader.load("Sonic.mtl", function(materials) {
    materials.preload();
    
    //Carregamento do objeto para a cena
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/Sonic/');
    objLoader.load("Sonic.obj", function(object){
	        //Configuração de posição, escala e rotaçaõ do objeto
	        object.position.set(10, 10, 10);
	        object.scale.set(1000.5, 1000.5, 1000.5);
	        sonicPlanet = object;
	        scene.add(object);
    });
});


/**************** Loading and setting audios ****************/
var audioLoader = new THREE.AudioLoader();

// Change the position of the camera
camera.position.z = 1000;
//Curva de Bezier
curve1 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(-3400, -3000, 13000),//v0
	new THREE.Vector3(-5000, -3200, 15000),//v1
	new THREE.Vector3(-10200, -3500, 18000),//v2
	new THREE.Vector3(-11800, -3500, 20000)//v3
);

curve2 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(-11800, -3500, 20000),//v0
	new THREE.Vector3(-10000, -3500, 20000),//v1
	new THREE.Vector3(-9000, -3500, 23000),//v2
	new THREE.Vector3(-8000, -3500, 26000)//v3
);

curve3 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(45784, 822, 42473),//v0
	new THREE.Vector3(52000, 822, 38000),//v1
	new THREE.Vector3(58000, 715, 49000),//v2
	new THREE.Vector3(48000, 715, 49613)//v3
);

curve4 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(48000, 715, 49613),//v0
	new THREE.Vector3(52000, 822, 46000),//v1
	new THREE.Vector3(53400, 822, 51300),//v2
	new THREE.Vector3(52624, 822, 54874)//v3
);

curve5 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(-25312, -2770, 760),//v0
	new THREE.Vector3(-26300, -2930, -8000),//v1
	new THREE.Vector3(-30200, -3080, -10000),//v2
	new THREE.Vector3(-38240, -3200, -9000)//v3
);

curve6 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(-38240, -3200, -9000),//v0
	new THREE.Vector3(-43700, -3300, -9590),//v1
	new THREE.Vector3(-47500, -3100, -15500),//v2
	new THREE.Vector3(-42270, -2700, -23700)//v3
);

curve7 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(-42270, -2700, -23700),//v0
	new THREE.Vector3(-38750, -2327, -26537),//v1
	new THREE.Vector3(-33136, -1390, -21845),//v2
	new THREE.Vector3(-27790, -1065, -25071)//v3
);

curve8 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(-27790, -1065, -25071),//v0
	new THREE.Vector3(-27806, -1065, -26292),//v1
	new THREE.Vector3(-27690, -1065, -25566),//v2
	new THREE.Vector3(-27949, -1065, -26595)//v3
);

curve = curve1;
curve_cont = 0;


//Botão para mudar a camera
flagCamera = 1;
function changeCamera() {
	
	if (flagCamera == 1) {
		//camera.position.set(300,0,0);
		camera.up = new THREE.Vector3(0,0,1000);
		camera.rotation.y = 90 * Math.PI / 180;
		
		controls.enabled = false;
		
		flagCamera = 0;
	}
	else {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500000);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 1000;
		camera.rotation.y = 270 * Math.PI / 180;
		
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.enabled = true;
		
		flagCamera = 1;

	}
	controls.update();
}
var sound1 = new THREE.PositionalAudio( listener );
audioLoader.load( 'sound/dawe.wav', function( buffer ) {
	sound1.setBuffer( buffer );
	sound1.setRefDistance( 1000 );
});
var sound2 = new THREE.PositionalAudio( listener );
audioLoader.load( 'sound/goaway.wav', function( buffer ) {
	sound2.setBuffer( buffer );
	sound2.setLoop(true);
	sound2.setRefDistance( 1000 );
});


op = 0;
//Primeiro botão para interagir com a cena
function opcao1() {
	sound1.play();
	if (sound2.isPlaying) {
		sound2.stop();
	}
	knuckles.add(sound1);
//	curve_cont = 99.5;
	op++;
}

//Verifica se passou da curve 1 alguma vez
flag_camera = 0;
//Segundo botão para ir para a próxima cena
function opcao2() {
	
	//Primeira curva
	if (curve == curve1) {
		curve = curve2;
	}
	//Segunda curva
	else if (curve == curve3 || curve == curve2) {
		curve = curve4;

	}
	//Terceira curva
	else {
		curve = curve1;
	}
	
	curve_cont = 0;
	op++;

	sound2.play()
	sound1.stop()

	knuckles.add(sound2);
}

// Game logic
var update = function () {
	sunKnucles.rotation.x += 0.01;
	sunKnucles.rotation.y += 0.03;
	sunKnucles.rotation.z += 0.01;

	tailsPlanet.rotation.x += 0.1;
	tailsPlanet.rotation.y += 0.3;
	tailsPlanet.rotation.z += 0.1;

	amyPlanet.rotation.x += 0.1;
	amyPlanet.rotation.y += 0.3;
	amyPlanet.rotation.z += 0.1;

	sonicPlanet.rotation.x += 0.1;
	sonicPlanet.rotation.y += 0.3;
	sonicPlanet.rotation.z += 0.1;
	
	sphere.rotation.y += 0.05;
}

// Draw Scene
var render = function () {

	// Calculate the current point
	var point = curve.getUtoTmapping(curve_cont / 100);
	// Knucles walk on bezier curve
	knuckles.position.set(curve.getPointAt(point).x, curve.getPointAt(point).y, curve.getPointAt(point).z);
	// Keep Knuckles looking ahead 
	knuckles.lookAt(curve.getPointAt(curve.getUtoTmapping((curve_cont+0.01) / 100)));

	flag = 0;
	//Contadores da curva de Bézier
	if (curve_cont < 99.5) {
		curve_cont += 0.5;
	}
	else {
		flag = 1;
		curve_cont = 99.5;
	}
	//Segunda lógica
	if (curve == curve2 && curve_cont == 99.5 && flag == 1) {
		curve = curve3;
		curve_cont = 0;
	}
	else if (curve == curve4 && curve_cont == 99.5 && flag == 1) {
		curve = curve5;
		curve_cont = 0;
	}
	else if (curve == curve5 && curve_cont == 99.5 && flag == 1) {
		curve = curve6;
		curve_cont = 0;
	}
	else if (curve == curve6 && curve_cont == 99.5 && flag == 1) {
		curve = curve7;
		curve_cont = 0;
	}
	else if (curve == curve7 && curve_cont == 99.5 && flag == 1) {
		curve = curve8;
		curve_cont = 0;
	}	


	// Play and Stop music
	if(curve_cont == 99.5 && curve == curve1){
		if (sound2.isPlaying){
			sound2.stop();
		}
	}
	if(curve_cont == 99.5 && curve == curve3){
		if (sound2.isPlaying){
			sound2.stop();
		}
	}
	if(curve_cont == 99.5 && curve == curve8){
		if (sound2.isPlaying){
			sound2.stop();
		}
	}

	// 
	if (flagCamera == 0) {
		camera.lookAt(curve.getPointAt(curve.getUtoTmapping((curve_cont+0.01) / 100)));
		camera.position.x = knuckles.position.x;
		camera.position.y = knuckles.position.y + 350;
		camera.position.z = knuckles.position.z - 1200;
		
		camera.rotation.z = -Math.PI;
		if (curve == curve8) {
			camera.position.z += 3000;
//			camera.up.z = -1000;
			camera.rotation.x = Math.PI;
			camera.rotation.y = Math.PI;
			flag_camera = 1;
		}
		else if (curve == curve1 && flag_camera == 1) {
			camera.rotation.x = -Math.PI;
//			camera.rotation.y = -Math.PI;
		}
	}

	//Movimentação do Sol e da Lua
	date = Date.now() * 0.00005;
	sun_position_x = -Math.cos(date) * orbitRadius;
	sun_position_y = -Math.sin(date) * orbitRadius;
	moon.position.set( 
			Math.cos(date) * orbitRadius,Math.sin(date) * orbitRadius,0
		);
	moon.rotation.y =  -date + Math.PI/2;
 	sun.position.set(
 			sun_position_x,sun_position_y,0);
 	light.position.set(sun_position_x,sun_position_y,0);

 	if (sun_position_y > 0.2 *orbitRadius )   // day
    {
        sky.material.uniforms.topColor.value.setRGB(0.25,0.55,1);
        sky.material.uniforms.bottomColor.value.setRGB(1,1,1);
        var f = 1;
        light.intensity = f;
    }
    else if (sun_position_y < 0.2 * orbitRadius && sun_position_y > 0.0 *orbitRadius )
    {
        var f = sun_position_y/(0.2 * orbitRadius);
        light.intensity = f;
        sky.material.uniforms.topColor.value.setRGB(0.25*f,0.55*f,1*f);
        sky.material.uniforms.bottomColor.value.setRGB(1*f,   1*f,1*f);
    }
    else  // night
    {
        var f = 0;
        light.intensity = f;
        sky.material.uniforms.topColor.value.setRGB(0,0,0);
        sky.material.uniforms.bottomColor.value.setRGB(0,0,0);
    }	

    // Moving sunKnucles
    sunKnucles.position.set(Math.cos(date*10) * 100000 + 0, Math.sin(date*10) * 50000 + 100000, Math.sin(date*10) * 100000 + 0)

    // Moving TailslPlanet, AmyPLanet and SonicPlanet
    tailsPlanet.position.set(Math.cos(date*50) * 20000 + sunKnucles.position.x, Math.sin(date*50) *20000 + sunKnucles.position.y, Math.sin(date*50) * 20000 + sunKnucles.position.z);
    amyPlanet.position.set(Math.cos(date*50) * 20000 + sunKnucles.position.x, Math.sin(date*50) * 20000 + sunKnucles.position.y, -Math.sin(date*50) * 20000 + sunKnucles.position.z);
    sonicPlanet.position.set(Math.cos(date*50) * 20000 + sunKnucles.position.x, sunKnucles.position.y, -Math.sin(date*50) * 20000 + sunKnucles.position.z);

	water.material.uniforms.sunDirection.value.copy( light.position ).normalize();
	water.material.uniforms.time.value += 1.0 / 60.0;
	renderer.render(scene, camera);
};

// Run game loop
var GameLoop = function () {

	requestAnimationFrame(GameLoop);
	update();
	render();
};

// Where the program really runs
GameLoop();
