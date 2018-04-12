# node-zip-folder

> zips a folder and calls your callback when it's done
> AKA: something that maybe already exists in npmjs.org, but that I couldn't find.

## Usage

```javascript
var zipFolder = require('zip-folder');

zipFolder('/path/to/the/folder', '/path/to/archive.zip', function(err, size) {
	if(err) {
		console.log('oh no!', err);
	} else {
		console.log('Done! Filesize:', size);
	}
});
```

## Tests

Tests are in `tests.js` and built with nodeunit. Run `npm test` to run the tests.

## Original author

[github.com/sole/node-zip-folder](https://github.com/sole/node-zip-folder)