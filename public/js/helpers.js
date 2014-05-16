function deg2rad(angle) {

    return angle * .017453292519943295; // (angle / 180) * Math.PI;
}

function rad2deg(angle) {

    return angle * 57.29577951308232; // angle / Math.PI * 180
}

function generateRoomId() {
    var text = "";
    var possible = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

function reduceTo360(angle) {
    var newAngle = angle;
    while (newAngle <= 0) {
        newAngle += 360
    };
    while (newAngle >= 360) {
        newAngle -= 360
    };
    return newAngle;
}
