var gl;
var scene;
window.onload = function() {
	gl = $("#container").WebGL();
	gl.init();
};
if(jQuery)(function($){
	$.extend($.fn, {
		WebGL : function(opt){
			var self = this;
			var defaults = {
					width :  800,
					height : 600,
					camera_x : -20,
					camera_y : 5,
					camera_z : 0,
					position_x : 10,
					position_y : 0,
					position_z : 0,
					key_right : "D",
					key_left : "A",
					key_down : "S",
					key_up : "W",
					key_break : "M"
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

			var camera_lookat = { x : 0, y : 0, z : 0 };
			var camera_position = { x : defaults.camera_x, y : defaults.camera_y, z : defaults.camera_z };
			var m_position = { x : defaults.position_x, y : defaults.position_y, z : defaults.position_z };

			var m_speed = { x : 0, y : 0, z : 0 };
			var m_limitspeed = { x : 50, y : 50, z : 50 };
			
			/** Other value **/
			
			var road_object;
			var road_position = { x : 0, y : -2.5, z : 0 };
			var road_scale = { x : 100, y : 0.2,z : 20 };

			/** Car value **/

			var o_positions = {};

			/** Initialize **/

			this.init = function(){
				self.settingRender( defaults.width, defaults.height )
				self.settingCamera( defaults.camera_x, defaults.camera_y, defaults.camera_z, target )
				self.settingLight( 0xFFFF00, 10, 20, 10 );
				self.settingKey();
				self.settingMouse();
				self.drawCar( m_position, 0xFF0000, 0 );
				self.drawLoad( road_position, road_scale, "roada" );
//				self.drawCar( {x:10,y:0,z:0}, 0xFF0000, 0 );
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
			},
			this.rendering = function(){
				function myLoop () {           
					setTimeout(function () {    
						if(isUserInteracting){
							
						}else{
							renderer.render( scene, camera );
						}
						myLoop();
					}, simulation_speed )
				}
				myLoop();
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
					press += 1;
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_right ){
					press += 10;
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_up ){
					press += 100;
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_down ){
					press += 1000;
				}
				switch(press){
				case 1:
					m_position.z -= 0.2;
					break;
				case 10:
					m_position.z += 0.2;
					break;
				case 100:
					m_position.x += 0.2;
					break;
				case 101:
					m_position.x += 0.2;
					m_position.z -= 0.2;
					break;
				case 110:
					m_position.x += 0.2;
					m_position.z += 0.2;
					break;
				case 1000:
					m_position.x -= 0.2;
					break;
				case 1001:
					m_position.x -= 0.2;
					m_position.z -= 0.2;
					break;
				case 1010:
					m_position.x -= 0.2;
					m_position.z += 0.2;
					break;
				}
				self.drawCar(m_position, "", 0);
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

					target.x = 100 * Math.sin( phi ) * Math.cos( theta );
					target.y = 100 * Math.cos( phi );
					target.z = 100 * Math.sin( phi ) * Math.sin( theta );

					self.controlCamera( -target.x, -target.y, -target.z, target );
					renderer.render( scene, camera );
				}
			},
			
			this.controlMouseUp = function(event){
				isUserInteracting = false;
			},
			
			this.controlMouseOut = function(){
				isUserInteracting = false;
			},
			
			this.drawCar = function( position, color, name ){
				var target = o_positions[name];
				if( target == undefined ){
					var geometry = new THREE.CubeGeometry( 0.2, 5, 5 );
					var material = new THREE.MeshLambertMaterial( { color: color } );
					var mesh = new THREE.Mesh( geometry, material );
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
			
			this.drawLoad = function( position, scale, name ){
				var geometry = new THREE.CubeGeometry( scale.x, scale.y, scale.z );
				var material = new THREE.MeshLambertMaterial( { color: 0x888888 } );
				var mesh = new THREE.Mesh( geometry, material );
				mesh.name = name;
				mesh.position.x = position.x;
				mesh.position.y = position.y;
				mesh.position.z = position.z;
				o_positions[name] = mesh;
				scene.add( mesh );
			}
			return this;
		},
	})
})(jQuery);
