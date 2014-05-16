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
        case 82:
            // r
            init();
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
