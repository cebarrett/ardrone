var XBoxController = require('xbox-controller');

//var xbox = new XBoxController();
//
//xbox.on('left:move', function(position){
//    console.log('left:move', position);
//});
//
//xbox.on('right:move', function(position){
//    console.log('right:move', position);
//});

function xbox(name, deps) {
    deps.io.sockets.on('connection', function (socket) {
        var xbox = new XBoxController();

        // y button = calibrate
        xbox.on('y:press', function(key) {
            console.log(key + ' pressed, calibrating magnetometer.')
            deps.client.calibrate(0);
        });

        xbox.on('xboxbutton:press', function(key) {
            console.log(key + ' pressed, animating leds.')
            deps.client.animateLeds('fire', 10, 3);
        })

        // start = takeoff
        xbox.on('start:press', function(key) {
            console.log(key + ' pressed, taking off.')
            deps.client.takeoff();
        });

        // back = land
        xbox.on('back:press', function (key) {
            console.log(key + ' pressed, landing.')
            deps.client.land();
        });

        // left stick = front, back, left, right
        xbox.on('left:move', function(position){
            console.log('left:move', position)
            if (position.y) {
                var forward = position.y / (32767 * 5);
                if (forward > 0) {
                    deps.client.back(forward);
                } else {
                    deps.client.front(-forward);
                }
            }
            if (position.x) {
                var amount = position.x / (32767 * 5);
                if (amount > 0) {
                    deps.client.right(amount);
                } else {
                    deps.client.left(-amount);
                }
            }
        });

        // right stick = up, down, ccw, cw
        xbox.on('right:move', function(position){
            console.log('right:move', position)
            var elevation = -position.y / (32767 * 5);
            var rotation = position.x / (32767 * 5);
            if (elevation > 0.01 && elevation < 0.99) {
                console.log('up ' + elevation);
                deps.client.up(elevation);
            } else if (elevation < -0.01 && elevation > -0.99) {
                console.log('down ' + -elevation);
                deps.client.down(-elevation);
            }

            if (rotation < -0.01) {
                console.log("counterClockwise " + -rotation);
                deps.client.counterClockwise(-rotation);
            } else if (rotation > 0.01) {
                console.log("clockwise " + rotation);
                deps.client.clockwise(rotation);
            }
        });
    });

}

module.exports = xbox;

