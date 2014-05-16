var ground, otoo, otooPhysi;
var vehicle_body, vehicle;
var car = {}, car_material;
var velocity = 40;

var otoos = [];
var cars = [];

var steeringWheel;



var testPacity = 0.0;

function setGround() {
    // Materials
    ground_material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({
            color: 0xFDBFC0
        }),
        1, // high friction
        .4 // low restitution
    );

    // Ground
    ground = new Physijs.BoxMesh(
        new THREE.CubeGeometry(10000, 1, 10000),
        ground_material,
        0 // mass
    );
    ground.position.y = -3;
    ground.receiveShadow = true;
    scene.add(ground);

    buildBarriers();
}


function makeNPCcar() {

    var total = 9;

    for (var i = 1; i < total; i++) {

    cars[i] = {};

    setNpcOtoo(i);

    makeCarBody(cars[i], i,true);

    setWheels(cars[i], i, true);

    };

}

function makeACar() {

    cars[0] = {};

    setPlayerOtoo(0);   //set the model
    makeCarBody(cars[0], 0,false);  //set the physical car
    setWheels(cars[0], 0, false);   //add the weels


    var car = cars[0];
    car.body.addEventListener('collision', function(e){carCollisionHandler(e, car)})
    // car.body.children[0].addEventListener('collision', function(e){carCollisionHandler(e, car)})


    function carCollisionHandler(otherObjects, relativeVelocity, relativeRotation, contactNormal) {
        console.log('bump')
        // createjs.Sound.stop("bump");
        createjs.Sound.play("bump");
    };

    document.addEventListener('keydown', function(e){controlCar(e, car)})

    document.addEventListener('keyup', function(e){stopCar(e, car)})

}


function buildBarriers(){
    //big island
    buildBarier(90, 20, 32, deg2rad(10));
    buildBarier(60, -50, 28, deg2rad(-25));
    buildBarier(120, 62, -33, deg2rad(90));
    buildBarier(120, -49, -50, deg2rad(59));
    buildBarier(18, -78, 8, deg2rad(97));
    buildBarier(88, 23, -95, deg2rad(-7));

    //small island
    buildBarier(150, -23, -157, deg2rad(-5.5));
    buildBarier(120, -40, -182, deg2rad(18));
    buildBarier(65, 36, -175, deg2rad(-60));

    //Borders
    buildBarier(230, -145, -90, deg2rad(91));
    buildBarier(120, 120, -40, deg2rad(92.5));

    buildBarier(180, -20, 92, deg2rad(-4));
    buildBarier(100, -107, 58, deg2rad(-44));
    buildBarier(100, 86, 58, deg2rad(44));

    buildBarier(120, -106, -233, deg2rad(39));
    buildBarier(120, 80, -224, deg2rad(-30));
    buildBarier(120, -20, -256, deg2rad(-9));

    //
    //Nu de nieuwe nog
    //Gang onder
    buildBarier(120, 180, -97, deg2rad(-6));
    buildBarier(120, 280, -69, deg2rad(-23));
    buildBarier(50, 345, -30, deg2rad(-45));
    buildBarier(45, 380, -20, deg2rad(0));
    buildBarier(60, 435, -10, deg2rad(0));
    buildBarier(60, 485, -8, deg2rad(-3));

    //gang boven
    buildBarier(70, 160, -183, deg2rad(-24));
    buildBarier(100, 240, -167, deg2rad(-4));
    buildBarier(135, 336, -118, deg2rad(-33));
    buildBarier(110, 447, -74, deg2rad(-5));

    //buiten grote cirkel (wijzerzin)
    buildBarier(100, 497, -115, deg2rad(90));
    buildBarier(100, 530, -179, deg2rad(43));
    buildBarier(250, 630, -250, deg2rad(32));
    buildBarier(80, 730, -290, deg2rad(-17));
    buildBarier(80, 790, -280, deg2rad(-10));
    buildBarier(120, 850, -250, deg2rad(-35));
    buildBarier(80, 928, -200, deg2rad(-30));
    buildBarier(80, 943, -180, deg2rad(-50));
    buildBarier(90, 995, -118, deg2rad(-52));
    buildBarier(40, 1025, -70, deg2rad(90));
    buildBarier(20, 1031, -48, deg2rad(-45));
    buildBarier(200, 1047, 45, deg2rad(-88));
    buildBarier(250, 950, 225, deg2rad(37.5));
    buildBarier(250, 800, 280, deg2rad(0));
    buildBarier(150, 650, 230, deg2rad(-37));
    buildBarier(150, 600, 190, deg2rad(113));
    buildBarier(20, 562, 125, deg2rad(0));
    buildBarier(150, 545, 100, deg2rad(103));
    buildBarier(20, 525, 30, deg2rad(-10));
    buildBarier(40, 512, 10, deg2rad(90));

    /*
      ***     ***
     **1*     *2**
      ***     ***

      ***     ***
     **3*     *4**
      ***     ***

    */

    //lengte, naar rechts, naar onder, rotatie y-as
    // eiland 1 (CCW)
    buildBarier(60, 627, -70, deg2rad(-12));
    buildBarier(55, 680, -73.5, deg2rad(27));
    buildBarier(20, 710, -95, deg2rad(90));
    buildBarier(55, 722, -112, deg2rad(32));
    buildBarier(40, 745, -145, deg2rad(95));
    buildBarier(20, 737, -169, deg2rad(-45));
    buildBarier(43, 715, -174, deg2rad(-3));
    buildBarier(13, 694, -170, deg2rad(70));
    buildBarier(50, 671, -151, deg2rad(12));
    buildBarier(85, 620, -115, deg2rad(45));


    // eiland 4
    buildBarier(117, 815, 140, deg2rad(90));
    buildBarier(30, 830, 200, deg2rad(0));
    buildBarier(125, 896, 160, deg2rad(40));
    buildBarier(87, 948, 85, deg2rad(80));
    buildBarier(87, 908, 45, deg2rad(-3));
    buildBarier(30, 858, 55, deg2rad(75));
    buildBarier(36, 836, 75, deg2rad(30));

    // eiland 2
    buildBarier(75, 815, -145, deg2rad(90));
    buildBarier(35, 825, -175, deg2rad(-35));
    buildBarier(75, 859, -135, deg2rad(-57));
    buildBarier(70, 892, -90, deg2rad(-55));
    buildBarier(30, 915, -68, deg2rad(0));
    buildBarier(42, 932, -50, deg2rad(-65));
    buildBarier(65, 905, -32, deg2rad(3));
    buildBarier(30, 864, -36, deg2rad(-33));
    buildBarier(85, 837, -73, deg2rad(-57));

    //eiland 4 (CCW)
    buildBarier(90, 645, 9, deg2rad(-5));
    buildBarier(130, 640, 60, deg2rad(-57));
    buildBarier(40, 675, 120, deg2rad(-82));
    buildBarier(30, 688, 145, deg2rad(-18));
    buildBarier(30, 700, 155, deg2rad(-75));
    buildBarier(55, 725, 170, deg2rad(-10));
    buildBarier(100, 748, 125, deg2rad(90));
    buildBarier(55, 725, 70, deg2rad(-12));
    buildBarier(30, 708, 50, deg2rad(-85));
    buildBarier(30, 697, 26, deg2rad(-50));



}

