var fs = require('fs');
var archiver = require('archiver');

function zipFolder(srcFolder, zipFilePath, callback) {
	var output = fs.createWriteStream(zipFilePath);
	var zipArchive = archiver('zip');

	output.on('close', function () {
		callback(null, zipArchive.pointer()); // sends back filesize in byte
	});

	zipArchive.pipe(output);

	// pre 2.0.0
	zipArchive.bulk([
		{ cwd: srcFolder, src: ['**/*'], expand: true }
	]);

	// after 2.0.0
	// zipArchive.directory(srcFolder, false);

	zipArchive.finalize(function (err, bytes) {
		if (err) {
			callback(err, null);
		}
	});
}

module.exports = zipFolder;
