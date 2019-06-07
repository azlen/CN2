let fs = require('fs');
let readLines = require('n-readlines');
let sqlite3 = require('sqlite3').verbose();
let cjk_unihan = require('./util/cjk-unihan.js');

// let cedict = require('node-cc-cedict');

let { cedict } = require('./util/cedict.js');

let hanzi = require('hanzi');
let { pinyinNumberToAccent } = require('./util/util.js');

let { dictionary, graphics } = require('./util/makemeahanzi.js');

hanzi.start();

//let leiden_frequency = [];


let wordFrequencies = (function() {
	let out = [];
	let line, lineIterator = new readLines('./zh_word_frequency.txt');

	while (line = lineIterator.next()) {
        let match = String(line).match(/(.+) (\d+)/);
        if(match != null) {
            let [_, word, frequency] = match;
            
            if (cedict[word] != undefined) {
                out.push(word);
            }
        }
	}

	return out;
})();

//wordFrequencies = wordFrequencies.slice(0, 10000);

let wordStats = [];
Promise.all(wordFrequencies.map((word, i) => {
    return new Promise(resolve => {
        let wordData = {
            'word': word,
            'index': i,
            'decomposition': hanzi.decompose(word),
        }

        wordStats.push(wordData);
        resolve();
    });
})).then(() => {
    let wordOrder = [];

    function addWord(word) {
        if(wordOrder.indexOf(word) === -1) {
            wordOrder.push(word);
        }
    }

    let useless = [];

    for(let i = 0; i < wordStats.length; i++) {
        let data = wordStats[i];

        //console.log(data.decomposition.components1)
        if(data.decomposition.components1 != undefined) {
            data.decomposition.components1.forEach(glyph => {
                //if(data.index < 100) console.log(glyph, glyph.length, hanzi.getCharactersWithComponent(glyph).length, , );
                if (glyph !== 'No glyph available' && wordOrder.indexOf(glyph) === -1) {
                    let frequencyIndex = wordFrequencies.indexOf(glyph);
                    if ( frequencyIndex < 3000 && frequencyIndex !== -1 ) {
                        addWord(glyph);
                    } else if (useless.indexOf(glyph) === -1) {
                        let componentFrequency = hanzi.getCharactersWithComponent(glyph).length;
                        let usefulness = []
                            .concat(...hanzi.getExamples(glyph))
                            .map(x=> wordFrequencies.indexOf(x)+1 || 100000)
                            .reduce((a,b) => a + 1/Math.sqrt(b), 0);
                        
                        if (usefulness > 0.1) {
                            addWord(glyph);
                        } else {
                            useless.push(glyph);
                        }
                    }
                }
            })
        }
        addWord(data.word)
        
        if (wordOrder.length > 2000) {
            break;
        }
    }
    
    console.log(wordOrder.join(','))
});

