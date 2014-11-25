var autonomy = require('ardrone-autonomy');
var mission  = autonomy.createMission();

mission.takeoff()
        .taskSync(function() {console.log("zeroing")})
        .zero()
        .taskSync(function() {console.log("done zeroing")})
        // .altitude(1.5)
        .forward(2)
        // .right(1)     
        .backward(2)
        // .left(1)
        .hover(10000)
        .land();

mission.run(function (err, result) {
    if (err) {
        console.trace("Oops, something bad happened: %s", err.message);
        mission.client().stop();
        mission.client().land();
    } else {
        console.log("Mission success!");
        process.exit(0);
    }
});
