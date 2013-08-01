var scene;
var o_positions = {};

if(jQuery)(function($){
	$.extend($.fn, {
		WebGL : function(opt){
			var self = this;
			var defaults = {
					width :  770,
					height : 600,
					key_right : "D",
					key_left : "A",
					key_down : "S",
					key_up : "W",
					key_break : "M",
					load_width : 120,
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
			var m_position = { x : 0, y : 0, z : 0 };
			var m_speed = { x : 0, y : 0, z : 0 };
			var m_limitspeed = { x : 50, y : 50, z : 50 };

			var road_object;
			var road_position = { x : -15, y : -2.5, z : 180 };
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
			/** Initialize **/

			this.init = function(){
				self.settingRender( defaults.width, defaults.height )
				self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
				self.settingKey();
				self.settingMouse();
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
				loader.load( './image/Police car.obj', function ( object ) {
					object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material.map = texture;
						}
					} );
					car_leader_model = object;
				} );
				
				
			},
			this.returnScene = function(){
				return scene;
			},
			this.initCamera = function(){
				self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
			},
			this.settingRender = function( width, height ){
				renderer = new THREE.WebGLRenderer();
				scene = new THREE.Scene();
				renderer.setSize( width, height );
				document.body.appendChild( renderer.domElement );
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
				renderer.render( scene, camera );
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
			this.drawCar3D = function( position, name, color ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh = car_leader_model.clone();
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					mesh.scale.x = 0.02;
					mesh.scale.y = 0.02;
					mesh.scale.z = 0.02;
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
				
				road.src = "./image/board1.png";
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
			}
			return this;
		},
	})
})(jQuery);
