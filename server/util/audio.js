// let fs = require('fs')
let iniparser = require('iniparser');

let config = iniparser.parseSync('./data/audio/cmn_mp3/index.ini');
let files = Object.keys(config);

let links = {};

for(let i = 0; i < files.length; i++) {
    let filename = files[i];
    if(filename.endsWith('.flac')) {
        let data = config[filename];
        let newFilename = filename.replace('.flac', '');

        config[newFilename] = data;
        if(links[data['SWAC_TEXT']] == undefined) {
            links[data['SWAC_TEXT']] = newFilename;
        } else {
            console.log('DUPLICATE');
        }
        

        delete config[files[i]];
    }
}

//console.log(Object.keys(config))
//console.log(links);

function getAudioFile(word) {
    return `${links[word]}.mp3`;
}

module.exports = { getAudioFile }