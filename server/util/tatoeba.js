let readLines = require('n-readlines');
let hanzi = require('hanzi');

hanzi.start();

console.log('LOADING SENTENCES');

let rawSentences = (function() {
	let out = {};
	let line, lineIterator = new readLines('./data/tatoeba/sentences.csv');

	while (line = lineIterator.next()) {
		try {
			let [_, index, lang, sentence] = String(line).match(/(\d+)\t(\w+)\t(.*)/);

			if (lang === 'cmn' || lang === 'eng') {
				out[index] = { lang, sentence };
			}
		} catch {
			console.log(String(line));
		}	 
		
	}

	return out;
})();


console.log('LOADING LINKS BETWEEN SENTENCES');

let sentences = (function() {
	let out = [];
	let line, lineIterator = new readLines('./data/tatoeba/links.csv');

	while (line = lineIterator.next()) {
		let [_, indexA, indexB] = String(line).match(/(\d+)\t(\d+)/);

		indexA = Number(indexA);
		indexB = Number(indexB);

		let sentenceA = rawSentences[indexA];
		let sentenceB = rawSentences[indexB];
		if (sentenceA != undefined && sentenceB != undefined) {
			if (sentenceA.arrayGroup != undefined && sentenceB.arrayGroup == undefined) {
				sentenceA.arrayGroup.push(sentenceB);
				sentenceB.arrayGroup = sentenceA.arrayGroup;
			} else if (sentenceB.arrayGroup != undefined && sentenceA.arrayGroup == undefined) {
				sentenceB.arrayGroup.push(sentenceA);
				sentenceA.arrayGroup = sentenceB.arrayGroup;
			} else if (sentenceA.arrayGroup == undefined && sentenceB.arrayGroup == undefined) {
				let sentenceArray = [ sentenceA, sentenceB ];
				out.push(sentenceArray);

				sentenceA.arrayGroup = sentenceArray;
				sentenceB.arrayGroup = sentenceArray;
			}
		}
	}

	out.forEach(sentenceArray => {
		sentenceArray.forEach(sentence => {
			delete sentence.arrayGroup;
		})
	});

	return out;
})();

console.log('COMPILING SENTENCE DICTIONARY');

let sentencesWithWord = (function() {
	let out = {};

	sentences.forEach(sentenceArray => {
		let sentenceLangs = {};
		sentenceArray.forEach(sentence => {
			sentenceLangs[sentence.lang] = sentence.sentence;
		})

		if (sentenceLangs['cmn'] != undefined) {
			sentenceLangs.segmented = hanzi.segment(sentenceLangs['cmn']);

			sentenceLangs.segmented.forEach(word => {
				if (out[word] != undefined) {
					out[word].push(sentenceLangs);
				} else {
					out[word] = [sentenceLangs];
				}
			})
		}
	});

	return out;
})();

function getSentencesWithWord(word) {
	return sentencesWithWord[word];
}


module.exports = {
	sentences,
	sentencesWithWord,
	getSentencesWithWord
}