function buildBarier(length, xPosition, zPosition, rotation) {
    var material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({
            // color: 0xFF0000,
            color: 0x0000000,
            transparent: true,
            opacity:  testPacity
        }),
        .1, // high friction
        0.4 // low restitution
    );

    var mesh = new Physijs.BoxMesh(
        new THREE.CubeGeometry(length, 30, 10),
        material,
        0
    );

    mesh.position.set(xPosition, 0, zPosition);
    mesh.rotation.set(0, rotation, 0)

    scene.add(mesh);
    // console.log('barrier build')

};

function switchCam() {

    switch (camInUse) {
        case 0:
            sceneCam = camArr[1]
            camInUse = 1;
            break;
        case 1:
            sceneCam = camArr[2]
            camInUse = 2;
            break;
        case 2:
            sceneCam = camArr[0]
            camInUse = 0;
            break;
    }
}


function setOtooPosition() {


    // scene.updateMatrixWorld(true);

    if(otoos[0]){
        otoos[0].position.set(cars[0].body.position.x, cars[0].body.position.y - 3.5, cars[0].body.position.z - 2);
        otoos[0].rotation.set(cars[0].body.rotation.x, cars[0].body.rotation.y, cars[0].body.rotation.z);
    }

    for (var i = 1; i < otoos.length; i++) {

        var position = new THREE.Vector3();
        // position.getPositionFromMatrix( cars[i] );
        // otoos[i].position.set(position.x, position.y - 8.5, position.z - 2);
        // otoos[i].rotation.set(position.x, position.y - 8.5, position.z - 2);

        // cars[i]
        otoos[i].position.set(cars[i].body.position.x, cars[i].body.position.y - 3.5, cars[i].body.position.z);
        otoos[i].rotation.set(cars[i].body.rotation.x, cars[i].body.rotation.y, cars[i].body.rotation.z);
        // otoos[i].rotation.set(0, cars[i].body.rotation.y, 0);
    };

}

function lookAtAllTheseCarsMove(){

    //A rudimentary AI, wich is called every second and sends a random direction and velocity to each car

    //to make all the cars move
    for (var i = 1; i < otoos.length; i++) {
        // cars[i]
        // otoos[i].position.set(cars[i].body.position.x, cars[i].body.position.y - 8.5, cars[i].body.position.z - 2);
        // otoos[i].rotation.set(cars[i].body.rotation.x, cars[i].body.rotation.y, cars[i].body.rotation.z);

        var direction = Math.round(getRandomArbitary(-2,4));
        if(direction==0){
            direction = Math.round(getRandomArbitary(-2,4));
        }
        var velocity2 = Math.random()*20;
        // configureAngularMotor(which, low_angle, high_angle, velocity, max_force)
        cars[i].wheel_bl_constraint.configureAngularMotor(2, 1, 0, direction * velocity2, 20000);   // --> forward
        cars[i].wheel_br_constraint.configureAngularMotor(2, 1, 0, direction * velocity2, 20000);   // --> forward
        cars[i].wheel_br_constraint.enableAngularMotor(2);
        cars[i].wheel_bl_constraint.enableAngularMotor(2);

        var turnDirection = getRandomArbitary(-1,1);
        cars[i].wheel_fl_constraint.configureAngularMotor(1, turnDirection* -Math.PI / 4, turnDirection* Math.PI / 4, -3, 200);   // --> right
        cars[i].wheel_fr_constraint.configureAngularMotor(1, turnDirection* -Math.PI / 4, turnDirection* Math.PI / 4, -3, 200);   // --> right
        cars[i].wheel_fr_constraint.enableAngularMotor(2);
        cars[i].wheel_fl_constraint.enableAngularMotor(2);
    };
}
