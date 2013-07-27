var gl;
window.onload = function() {
	gl = $("#container").WebGL();
	gl.init();
	gl.test();
};
if(jQuery)(function($){
	$.extend($.fn, {
		WebGL : function(opt){
			var self = this;
			var defaults = {
					width :  800,
					height : 600,
					camerax : -20,
					cameray : 5,
					cameraz : 0,
					key_right : "D",
					key_left : "A",
					key_down : "S",
					key_up : "W",
					key_break : "M"
			};$.extend(defaults, opt);

			var renderer, scene;
			var camara, light;
			var target= new THREE.Vector3(), lon = 90, lat = 0, phi = 0, theta = 0;
			var isUserInteracting = false;
			var onPointerDownPointerX,onPointerDownPointerY;
			var onPointerDownLon,onPointerDownLat;

			var currentlyPressedKeys = {};
			var camera_lookat = { x : 0, y : 0, z : 0 };
			var camera_position = { x : defaults.camerax, y : defaults.cameray, z : defaults.cameraz };
			var simulation_speed = 20;

			var m_speed = { x : 0, y : 0, z : 0 };
			var m_limitspeed = { x : 50, y : 50, z : 50 };
			var m_position = { x : defaults.camerax, y : defaults.cameray, z : defaults.cameraz };
			var o_positions = [];

			/** Initialize **/
			this.init = function(){
				self.settingRender( defaults.width, defaults.height )
				self.settingCamera( defaults.camerax, defaults.cameray, defaults.cameraz, target )
				self.settingLight( 0xFFFF00, 10, 20, 10 );
				renderer.render( scene, camera );
				self.settingKey();
				self.settingMouse();
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
							m_position.x += m_speed.x
							m_position.y += m_speed.y
							m_position.z += m_speed.z
							self.controlCamera( m_position.x, m_position.y, m_position.z, camera_lookat );
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
				if( String.fromCharCode(event.keyCode) == defaults.key_left ){
					camera_lookat.z -= 0.1;
					self.controlCamera( m_position.x, m_position.y, m_position.z, camera_lookat );
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_right ){
					camera_lookat.z += 0.1;
					self.controlCamera( m_position.x, m_position.y, m_position.z, camera_lookat );
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_up ){
					m_speed.x += 0.001;
					self.controlCamera( m_position.x, m_position.y, m_position.z, camera_lookat );
				}
				if( String.fromCharCode(event.keyCode) == defaults.key_down ){
					m_speed.x -= 0.001;
					self.controlCamera( m_position.x, m_position.y, m_position.z, camera_lookat );
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
				
			},
			
			
			this.test = function(){
				var geometry = new THREE.CubeGeometry( 5, 5, 5 );
				var material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
				var mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );
				renderer.render( scene, camera );
			}
			return this;
		},
	})
})(jQuery);
