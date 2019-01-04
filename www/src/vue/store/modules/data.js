import Vue from 'vue'
import { distance, angle } from './../../../assets/js/util.js'

const state = {
  //order: '手戈我白丶勹勺的人小尔亻你日疋是了门们不文辶这也他一土在月有么子女好阝那要个云会口尢尤亠京就十什水氵殳没至刀刂到儿兄言八兑讠说马心目木相想首道她来艮彳很看丁可天'.split(''),
  order: '的在了是我和有他不这年人也为对说一'.split(''),
  history: [],
  exercises: [],
  characters: {

  }
}

const getters = {
  nextExercise() {

  },
  nextCharacter() {
    return state.order.shift();
  },
}

const mutations = {
  storeCharacterData(state, processedCharacterArray) {
    processedCharacterArray.forEach(characterData => {
      state.characters[characterData.character] = characterData;
    })
  },
  setExercises(state, exercises) {
    exercises.forEach(x => state.exercises.push(x));
  }
}

function processCharacter(characterData) {
  let processed = {};
  
  processed.character = characterData.character;
  processed.pinyin = characterData.pinyinAccent;
  processed.definition = characterData.definition2;

  processed.tone = characterData.pinyinNumber.slice(-1);
  
  processed.components = characterData.components;
  //processed.groups = characterData.groups;

  let drawSpeed = 800;
  let delay = 0.5;

  let timeBetweenStrokes = 0.2;

  processed.strokes = characterData.strokes;
  processed.medians = characterData.medians.map(function(A, index) {
    
    // When the stroke animation begins, a large chunk of stroke is seen immediately
    // Here we extend the starting point of the median to accomodate for this fact
    // So that the stroke appears outside of the clipping-path and the animation is therefore smoother

    let [s1x, s1y] = A[0]; // first point
    let [s2x, s2y] = A[1]; // second point
    let a1 = angle(s2x, s2y, s1x, s1y);
    let d1 = distance(s2x, s2y, s1x, s1y);

    A[0] = [
      s2x + Math.cos(a1) * (d1 + 120),
      s2y + Math.sin(a1) * (d1 + 120)
    ];

    // This extends the end of the path, which is probably not needed

    /*let [e1x, e1y] = A[A.length - 1]; // last point
    let [e2x, e2y] = A[A.length - 2]; // second last point
    let a2 = angle(e2x, e2y, e1x, e1y);
    let d2 = distance(e2x, e2y, e1x, e1y);

    A[A.length - 1] [
      e2x + Math.cos(a2) * (d2 + 0),
      e2y + Math.sin(a2) * (d2 + 0)
    ];*/


    // Convert array of points to path definition and calculate the total length 
    let totalLength = 0;

    let [startX, startY] = A[0];
    let path = `M${startX} ${startY}`;

    for (let i = 1; i < A.length; i++) {
      let [pointX, pointY] = A[i];
      path += `L${pointX} ${pointY}`;

      totalLength += distance(A[i-1][0], A[i-1][1], A[i][0], A[i][1]);
    }

    //let totalLength = A.reduce

    let duration = totalLength / drawSpeed;
    let out = {
      //'stroke': response.body.simplified.strokes[index],
      'index': index,
      'path': path,
      'totalLength': totalLength,
      'duration': duration,
      'delay': delay
    };

    delay += duration + timeBetweenStrokes;

    return out;
  });
  
  processed.groups = [];
  characterData.groups.forEach((groupNumber, i) => {
    if (processed.groups[groupNumber] == undefined) {
      processed.groups[groupNumber] = {medians: []};
    }

    processed.groups[groupNumber].medians.push(processed.medians[i]);
  });

  processed.groups.forEach((group, groupIndex) => {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let midX = 0, midY = 0;

    group.medians.forEach(m => {
      let median = characterData.medians[m.index];
      let avgX = 0, avgY = 0;

      median.forEach(point => {
        let x = point[0] - 512;
        let y = point[1] - 512;

        avgX += x;
        avgY += y;

        if(x < minX) minX = x;
        if(x > maxX) maxX = x;
        if(y < minY) minY = y;
        if(y > maxY) maxY = y;
      });

      avgX /= median.length;
      avgY /= median.length;

      midX += avgX;
      midY += avgY;
    })

    midX /= group.medians.length;
    midY /= group.medians.length;

    group.offset = {x: midX, y: midY};
    group.bbox = {x: minX, y: minY, width: maxX-minX, height: maxY-minY, x2: maxX, y2: maxY};
    //group.textPos = {x: (minX + maxX)/2 + 512, y: -maxY};
    group.definition = characterData.componentMeanings[groupIndex];
    group.pinyin = 'test3';
  });

  processed.totalDuration = delay;

  return processed;
}

const actions = {
  downloadCharacterData({ commit }, { characterArray, callback }) {
    let parameters = { 
      'words': [].concat(characterArray).join(','),
      'type': 'simplified'
    }
    console.log(JSON.stringify(parameters));
    Vue.http.get('http://192.168.0.24:3001', { params: parameters }).then(response => {
      let processedCharacters = response.body.map(processCharacter);

      commit('storeCharacterData', processedCharacters);

      if(callback != undefined) callback();
    }, response => {
      // error callback
    });
  }
}

export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
