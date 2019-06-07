let readLines = require('n-readlines');


module.exports.cedict = (function() {
	let out = {};
	let line, lineIterator = new readLines('./data/dict/cedict_ts.txt');

	while (line = lineIterator.next()) {
		if (String(line)[0] !== '#') {
			let [_, traditional, simplified, pinyin, definition] = String(line).match(/(.+?) (.+?) (\[.+?\]) (.+)/);

			out[simplified] = {
				pinyin, definition
			}
		}
	}

	return out;
})();

