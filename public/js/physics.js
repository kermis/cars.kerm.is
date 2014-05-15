var ground, otoo, otooPhysi;
var vehicle_body, vehicle;
var car = {}, car_material;
var velocity = 40;
var carStartX = 50;
var carStartZ = 50;

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

    var total = 5;

    for (var i = 1; i < total; i++) {

    cars[i] = {};

    setNpcOtoo(i);

    makeCarBody(cars[i], i,true);

    setWheels(cars[i], i, true);

    };


    // cars[2] = {};

    // setNpcOtoo(2);

    // makeCarBody(cars[2]);

    // setWheels(cars[2]);

    // cars[1].position.set( 0,100,0)
}

function makeACar() {

    cars[0] = {};

    setPlayerOtoo(0);   //set the model
    makeCarBody(cars[0], 0,false);  //set the physical car
    setWheels(cars[0], 0, false);   //add the weels


    var car = cars[0];
    car.body.addEventListener('collision', function(e){carCollisionHandler(e, car)})

    car.wheel_fl.addEventListener('collision', function(e){carCollisionHandler(e, car)})
    car.wheel_fr.addEventListener('collision', function(e){carCollisionHandler(e, car)})
    car.wheel_bl.addEventListener('collision', function(e){carCollisionHandler(e, car)})
    car.wheel_br.addEventListener('collision', function(e){carCollisionHandler(e, car)})


    function carCollisionHandler(otherObjects, relativeVelocity, relativeRotation, contactNormal) {
        console.log('bump')
        // createjs.Sound.stop("bump");
        createjs.Sound.play("bump");
    };

    document.addEventListener('keydown', function(e){controlCar(e, car)})

    document.addEventListener('keyup', function(e){stopCar(e, car)})

}

function setPlayerOtoo(index) {

    // var otoo = otoos[index];

    //Botsotoo
    var otooLoader = new THREE.ObjectLoader();
    otooLoader.load('/models/botsotoo.js', function(mesh) {

        mesh.scale.set(0.03, 0.03, 0.03)
        otoos[index] = mesh;

        steeringWheel = new THREE.Object3D();

        steeringWheel.add(mesh.children[0])
        otoos[index].add(steeringWheel)

        // steeringWheel.children[1].rotation.y = 1;

        scene.add(otoos[index]);

        otoos[index].position.set(0, 100, 0);
        POVcamera.position.y = 20;

        POVcamHolder = new THREE.Object3D();

        POVcamHolder.scale.set(30, 30, 30)
        POVcamHolder.rotation.y = 1.570796;
        // POVcamHolder.__dirtyposition = true;

        POVcamHolder.add(POVcamera);
        otoos[index].add(POVcamHolder);

    });
}

function setNpcOtoo(index) {

    // var otoo = otoos[index];

    //Botsotoo
    var otooLoader = new THREE.ObjectLoader();
    otooLoader.load('/models/botsotoo.js', function(mesh) {

        mesh.scale.set(0.03, 0.03, 0.03)
        otoos[index] = mesh;

        steeringWheel = new THREE.Object3D();

        steeringWheel.add(mesh.children[0])
        otoos[index].add(steeringWheel)

        console.log(mesh.children[0].children[2])

        mesh.children[0].children[2].children[0].material.color.r = Math.random();
        mesh.children[0].children[2].children[0].material.color.g = Math.random();
        mesh.children[0].children[2].children[0].material.color.b = Math.random();

        // steeringWheel.children[1].rotation.y = 1;

        scene.add(otoos[index]);

        otoos[index].position.set(0, 100, 0);
    });
}


function makeCarBody(car, index, npc){

    // Car
    car_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({
            color: 0xff6666,
            transparent: true,
            opacity: testPacity,
        }),
        .8, // high friction
        .4 // low restitution
    );

    car.body = new Physijs.BoxMesh(
        new THREE.CubeGeometry(12, 10, 6),
        car_material,
        1000
    );

    car.bodyRotated = new Physijs.BoxMesh(
        new THREE.CubeGeometry(6, 6, 14),
        car_material,
        1000
    );
    // car.bodyRotated.position.y = 10;
    // car.bodyRotated.position.x = carStartX;
    // car.bodyRotated.position.z = carStartZ;


    car.body.position.y = 10;
    car.body.position.x = carStartX;
    car.body.position.z = carStartZ;
    if(npc){
        switch(index){
            case 1:
                car.body.position.x = carStartX-100;
                car.body.position.z = carStartZ;
                break;
            case 2:
                car.body.position.x = carStartX-50;
                car.body.position.z = carStartZ;
                break;
            case 3:
                car.body.position.x = carStartX-50;
                car.body.position.z = carStartZ-170;
                break;
            case 4:
                car.body.position.x = carStartX-100;
                car.body.position.z = carStartZ-150;
                break;
        }
    }

    car.body.scale.x = 2.3;
    car.body.receiveShadow = car.body.castShadow = true;

    car.body.add(car.bodyRotated);

    scene.add(car.body);
};

