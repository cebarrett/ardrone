var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.disableEmergency();
client.takeoff(function() {
    client.after(0, function() {
        console.log("calibrating magnetometer");
        client.calibrate(0);
    })
    client.after(5000, function() {
        console.log("moving up");
        client.up(0.25);
    })
    .after(3000, function() {
        console.log("moving forward");
        client.front(0.33);
    })
    .after(2000, function() {
        console.log("moving back");
        client.back(0.33);
    })
    .after(2000, function() {
        console.log("stopping and landing");
        this.stop();
        this.land();
    })
    .after(0, function() {
        console.log("done");
    });
});

