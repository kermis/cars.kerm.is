var debug = false;

var score = 0;

var timeRemaining = 120;

if (!Detector.webgl) Detector.addGetWebGLMessage();

//three.js vars
var container, stats;

var camera, sceneCam, controls, scene, renderer, POVcamera;

var overViewCam;
var overViewCamHolder;

var POVcamHolder;

var camArr;

var sky;

var otoo;

$(function() {
    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("complete", handleComplete, this);
    queue.on("progress", handleProgress, this);
    queue.loadManifest([
        // {id: "physijs_worker",src: "/js/libs/physijs_worker.js"},
        {id: "ammo",src: "/js/libs/ammo.js"},
        {id: "landscape",src: "/models/landscape.js"},
        {id: "physijs_worker",src: "/models/botsotoo.js"},
        {id: "bump",src: "/sound/bump.mp3"},
        {id: "tuut",src: "/sound/tuut2.mp3"},
        {id: "music",src: "/sound/jump.mp3"}
        ]);


})

function handleComplete(){
    $('.overlay').delay(10).fadeOut('slow');
    init();
    animate();

    // createjs.Sound.play("music", {loop:-1});
}

function handleProgress(e){
    var percentLoaded = Math.round(e.loaded * 100);
    $('.percentLoaded').html(percentLoaded+ ' %');
}


function init() {

    // world

    // scene = new THREE.Scene();
    Physijs.scripts.worker = '/js/libs/physijs_worker.js';
    Physijs.scripts.ammo = '/js/libs/ammo.js';


    // Pysics stuff
    scene = new Physijs.Scene({
        fixedTimeStep: 1 / 120
    });
    scene.setGravity(new THREE.Vector3(0, -400, 0));

    camConfig();



    //landscape
    var landscape = new THREE.ObjectLoader();
    landscape.load('/models/landscape2.js', function(mesh) {
        // console.log(mesh);

        mesh.scale.set(0.1, 0.1, 0.1);
        scene.add(mesh);

    });

    setGround();
    makeACar();

    makeNPCcar(car);

    //
    // lights
    var light = new THREE.HemisphereLight(0xFFC8C8, 1.5)
    // var light = new THREE.HemisphereLight(0xFFFFFF, 1.2)
    scene.add(light)

    //sky
    var geometrySky = new THREE.SphereGeometry(4500, 32, 32)
    var materialSky = new THREE.MeshBasicMaterial()
    materialSky.map = THREE.ImageUtils.loadTexture('../img/sky.jpg')
    materialSky.side = THREE.BackSide
    sky = new THREE.Mesh(geometrySky, materialSky)
    scene.add(sky);;


    // renderer // can also be angaglyph or some other fancy stuff
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.outstretch = 2.0; // stretches the apparent z-direction
    renderer.outshift = 3.0; // makes the scene come nearer
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', onWindowResize, false);

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);
    //
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    // controls.handleResize();

    render();

}

function animate() {

    // if(!gameOver){

    render();

    requestAnimationFrame(animate);

    scene.simulate();

    // }
    // controls.update();

}


function render() {

    renderer.render(scene, sceneCam);
    stats.update();

    sky.rotation.y += 0.01;

    if (otoos[0]) {
        setOtooPosition();
    }

    if (otoo) {
        // otoo.rotation.y += 0.01;

    }

}

//start the loops
// physicsLoop();
physicsLoopAI();

function physicsLoop() {

    // console.log(otoos[0])
    if (otoos[0]) {
        setOtooPosition();
    }

    setTimeout(function() {
        physicsLoop();
    }, 1000 / 60)

}

function physicsLoopAI() {

    // console.log(otoos[0])
    if (cars[1]) {
        lookAtAllTheseCarsMove();
    }

    setTimeout(function() {
        physicsLoopAI();
    }, 2000)

}

function camConfig() {
    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 10, 10000);
    camera.position.set(0, 100, 130);
    camera.rotation.x = deg2rad(-40);
    // camera.lookAt(0,0,0);

    POVcamera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 10, 10000);
    POVcamera.position.z = 22;

    camInUse = 2;

    overViewCamHolder = new THREE.Object3D();
    overViewCam = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 10, 10000);
    overViewCam.rotation.x = -1.570796;

    scene.add(overViewCamHolder)
    overViewCamHolder.position.y = 630;
    // overViewCamHolder.position.x = 500;
    overViewCamHolder.position.x = 700;
    overViewCamHolder.position.z = -30;
    // overViewCamHolder.rotation.y = 1.570796;
    overViewCamHolder.add(overViewCam)
    //
    camArr = [camera, POVcamera, overViewCam]

     sceneCam = camera;

}
