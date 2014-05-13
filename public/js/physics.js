var ground, otoo, otooPhysi;
var vehicle_body, vehicle;
var car = {}, car_material;
var velocity = 40;
var carStartX = 50;
var carStartZ = 50;



var testPacity = 0.0;

function setGround() {
    // Materials
    ground_material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({
            color: 0xFDBFC0
        }),
        .8, // high friction
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
}

function setOtoo() {
    //Botsotoo
    var otooLoader = new THREE.ObjectLoader();
    otooLoader.load('/models/botsotoo.js', function(mesh) {

        mesh.scale.set(0.03, 0.03, 0.03)
        otoo = mesh;

        scene.add(otoo);
        console.log(otoo);
        otoo.position.set(0, 100, 0);
        POVcamera.position.y = 20;

        POVcamHolder = new THREE.Object3D();

        POVcamHolder.scale.set(30, 30, 30)
        POVcamHolder.rotation.y = 1.570796;
        // POVcamHolder.__dirtyposition = true;

        POVcamHolder.add(POVcamera);
        otoo.add(POVcamHolder);


        // otoo.position.y = 400;
    });
}

function makeACar() {
    setOtoo();

    // Car
    car_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({
            color: 0xff6666,
            transparent: true,
            opacity: testPacity,
        }),
        .8, // high friction
        .3 // low restitution
    );

    wheel_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({
            color: 0x444444,
            transparent: true,
            opacity: testPacity,
        }),
        .7, // high friction
        1 // medium restitution
    );
    var carWheelRadius = 2;
    wheel_geometry = new THREE.CylinderGeometry(carWheelRadius, carWheelRadius, 2, 10);

    car.body = new Physijs.BoxMesh(
        // radiusTop, radiusBottom, height, segmentsRadius, segmentsHeight, openEnded
        // new THREE.CylinderGeometry(6, 6, 5, 10, 10, false),
        new THREE.CubeGeometry(12, 10, 6),
        car_material,
        1000
    );

    car.body.position.y = 10;
    car.body.position.x = carStartX;
    car.body.position.z = carStartZ;

    car.body.scale.x = 2.3;
    car.body.receiveShadow = car.body.castShadow = true;
    scene.add(car.body);

    var yWheels = car.body.position.y - 7;

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

    // car.body.scale.set(100, 100, 100);

    document.addEventListener(
        'keydown',
        function(ev) {
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

                    break;
                case 67:
                    // c
                    switchCam();
                    break;
            }
        }
    );

    document.addEventListener(
        'keyup',
        function(ev) {
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
    );

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
    //lengte, naar rechts, naar onder




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

    switch(camInUse){
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

// function makeACar() {
//     var loader = new THREE.JSONLoader();

//     loader.load("/models/BotsotooJson2.js", function(car, car_materials) {
//         // loader.load("models/mustang_wheel.js", function(wheel, wheel_materials) {
//         //
//         console.log('botsotoo loaded');

//         var wheel_material = Physijs.createMaterial(
//             new THREE.MeshBasicMaterial({
//                 color: 0xFF0000, transparent: true, opacity: 0.5
//             }),
//             .8, // high friction
//             .5 // medium restitution
//         );
//         var carWheelRadius = 4;
//         var wheel = new THREE.CylinderGeometry(carWheelRadius, carWheelRadius, 1, 8);


//         var mesh = new Physijs.BoxMesh(
//             car,
//             // new THREE.CubeGeometry( 1000, 130, 400 ),
//             new THREE.MeshFaceMaterial(car_materials)
//         );
//         mesh.position.y = 20;
//         // mesh.scale.set(0.03,0.03,0.03);
//         // mesh.castShadow = mesh.receiveShadow = false;

//         // suspension_stiffness, suspension_compression, suspension_damping, max_suspension_travel, friction_slip, max_suspension_force
//         vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
//             1.88,  //suspersion stiffness
//             1.83,   //suspension compression
//             0.28,   //suspension damping
//             500,    //max suspension travel
//             10.5,   //friction slip
//             6000    //max suspension force
//         ));
//         scene.add(vehicle);

//         var xOffset = 12;
//         var zOffset = 10;
//         for (var i = 0; i < 4; i++) {
//             //wheel_geometry, wheel_material, connection_point, wheel_direction, wheel_axle, suspension_rest_length, wheel_radius, is_front_wheel, tuning
//             vehicle.addWheel(
//                 wheel,  //geometry
//                 wheel_material, //material
//                 new THREE.Vector3(  //connection point
//                     i % 2 === 0 ? -xOffset : xOffset,
//                      -1,
//                     i < 2 ? zOffset : -zOffset
//                 ),
//                 new THREE.Vector3(0, -1, 0),    //wheel direction
//                 new THREE.Vector3(-1, 0, 0),    //wheel axle
//                 1.5,   //suspension rest length
//                 carWheelRadius,   //wheel radius
//                 // i < 2 ? false : true //tuning
//                 true //tuning
//             );
//         }

//         input = {
//             power: null,
//             direction: null,
//             steering: 0
//         };

//         document.addEventListener('keydown', function(ev) {
//             switch (ev.keyCode) {
//                 case 37: // left
//                     console.log('left');
//                     input.direction = 1;
//                     break;

//                 case 38: // forward
//                     console.log('forward');
//                     input.power = true;
//                     break;

//                 case 39: // right
//                     console.log('right');
//                     input.direction = -1;
//                     break;

//                 case 40: // back
//                     console.log('back0');
//                     input.power = false;
//                     break;
//             }
//         });
//         document.addEventListener('keyup', function(ev) {
//             switch (ev.keyCode) {
//                 case 37: // left
//                     input.direction = null;
//                     break;

//                 case 38: // forward
//                     input.power = null;
//                     break;

//                 case 39: // right
//                     input.direction = null;
//                     break;

//                 case 40: // back
//                     input.power = null;
//                     break;
//             }
//         });
//         // });
//     });
// }

function setOtooPosition() {

    otoo.position.set(car.body.position.x, car.body.position.y - 8.5, car.body.position.z - 2);
    otoo.rotation.set(car.body.rotation.x, car.body.rotation.y, car.body.rotation.z);

    // camera.position.set(car.body.position.x, car.body.position.y + 20, car.body.position.z);
    // // camera.rotation.set( 0 , car.body.rotation.y + 1.57, 0);
    // camera.rotation.set( deg2rad(90) , 0, 0);

}
