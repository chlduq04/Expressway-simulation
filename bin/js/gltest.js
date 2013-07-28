var scene;
var o_positions = {};

if(jQuery)(function($){
	$.extend($.fn, {
		WebGL : function(opt){
			var self = this;
			var defaults = {
					width :  800,
					height : 600,
					key_right : "D",
					key_left : "A",
					key_down : "S",
					key_up : "W",
					key_break : "M",
					load_width : 150,
					load_length : 800
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

			var camera_lookat = { x : 0, y : 0, z : 100 };
			var camera_position = { x : 0, y : 100, z : -500 };
			var m_position = { x : 0, y : 0, z : 0 };
			var m_speed = { x : 0, y : 0, z : 0 };
			var m_limitspeed = { x : 50, y : 50, z : 50 };
			
			/** Other value **/
			
			var road_object;
			var road_position = { x : 0, y : -2.5, z : 150 };
			var road_scale = { x : defaults.load_width, y : 0.2, z : defaults.load_length };

			/** Car value **/

			var car_front_img = new Image();
			car_front_img.src = "./image/carfront.png";
			var car_back_img = new Image();
			car_back_img.src = "./image/carback.png";
			var road = new Image();
			road.src = "./image/board1.png";
			var geometry = new THREE.CubeGeometry( 5, 5, 0.001 );
			var car_front_material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture(car_front_img.src), transparent: true } );
			var car_back_material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture(car_back_img.src), transparent: true } );
			var road_material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture(road.src), transparent: false } );

			
			/** Initialize **/

			this.init = function(){
				self.settingRender( defaults.width, defaults.height )
				self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
				self.settingLight( 0xFFFFFF, 0, 150, 0 );
				self.settingKey();
				self.settingMouse();
				self.drawLoad( road_position, road_scale, "road" );
				renderer.render( scene, camera );
			},

			/** Setting **/

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
					m_position.z -= 0.2;
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_right ){
					m_position.z += 0.2;
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_up ){
					m_position.x += 0.2;
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_down ){
					m_position.x -= 0.2;
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
				camera.fov -= event.originalEvent.wheelDeltaY * 0.05;
				camera.updateProjectionMatrix();
				renderer.render( scene, camera );
			},
			this.controlMouseUp = function(event){
				isUserInteracting = false;
			},
			
			this.controlMouseOut = function(){
				isUserInteracting = false;
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
			this.deleteCar = function( name ){
				scene.remove( o_positions[name] );
				delete o_positions[name];
			},
			this.resetCar = function(){
				
			},
			this.drawLoad = function( position, scale, name ){
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
			return this;
		},
	})
})(jQuery);
