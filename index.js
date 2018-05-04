var fs = require('fs');
var archiver = require('archiver');

/**
 * @param {string|string[]} srcFolders Folder(s) to zip
 * @param {string} zipFilePath Destination
 * @param {Function} callback Filesize in bytes
 *
 * Slightly modified from original source: https://github.com/sole/node-zip-folder
 */
function zipFolder(srcFolders, zipFilePath, callback) {
	var output = fs.createWriteStream(zipFilePath);
	var zipArchive = archiver('zip');

	output.on('close', function () {
		callback(null, zipArchive.pointer()); // sends back filesize in byte
	});

	zipArchive.pipe(output);

	if (!Array.isArray(srcFolders)) srcFolders = [srcFolders];
	// pre 2.0.0
	let arr = [];
	for (let i = 0; i < srcFolders.length; i++) {
		arr.push({ cwd: srcFolders[i], src: ['**/*'], expand: true });
	}
	zipArchive.bulk(arr);

	// after 2.0.0
	// for (let i = 0; i < srcFolders.length; i++) {
	// 	zipArchive.directory(srcFolders[i], false);
	// }

	zipArchive.finalize(function (err, bytes) {
		if (err) callback(err, null);
	});
}

module.exports = zipFolder;