function setWheels(car, index, npc){
    var yWheels = car.body.position.y - 7;

    var carStartX = car.body.position.x;
    var carStartZ = car.body.position.z;

    var offsetX = 10;
    var offsetZ = 4.5;

    var fl_positionX = carStartX - offsetX;
    var fl_positionY = yWheels;
    var fl_positionZ = carStartZ - offsetZ;

    var fr_positionX = carStartX - offsetX;
    var fr_positionY = yWheels;
    var fr_positionZ = carStartZ + offsetZ;

    var bl_positionX = carStartX + offsetX;
    var bl_positionY = yWheels;
    var bl_positionZ = carStartZ - offsetZ;

    var br_positionX = carStartX + offsetX;
    var br_positionY = yWheels;
    var br_positionZ = carStartZ + offsetZ;


    wheel_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({
            color: 0x444444,
            transparent: true,
            opacity: testPacity,
        }),
        0.7, // high friction
        1 // medium restitution
    );
    var carWheelRadius = 2;
    wheel_geometry = new THREE.CylinderGeometry(carWheelRadius, carWheelRadius, 2, 10);


    car.wheel_fl = new Physijs.CylinderMesh(
        wheel_geometry,
        wheel_material,
        500
    );
    car.wheel_fl.rotation.x = Math.PI / 2;
    car.wheel_fl.position.set(fl_positionX, fl_positionY, fl_positionZ);
    car.wheel_fl.receiveShadow = car.wheel_fl.castShadow = true;
    scene.add(car.wheel_fl);
    car.wheel_fl_constraint = new Physijs.DOFConstraint(
        car.wheel_fl, car.body, new THREE.Vector3(fl_positionX, fl_positionY, fl_positionZ)
    );
    scene.addConstraint(car.wheel_fl_constraint);
    car.wheel_fl_constraint.setAngularLowerLimit({
        x: 0,
        y: -Math.PI / 8,
        z: 1
    });
    car.wheel_fl_constraint.setAngularUpperLimit({
        x: 0,
        y: Math.PI / 8,
        z: 0
    });

    car.wheel_fr = new Physijs.CylinderMesh(
        wheel_geometry,
        wheel_material,
        500
    );
    car.wheel_fr.rotation.x = Math.PI / 2;
    car.wheel_fr.position.set(fr_positionX, fr_positionY, fr_positionZ);
    car.wheel_fr.receiveShadow = car.wheel_fr.castShadow = true;
    scene.add(car.wheel_fr);
    car.wheel_fr_constraint = new Physijs.DOFConstraint(
        car.wheel_fr, car.body, new THREE.Vector3(fr_positionX, fr_positionY, fr_positionZ)
    );
    scene.addConstraint(car.wheel_fr_constraint);
    car.wheel_fr_constraint.setAngularLowerLimit({
        x: 0,
        y: -Math.PI / 8,
        z: 1
    });
    car.wheel_fr_constraint.setAngularUpperLimit({
        x: 0,
        y: Math.PI / 8,
        z: 0
    });

    car.wheel_bl = new Physijs.CylinderMesh(
        wheel_geometry,
        wheel_material,
        500
    );
    car.wheel_bl.rotation.x = Math.PI / 2;
    car.wheel_bl.position.set(bl_positionX, bl_positionY, bl_positionZ);
    car.wheel_bl.receiveShadow = car.wheel_bl.castShadow = true;
    scene.add(car.wheel_bl);
    car.wheel_bl_constraint = new Physijs.DOFConstraint(
        car.wheel_bl, car.body, new THREE.Vector3(bl_positionX, bl_positionY, bl_positionZ)
    );
    scene.addConstraint(car.wheel_bl_constraint);
    car.wheel_bl_constraint.setAngularLowerLimit({
        x: 0,
        y: 0,
        z: 0
    });
    car.wheel_bl_constraint.setAngularUpperLimit({
        x: 0,
        y: 0,
        z: 0
    });

    car.wheel_br = new Physijs.CylinderMesh(
        wheel_geometry,
        wheel_material,
        500
    );

    car.wheel_br.rotation.x = Math.PI / 2;
    car.wheel_br.position.set(br_positionX, br_positionY, br_positionZ);
    car.wheel_br.receiveShadow = car.wheel_br.castShadow = true;
    scene.add(car.wheel_br);
    car.wheel_br_constraint = new Physijs.DOFConstraint(
        car.wheel_br, car.body, new THREE.Vector3(br_positionX, br_positionY, br_positionZ)
    );
    scene.addConstraint(car.wheel_br_constraint);
    car.wheel_br_constraint.setAngularLowerLimit({
        x: 0,
        y: 0,
        z: 0
    });
    car.wheel_br_constraint.setAngularUpperLimit({
        x: 0,
        y: 0,
        z: 0
    });
}

