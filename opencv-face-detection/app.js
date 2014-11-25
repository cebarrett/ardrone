var cv = require('opencv'),
    fs = require('fs'),
    path = require('path');

fs.readdir("images", function (err, files) {
    if (err) throw err;
    for (var i = 0; i < files.length; ++i) {
        var file = path.sep + files[i];
        var infile = "images" + file;
        console.log("reading image: " + infile);
        cv.readImage(infile, function (err, im) {
            if (err) throw err;
            var outfile = "output" + file;
            im.detectObject(cv.FACE_CASCADE, {}, function (err, faces) {
                if (err) throw err;
                for (var j = 0; j < faces.length; ++j) {
                    var face = faces[j];
                    im.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2);
                }
                console.log("writing image " + outfile);
                im.save(outfile);
                console.log("wrote image " + outfile);
            });
        });
    }
});
