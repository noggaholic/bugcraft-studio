'use strict';

const cameraViewerData = () => {
  return {}
};

var matrix = new THREE.Matrix4();

const start = () => {

  var container;

  var camera, scene, renderer;

  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  init();
  animate();

  function init() {
    const cameraContainer = document.querySelector('#cameraContainer');
  	container = document.createElement( 'div' );
  	cameraContainer.appendChild( container );

  	camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 1000 );
  	camera.position.z = 140;

  	// scene

  	scene = new THREE.Scene();

  	var ambient = new THREE.AmbientLight( 0xc1c1c1 );
  	scene.add( ambient );

  	var directionalLight = new THREE.DirectionalLight( 0xc1c1c1 );
  	directionalLight.position.set( 0, 0, 1 );
  	scene.add( directionalLight );

  	// texture

  	var manager = new THREE.LoadingManager();
  	manager.onProgress = function ( item, loaded, total ) {

  		console.log( item, loaded, total );

  	};

  	var texture = new THREE.Texture();

  	var onProgress = function ( xhr ) {
  		if ( xhr.lengthComputable ) {
  			var percentComplete = xhr.loaded / xhr.total * 100;
  			console.log( Math.round(percentComplete, 2) + '% downloaded' );
  		}
  	};

  	var onError = function ( xhr ) {
  	};


  	var loader = new THREE.ImageLoader( manager );
  	loader.load( './resources/3d/texture.jpg', function ( image ) {

  		texture.image = image;
  		texture.needsUpdate = true;

  	} );

  	// model

  	var loader = new THREE.OBJLoader( manager );
  	loader.load( './resources/3d/camera.obj', function ( object ) {

  		object.traverse( function ( child ) {

  			if ( child instanceof THREE.Mesh ) {

  				child.material.map = texture;

  			}

  		} );

      object.name = "camera";
      object.position.z -= 70;

      var camAxis = new THREE.AxisHelper(20);
      object.add(camAxis);

  		scene.add( object );

  	}, onProgress, onError );

  	renderer = new THREE.WebGLRenderer({ alpha: true });
  	renderer.setPixelRatio( window.devicePixelRatio );
  	renderer.setSize( 150, 150 );
    renderer.setClearColor( 0x1a1a1a, 0);
  	container.appendChild( renderer.domElement );

  	window.addEventListener( 'resize', onWindowResize, false );

  }

  function onWindowResize() {

  	windowHalfX = window.innerWidth / 2;
  	windowHalfY = window.innerHeight / 2;

  	camera.aspect = window.innerWidth / window.innerHeight;
  	camera.updateProjectionMatrix();

  	renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

  	requestAnimationFrame( animate );
  	render();

  }

  function render() {
    var camObj = scene.getObjectByName( "camera" );
    if (camObj && matrix) {
      camObj.setRotationFromMatrix(matrix);
    }
  	camera.lookAt( scene.position );

  	renderer.render( scene, camera );

  }
};

const getViewMatrix = () => setInterval(() => {
  const m = manager.getMessage('CAMERA_VIEW_MATRIX')
  matrix.set(m[0][0], m[1][0], m[2][0], 0,
             m[0][1], m[1][1], m[2][1], 0,
             m[0][2], m[1][2], m[2][2], 0,
              0.0000,  0.0000, 0.000,  1);

}, 16);

let viewMatrixInterval = null;

Vue.component('cameraViewer', {
  data: cameraViewerData,
  mounted: () => {
    // start();
    // viewMatrixInterval = getViewMatrix();
  },
  beforeDestroy:  () => {
    clearInterval(viewMatrixInterval);
  },
  template: `<div id="cameraContainer"></div>`
});
