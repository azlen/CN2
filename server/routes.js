let fs = require('fs');

let hanzi = require('hanzi');
let { pinyinNumberToAccent } = require('./util/util.js');

let { dictionary, graphics } = require('./util/makemeahanzi.js');
let { cedict } = require('./util/cedict.js');

let { getSentencesWithWord } = require('./util/tatoeba.js');

let { getAudioFile } = require('./util/audio.js');
let express = require("express");

hanzi.start();

//let mmah_dictionary = JSON.parse(fs.read('./data/makemeahanzi/dictionary.txt'));
//let mmah_graphics = JSON.parse(fs.read('./data/makemeahanzi/dictionary.txt'));

// ⿱⿳⿻⿰⿲⿺⿸⿹⿴⿵⿶⿷

function getDecomposition(char) {
	let decomposition = dictionary[char].decomposition.split('');

	let nested = [];

	let ideographicDescriptionCharacters = {
		"⿱": 2,
		"⿳": 3,
		"⿻": 2,
		"⿰": 2,
		"⿲": 3,
		"⿺": 2,
		"⿸": 2,
		"⿹": 2,
		"⿴": 2,
		"⿵": 2,
		"⿶": 2,
		"⿷": 2,
	}

	let componentIndex = 0;
	let queue = [[1, nested]];
	for (let i = 0; i < decomposition.length; i++) {
		let char = decomposition[i];

		let obj = queue[0][1];

		queue[0][0] -= 1;
		
		if(queue[0][0] === 0) {
			queue.shift();
		}


		if (Object.keys(ideographicDescriptionCharacters).indexOf(char) !== -1) {
			let newObj = [];
			obj.push([char, newObj]);

			let maxSlots = ideographicDescriptionCharacters[char];
			queue.unshift([maxSlots, newObj])
		} else {
			obj.push(componentIndex);
			componentIndex++;
		}

	}
	//console.log(JSON.stringify(nested));
	
	let components = decomposition.filter(x=>"⿱⿳⿻⿰⿲⿺⿸⿹⿴⿵⿶⿷".split('').indexOf(x)===-1);

	let componentMeanings = components.map(x => {
		let meaning = hanzi.getRadicalMeaning(x);

		if (meaning === 'N/A') {
			let definition = hanzi.definitionLookup(x);
			if (definition !== undefined) {
				meaning = definition[definition.length-1].definition.split('/')[0];
			} else {
				meaning = '';
			}
		}

		return meaning;
	});

	/*let groups = [];
	components.forEach(function(component, componentIndex) {
		let numberOfStrokes = graphics[component].strokes.length;

		for(let i = 0; i < numberOfStrokes; i++) {
			groups.push(componentIndex);
		}
	});*/
	let matches = dictionary[char].matches;

	let groups = [];
	for (let i = 0; i < matches.length; i++) {
		let indexes = matches[i];

		if (indexes == null) {
			groups.push(null);
		} else {
			let pos;
			if (nested[0].constructor === Array) {
				pos = nested[0][1];
			} else {
				pos = nested;
			}

			indexes.forEach(function(index) {
				pos = pos[index];
				if (pos.constructor === Array) {
					pos = pos[1];
				}
			});

			groups.push(pos);
		}
	}


	return {
		'components': components,
		'componentMeanings': componentMeanings,
		'groups': groups,
		'radical': dictionary[char].radical,
	}
}


module.exports = function(app) {

	app.get("/", function(req, res) {
		let type = req.query.type || 'simplified';

		/*let characters = req.query.chars.split(',').map(char => {

		});*/

		let words = req.query.words.split(',').map(word => {
			let pinyinNumber = hanzi.getPinyin(word);
			let definition = dictionary[word].definition;
			let pinyinAccent = pinyinNumber.map(pinyinNumberToAccent);

			let sentences = getSentencesWithWord(word)
				sentences.sort((a,b) => Math.abs(a.length-10) < Math.abs(b.length-10));
				sentences = sentences.slice(0, 3);

			let hzdef = hanzi.definitionLookup(word);
			let simplified = hzdef[0]['simplified'];

			let audioFile = getAudioFile(simplified);
			
			let characters = [...word].map(char => {
				char = hanzi.definitionLookup(char)[0][type];
				let decomposition = getDecomposition(char);

				return {
					'character': char,
					'strokes': graphics[char].strokes,
					'medians': graphics[char].medians,
					
					'components': decomposition.components,
					'componentMeanings': decomposition.componentMeanings,
					'groups': decomposition.groups,
					'radical': decomposition.radical,
				}
			})
			return {
				'hanzi': word,
				pinyinNumber,
				pinyinAccent,
				definition,
				characters,
				sentences,
				audioFile
			}
		});

	    res.send(words);
	});

	app.use('/mp3', express.static('./data/audio/cmn_mp3'))

};