function controlCar(ev, car) {
    switch (ev.keyCode) {
        case 37:
            // Left
            // // configureAngularMotor(which, low_angle, high_angle, velocity, max_force)
            car.wheel_fl_constraint.configureAngularMotor(1, -Math.PI / 4, Math.PI / 4, 3, 200);
            car.wheel_fr_constraint.configureAngularMotor(1, -Math.PI / 4, Math.PI / 4, 3, 200);

            car.wheel_fl_constraint.enableAngularMotor(1);
            car.wheel_fr_constraint.enableAngularMotor(1);
            break;

        case 39:
            // Right
            //  MATH.PI /3 -> 60°;
            //  MATH.PI /2 -> 90°;
            car.wheel_fl_constraint.configureAngularMotor(1, -Math.PI / 4, Math.PI / 4, -3, 200);
            car.wheel_fr_constraint.configureAngularMotor(1, -Math.PI / 4, Math.PI / 4, -3, 200);


            car.wheel_fl_constraint.enableAngularMotor(1);
            car.wheel_fr_constraint.enableAngularMotor(1);
            break;

        case 38:
            // Up
            // configureAngularMotor(which, low_angle, high_angle, velocity, max_force)
            car.wheel_bl_constraint.configureAngularMotor(2, 1, 0, velocity, 2000);
            car.wheel_br_constraint.configureAngularMotor(2, 1, 0, velocity, 2000);

            car.wheel_bl_constraint.enableAngularMotor(2);
            car.wheel_br_constraint.enableAngularMotor(2);
            break;

        case 40:
            // Down
            car.wheel_bl_constraint.configureAngularMotor(2, 1, 0, -velocity, 2000);
            car.wheel_br_constraint.configureAngularMotor(2, 1, 0, -velocity, 2000);

            car.wheel_bl_constraint.enableAngularMotor(2);
            car.wheel_br_constraint.enableAngularMotor(2);
            break;
        case 32:
            //space
            // createjs.Sound.stop("tuut");
            createjs.Sound.play("tuut");
            break;
        case 67:
            // c
            switchCam();
            break;
    }
}

function stopCar(ev, car) {
            switch (ev.keyCode) {
                case 37:
                    // Left
                    car.wheel_fl_constraint.disableAngularMotor(1);
                    car.wheel_fr_constraint.disableAngularMotor(1);
                    break;

                case 39:
                    // Right
                    car.wheel_fl_constraint.disableAngularMotor(1);
                    car.wheel_fr_constraint.disableAngularMotor(1);
                    break;

                case 38:
                    // Up
                    car.wheel_bl_constraint.disableAngularMotor(2);
                    car.wheel_br_constraint.disableAngularMotor(2);
                    break;

                case 40:
                    // Down
                    car.wheel_bl_constraint.disableAngularMotor(2);
                    car.wheel_br_constraint.disableAngularMotor(2);
                    break;
            }
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

    //Borders island
    buildBarier(230, -145, -90, deg2rad(91));
    buildBarier(230, 116, -90, deg2rad(92.5));

    buildBarier(180, -20, 92, deg2rad(-4));
    buildBarier(100, -107, 58, deg2rad(-44));
    buildBarier(100, 86, 58, deg2rad(44));

    buildBarier(120, -106, -233, deg2rad(39));
    buildBarier(120, 80, -224, deg2rad(-30));
    buildBarier(120, -20, -258, deg2rad(-9));
    //lengte, naar rechts, naar onder, rotatie y-as
}

function buildBarier(length, xPosition, zPosition, rotation) {
    var material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({
            color: 0xFF0000,
            transparent: true,
            opacity: testPacity
        }),
        .1, // high friction
        2 // low restitution
    );

    var mesh = new Physijs.BoxMesh(
        new THREE.CubeGeometry(length, 10, 10),
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

    // car = cars[0];
    // otoo = otoos[0];
    // console.Log(cars[0])
    // console.Log(otoos[0])
    // otoo = otoos[0];

    otoos[0].position.set(cars[0].body.position.x, cars[0].body.position.y - 8.5, cars[0].body.position.z - 2);
    otoos[0].rotation.set(cars[0].body.rotation.x, cars[0].body.rotation.y, cars[0].body.rotation.z);

    for (var i = 1; i < otoos.length; i++) {
        // cars[i]
        otoos[i].position.set(cars[i].body.position.x, cars[i].body.position.y - 8.5, cars[i].body.position.z - 2);
        otoos[i].rotation.set(cars[i].body.rotation.x, cars[i].body.rotation.y, cars[i].body.rotation.z);
    };

}

function lookAtAllTheseCarsMove(){

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
        cars[i].wheel_fl_constraint.configureAngularMotor(1, turnDirection* -Math.PI / 3, turnDirection* Math.PI / 3, -3, 200);   // --> right
        cars[i].wheel_fr_constraint.configureAngularMotor(1, turnDirection* -Math.PI / 3, turnDirection* Math.PI / 3, -3, 200);   // --> right
        cars[i].wheel_fr_constraint.enableAngularMotor(2);
        cars[i].wheel_fl_constraint.enableAngularMotor(2);
    };
}
