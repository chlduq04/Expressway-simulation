var scene;
var o_positions = {};

if(jQuery)(function($){
	$.extend($.fn, {
		WebGL : function(opt){
			var self = this;
			var canvas;
			var defaults = {
					width :  1280,
					height : 800,
					key_right : "D",
					key_left : "A",
					key_down : "S",
					key_up : "W",
					key_break : "M",
					load_width : 240,
					load_length : 1000
			};$.extend(defaults, opt);

			/** System value **/

			var renderer;
			var camara, light;
			var target= new THREE.Vector3(), lon = 90, lat = 0, phi = 0, theta = 0;
			var isUserInteracting = false;
			var onPointerDownPointerX,onPointerDownPointerY;
			var onPointerDownLon,onPointerDownLat;
			var simulation_speed = 20;
			var currentlyPressedKeys = {};

			/** Simulation value **/

			var camera_lookat = { x : -15, y : 0, z : 100 };
			var camera_position = { x : -15, y : 100, z : -500 };
			var camera_lookat_next = {x:0,y:0,z:0};
			var m_position = { x : 0, y : 0, z : 0 };
			var m_speed = { x : 0, y : 0, z : 0 };
			var m_limitspeed = { x : 50, y : 50, z : 50 };

			var road_object;
			var road_position = { x : -15, y : -1.0, z : 180 };
			var road_scale = { x : defaults.load_width, y : 2, z : defaults.load_length };

			/** Car value **/

			var car_front_img = new Image();
			var car_back_img = new Image();
			var road = new Image();
			car_front_img.src = "./image/carfront.png";
			car_back_img.src = "./image/carback.png";

			var geometry = new THREE.CubeGeometry( 5, 5, 10 );
			var car_front_material = new THREE.MeshLambertMaterial( { color : 0xFFFFFF } );
			var car_back_material = new THREE.MeshLambertMaterial( { color : 0xFFFFFF } );
//			var car_front_material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture(car_front_img.src), transparent: true } );
//			var car_back_material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture(car_back_img.src), transparent: true } );
			var car_leader = new THREE.MeshLambertMaterial( { color : 0xFF0000 } );
			var car_follower = new THREE.MeshLambertMaterial( { color : 0x00FFFF } );
			var car_normal = new THREE.MeshLambertMaterial( { color : 0x0000FF } );
			var road_material;
			var car_leader_model;
			var car_follower_model;
			var car_normal_model;

			/** Move Camera **/

			var camera_move = false;

			/** Sound **/

//			var character_sound = {};
//			var character_ctx = new AudioContext();
//			var character_request = new XMLHttpRequest();
			
			/** Get value **/

			this.returnCanvas = function(){
				return canvas;
			},
			/** Initialize **/

			this.init = function(){
				self.settingRender( defaults.width, defaults.height )
				self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
				self.settingKey();
				self.settingMouse();
				self.settingSound();
				self.controlSkybox();
				self.initCar();
				self.drawLoad( road_position, road_scale, "road" );
				self.settingLight( 0xFFFFFF, 0, 150, 0 );
				/** Sky box **/
				renderer.render( scene, camera );
			},

			/** Setting **/

			this.initCar = function(){
				/** 3D model **/
				var car3D;

				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {
					console.log( item, loaded, total );
				};



				var texture = new THREE.Texture();
				var loader = new THREE.ImageLoader( manager );
				loader.load( './image/red.jpg', function ( image ) {
					texture.image = image;
					texture.needsUpdate = true;
				} );
				var loader = new THREE.OBJLoader( manager );
				loader.load( './image/3.natla car.obj', function ( object ) {
					object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material.map = texture;
						}
					} );
					car_leader_model = object;
				} );


				var texture1 = new THREE.Texture();
				var loader1 = new THREE.ImageLoader( manager );
				loader1.load( './image/blue.jpg', function ( image ) {
					texture1.image = image;
					texture1.needsUpdate = true;
				} );

				var loader1 = new THREE.OBJLoader( manager );
				loader1.load( './image/3.natla car.obj', function ( object ) {
					object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material.map = texture1;
						}
					} );
					car_follower_model = object;
				} );


				var texture2 = new THREE.Texture();
				var loader2 = new THREE.ImageLoader( manager );
				loader2.load( './image/sky.jpg', function ( image ) {
					texture2.image = image;
					texture2.needsUpdate = true;
				} );
				var loader2 = new THREE.OBJLoader( manager );
				loader2.load( './image/3.natla car.obj', function ( object ) {
					object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material.map = texture2;
						}
					} );
					car_normal_model = object;
				} );


			},
			this.returnRequest = function(){
				return request;
			},
			this.returnScene = function(){
				return scene;
			},
			this.initCamera = function(){
				camera_lookat_next.x = camera.position.x;
				camera_lookat_next.y = camera.position.y;
				camera_lookat_next.z = camera.position.z + 50;
				self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
//				camera_move = true;
			},
			this.settingRender = function( width, height ){
				renderer = new THREE.WebGLRenderer();
				scene = new THREE.Scene();
				renderer.setSize( width, height );
				canvas = $(this)[0].appendChild( renderer.domElement );
			}
			this.settingCamera = function( x, y, z ){
				camera = new THREE.PerspectiveCamera(
						35,             // Field of view
						800 / 600,      // Aspect ratio
						0.1,            // Near plane
						10000           // Far plane
				);
				camera.position.set( x, y, z );                 
				camera.lookAt( camera_lookat );
			},
			this.settingLight = function( color, x, y, z ){
				light = new THREE.PointLight( color );
				light.position.set( x, y, z );
				scene.add( light );
			},
			this.settingKey = function(){
				document.onkeydown = self.controlKeyDown;
				document.onkeyup = self.controlKeyUp;
			},
			this.settingMouse = function(){
				var target = renderer.domElement;
				$(target).bind("mousedown",function(e){
					self.controlMouseDown(e);
				});
				$(target).bind("mousemove",function(e){
					self.controlMouseMove(e);
				});
				$(target).bind("mouseup",function(e){
					self.controlMouseUp(e);
				});
				$(target).bind("mouseout",function(e){
					self.controlMouseOut(e);
				});
				$(target).bind("mousewheel",function(e){
					self.controlMouseWheel(e);
				});

			},
			this.rendering = function(){
				/*
				if(camera_move){
					if( camera.position.y < camera_position.y * 2 ){
						camera.position.y += 0.5;
						camera_lookat_next.z += 1;
						camera.lookAt( camera_lookat_next );
					}else{
						self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
						camera_move = false;
					}
				}*/
				renderer.render( scene, camera );
			},

			/** audio **/
			
			this.settingSound = function(){
				self.sound("./sound/sound_car_drive.wav");
			},
			
			/** Control **/

			this.controlLight = function(){
				light = new THREE.PointLight( color );
				light.position.set( x, y, z );
				scene.add( light );
			},

			this.controlCamera = function( posx, posy, posz, lookat ){
				camera.position.set( posx, posy, posz );
				camera.lookAt( lookat );
			},

			this.controlKeyDown =  function (event) {
				currentlyPressedKeys[event.keyCode] = true;
				var press = 0;
				if( String.fromCharCode(event.keyCode) == defaults.key_left ){
					self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_right ){
					self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_up ){
					self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_down ){
					self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
				}
				renderer.render( scene, camera );
			},

			this.controlKeyUp = function(event) {
				currentlyPressedKeys[event.keyCode] = false;
			},

			this.controlMouseDown = function(event){
				event.preventDefault();
				isUserInteracting = true;

				onPointerDownPointerX = event.clientX;
				onPointerDownPointerY = event.clientY;

				onPointerDownLon = lon;
				onPointerDownLat = lat;
			},

			this.controlMouseMove = function(event){
				if ( isUserInteracting ) {
					lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
					lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

					lat = Math.max( - 85, Math.min( 85, lat ) );
					phi = THREE.Math.degToRad( 90 - lat );
					theta = THREE.Math.degToRad( lon );

					target.x = 400 * Math.sin( phi ) * Math.cos( theta );
					target.y = 400 * Math.cos( phi );
					target.z = 400 * Math.sin( phi ) * Math.sin( theta );

					self.controlCamera( -target.x, -target.y, -target.z, target );
					renderer.render( scene, camera );
				}
			},
			this.controlMouseWheel = function( event ) {
				camera.fov -= event.originalEvent.wheelDeltaY * 0.01;
				camera.updateProjectionMatrix();
				renderer.render( scene, camera );
			},
			this.controlMouseUp = function(event){
				isUserInteracting = false;
			},

			this.controlMouseOut = function(){
				isUserInteracting = false;
			},

			/** Game Setting **/

			this.controlSkybox = function(){
				var sky_materials = [
				                     self.loadTexture( './image/skybox/px.jpg' ), // right
				                     self.loadTexture( './image/skybox/nx.jpg' ), // left
				                     self.loadTexture( './image/skybox/py.jpg' ), // top
				                     self.loadTexture( './image/skybox/ny.jpg' ), // bottom
				                     self.loadTexture( './image/skybox/pz.jpg' ), // back
				                     self.loadTexture( './image/skybox/nz.jpg' )  // front
				                     ];

				var sky_mesh = new THREE.Mesh( new THREE.CubeGeometry( 800, 800, 800, 7, 7, 7 ), new THREE.MeshFaceMaterial( sky_materials ) );
				sky_mesh.scale.x = - 1;
				scene.add( sky_mesh );
			},

			/** Other setting function **/

			this.loadTexture = function( path ) {

				var texture = new THREE.Texture( renderer );
				var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: true } );

				var image = new Image();
				image.onload = function () {
					texture.needsUpdate = true;
					material.map.image = this;
					renderer.render( scene, camera );

				};
				image.src = path;

				return material;

			},

			/** Draw objects **/

			this.drawCar = function( position, name ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh = new THREE.Mesh( geometry, car_front_material );
					mesh.overdraw = true;
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					o_positions[name] = mesh;
					scene.add( mesh );
				}else{
					target.position.x = position.x;
					target.position.y = position.y;
					target.position.z = position.z;
				}
			},
			this.drawCarBack = function( position, name ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh = new THREE.Mesh( geometry, car_back_material );
					mesh.overdraw = true;
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					o_positions[name] = mesh;
					scene.add( mesh );
				}else{
					target.position.x = position.x;
					target.position.y = position.y;
					target.position.z = position.z;
				}
			},
			this.drawCarColor = function( position, name, color ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh;
					if(color == "leader"){
						mesh = new THREE.Mesh( geometry, car_leader );
					}else if(color == "follower"){
						mesh = new THREE.Mesh( geometry, car_follower );
					}else{
						mesh = new THREE.Mesh( geometry, car_normal );
					}
					mesh.overdraw = true;
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					o_positions[name] = mesh;
					scene.add( mesh );
				}else{
					if(color == "leader"){
						target.material = car_leader;
					}else if(color == "follower"){
						target.material = car_follower;
					}else{
						target.material = car_normal;
					}

					target.position.x = position.x;
					target.position.y = position.y;
					target.position.z = position.z;
				}
			},
			this.drawCarBack3D = function( position, name, color ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh;
					if(color == "leader"){
						mesh = car_leader_model.clone();
					}else if(color = "follower"){
						mesh = car_follower_model.clone();
					}else{
						mesh = car_normal_model.clone();
					}
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					mesh.scale.x = 8;
					mesh.scale.y = 10;
					mesh.scale.z = 6;
					mesh.rotation.y = Math.PI;
					o_positions[name] = mesh;
					scene.add( mesh );
				}else{
					target.position.x = position.x;
					target.position.y = position.y;
					target.position.z = position.z;
				}
			},
			this.drawCar3D = function( position, name, color ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh;
					if(color == "leader"){
						mesh = car_leader_model.clone();
					}else if(color = "follower"){
						mesh = car_follower_model.clone();
					}else{
						mesh = car_normal_model.clone();
					}
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					mesh.scale.x = 8;
					mesh.scale.y = 10;
					mesh.scale.z = 6;
					o_positions[name] = mesh;
					scene.add( mesh );
				}else{
					target.position.x = position.x;
					target.position.y = position.y;
					target.position.z = position.z;
				}
			},
			this.deleteCar = function( name ){
				scene.remove( o_positions[name] );
				delete o_positions[name];
			},
			this.resetCar = function(){

			},
			this.drawLoad = function( position, scale, name ){
				var material = new THREE.MeshLambertMaterial( { color : 0x006600 } );
				var geometry = new THREE.CubeGeometry( scale.x * 3, scale.y, scale.z );
				var mesh = new THREE.Mesh( geometry, material );
				mesh.name = name;
				mesh.position.x = position.x;
				mesh.position.y = position.y-2;
				mesh.position.z = position.z;
				o_positions[name] = mesh;
				scene.add( mesh );

				material = new THREE.MeshLambertMaterial( { color : 0xFFCC33 } );
				geometry = new THREE.CubeGeometry( scale.x * 1.2, scale.y, scale.z );
				mesh = new THREE.Mesh( geometry, material );
				mesh.name = name;
				mesh.position.x = position.x;
				mesh.position.y = position.y-1;
				mesh.position.z = position.z;
				o_positions[name] = mesh;
				scene.add( mesh );

				road.src = "./image/board2.png";
				road.onload = function(){
					road_material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture(road.src), transparent: false } );
					var geometry = new THREE.CubeGeometry( scale.x, scale.y, scale.z );
					var mesh = new THREE.Mesh( geometry, road_material );
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					o_positions[name] = mesh;
					scene.add( mesh );
					renderer.render( scene, camera );
				}
			},
			this.ui = function(){

			},
			this.characterControlSound = function( x, y, z ){
				// And copy the position over to the sound of the object.
				character_sound.panner.setPosition( x, y, z );
				character_ctx.listener.setPosition(p.x, p.y, p.z);

			},
			this.characterSound = function(url){
				window.AudioContext = (
						window.AudioContext ||
						window.webkitAudioContext ||
						null
				);

				if (!AudioContext) {
					throw new Error("AudioContext not supported!");
				} 

				// Create a new audio context.

				// Create a AudioGainNode to control the main volume.
				var mainVolume = character_ctx.createGain();
				// Connect the main volume node to the context destination.
				mainVolume.connect(character_ctx.destination);

				// Create an object with a sound source and a volume control.
				character_sound.source = character_ctx.createBufferSource();
				character_sound.volume = character_ctx.createGain();

				// Connect the sound source to the volume control.
				character_sound.source.connect(character_sound.volume);
				// Hook up the sound volume control to the main volume.
				character_sound.volume.connect(mainVolume);

				// Make the sound source loop.
				character_sound.source.loop = true;

				character_sound.panner = character_ctx.createPanner();
				// Instead of hooking up the volume to the main volume, hook it up to the panner.
				character_sound.volume.connect(character_sound.panner);
				// And hook up the panner to the main volume.
				character_sound.panner.connect(mainVolume);
				
				// Load a sound file using an ArrayBuffer XMLHttpRequest.
				character_request.open("GET", url, true);
				character_request.responseType = "arraybuffer";
				character_request.onload = function(e) {

					// Create a buffer from the response ArrayBuffer.
					var buffer = character_ctx.createBuffer(this.response, false);
					character_sound.buffer = buffer;

					// Make the sound source use the buffer and start playing it.
					character_sound.source.buffer = character_sound.buffer;
					character_sound.source.start(character_ctx.currentTime);
				};
				character_request.send();
			},
			this.sound = function(url){
				var sound = {};
				var request = new XMLHttpRequest();
				
				window.AudioContext = (
						window.AudioContext ||
						window.webkitAudioContext ||
						null
				);

				if (!AudioContext) {
					throw new Error("AudioContext not supported!");
				} 

				// Create a new audio context.
				var ctx = new AudioContext();

				// Create a AudioGainNode to control the main volume.
				var mainVolume = ctx.createGain();
				// Connect the main volume node to the context destination.
				mainVolume.connect(ctx.destination);

				// Create an object with a sound source and a volume control.
				sound.source = ctx.createBufferSource();
				sound.volume = ctx.createGain();

				// Connect the sound source to the volume control.
				sound.source.connect(sound.volume);
				// Hook up the sound volume control to the main volume.
				sound.volume.connect(mainVolume);

				// Make the sound source loop.
				sound.source.loop = true;
				
				// Load a sound file using an ArrayBuffer XMLHttpRequest.
				request.open("GET", url, true);
				request.responseType = "arraybuffer";
				request.onload = function(e) {

					// Create a buffer from the response ArrayBuffer.
					var buffer = ctx.createBuffer(this.response, false);
					sound.buffer = buffer;

					// Make the sound source use the buffer and start playing it.
					sound.source.buffer = sound.buffer;
					sound.source.start(ctx.currentTime);
				};
				request.send();
			}
			return this;
		},
	})
})(jQuery);
