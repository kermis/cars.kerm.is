var carStartX = 50;
var carStartZ = 50;
var carBuilder = {
    setPlayerOtoo: function(index) {

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
            POVcamera.position.y = 10;
            POVcamera.position.z = 10;

            POVcamHolder = new THREE.Object3D();

            POVcamHolder.scale.set(30, 30, 30)
            POVcamHolder.rotation.y = 1.570796;
            // POVcamHolder.__dirtyposition = true;

            POVcamHolder.add(POVcamera);
            otoos[index].add(POVcamHolder);

        });
    },
    setNpcOtoo: function(index) {

        // var otoo = otoos[index];

        //Botsotoo
        var otooLoader = new THREE.ObjectLoader();
        otooLoader.load('/models/botsotoo.js', function(mesh) {

            mesh.scale.set(0.03, 0.03, 0.03)
            otoos[index] = mesh;

            steeringWheel = new THREE.Object3D();

            steeringWheel.add(mesh.children[0])
            otoos[index].add(steeringWheel)

            // console.log(mesh.children[0].children[2])

            mesh.children[0].children[2].children[0].material.color.r = Math.random();
            mesh.children[0].children[2].children[0].material.color.g = Math.random();
            mesh.children[0].children[2].children[0].material.color.b = Math.random();

            // steeringWheel.children[1].rotation.y = 1;

            scene.add(otoos[index]);

            otoos[index].position.set(0, 100, 0);
        });
    },
    makeCarBody: function(car, index, npc) {

        // Car
        car_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                color: 0xff6666,
                transparent: true,
                opacity: testPacity,
            }),
            .1, // low friction
            .4 // low restitution
        );

        car.body = new Physijs.BoxMesh(
            new THREE.CubeGeometry(12, 6, 6),
            car_material,
            1000
        );

        car.body.name = 'car-body';

        car.bodyRotated = new Physijs.BoxMesh(
            // new THREE.CubeGeometry(5, 6, 14),
            new THREE.CubeGeometry(4, 5, 14),
            car_material,
            1000
        );

        car.bodyRotated.name = 'car-body-rotated';

        car.bodyTop = new Physijs.BoxMesh(
            // new THREE.CubeGeometry(12, 3, 14),
            new THREE.CubeGeometry(10, 1, 10),
            car_material,
            1000
        );

        car.bodyTop.name = 'car-body-top';

        car.bodyTop.position.y = 10;
        car.bodyRotated.position.y = 2;
        // car.bodyRotated.position.y = 10;
        // car.bodyRotated.position.x = carStartX;
        // car.bodyRotated.position.z = carStartZ;


        car.body.position.y = 18;
        car.body.position.x = carStartX;
        car.body.position.z = carStartZ;

        //set the start positions of the cars
        if (npc) {
            switch (index) {
                case 1:
                    car.body.position.x = carStartX - 100;
                    car.body.position.z = carStartZ;
                    break;
                case 2:
                    car.body.position.x = carStartX - 50;
                    car.body.position.z = carStartZ;
                    break;
                case 3:
                    car.body.position.x = carStartX - 50;
                    car.body.position.z = carStartZ - 170;
                    break;
                case 4:
                    car.body.position.x = carStartX - 100;
                    car.body.position.z = carStartZ - 150;
                    break;
                case 5:
                    car.body.position.x = carStartX + 700;
                    car.body.position.z = carStartZ - 300;
                    break;
                case 6:
                    car.body.position.x = carStartX + 730;
                    car.body.position.z = carStartZ + 200;
                    break;
                case 7:
                    car.body.position.x = carStartX + 700;
                    car.body.position.z = carStartZ - 250;
                    break;
                case 8:
                    car.body.position.x = carStartX + 800;
                    car.body.position.z = carStartZ - 60;
                    break;
            }
        } else {
            //player car position
            car.body.position.x = carStartX + 740;
            car.body.position.z = carStartZ - 50;
        }

        car.body.scale.x = 2.3;
        car.body.receiveShadow = car.body.castShadow = true;

        car.body.add(car.bodyRotated);
        // car.body.add(car.bodyTop);

        scene.add(car.body);
    },
    setWheels: function(car, index, npc) {
        var carWheelRadius = 2.5;
        var yWheels = car.body.position.y - carWheelRadius / 2;

        var carStartX = car.body.position.x;
        var carStartZ = car.body.position.z;

        var offsetX = 10;
        var offsetZ = 5;

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
            0.1 // medium restitution
        );

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

        car.wheel_fl.name = car.wheel_fr.name = car.wheel_bl.name = car.wheel_br.name = 'wheel';
    }
}
