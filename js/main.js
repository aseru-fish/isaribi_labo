var clock;
var deltaTime;
var renderer;
var scene;
var camera;

window.addEventListener("load", init);
//
function init() {
//時間
  clock = new THREE.Clock();
//Three.js
  //シーン
  scene = new THREE.Scene();
  //背景色
  scene.background = new THREE.Color(0x888888);
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  //レンダラー
  renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector("#renderer"),
    antialias: true 
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  document.querySelector('#p_renderer').appendChild( renderer.domElement );
  //カメラ
  /*camera = new THREE.OrthographicCamera(
      -vWidth/2, vWidth/2, vHeight/2, -vHeight/2,
      0.01,
      1000
　);*/
  camera = new THREE.PerspectiveCamera(
    30,
    width / height,
    1,
    1000
  );
  //照明
  light = new THREE.AmbientLight(0xFFFFFF, 1.0);
  scene.add(light);
  //カメラコントローラー
  const c = document.getElementById('renderer');
  const controls = new THREE.OrbitControls(camera, c);
  controls.update();
  
  
  //
  camera.position.set(0, 10, 10);
  // ----- 地面 -----
  var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0xeeeeee, depthWrite: false } ) );
  mesh.rotation.x = - Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add( mesh );
  //グリッド
  var grid = new THREE.GridHelper( 100, 20, 0x000000, 0x000000 );
	grid.material.opacity = 0.2;
	grid.material.transparent = true;
	scene.add( grid );
  //
  
  
  //Windowリサイズ時処理
  window.addEventListener( 'resize', onWindowResize, false );
  //キーボード操作時処理
  document.addEventListener("keydown", onDocumentKeyDown, false);
  
  //更新
  update();
}

//Windowリサイズ時
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

//キーボード操作
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  switch(keyCode) {
    case 13://エンター
      break;
    case 32://スペース
      break;
  }
}

//更新
function update() {
  deltaTime = clock.getDelta();
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}
