const state = {
    theme: 'dark', // [ 'dark', 'light' ]
    textSize: 'medium', // [ 'small', 'medium', 'large' ]
    simplifiedOrTraditional: 'simplified', // [ 'simplified', 'traditional' ]
    silentMode: 'off', // [ 'on', 'off' ]
    pinyinStyle: 'accent', // [ 'accent', 'number', 'bopofomo' ]
    toneStyle: 'hanping', // [ ... ]
}

const getters = {
    
}

const mutations = {
    setOption(state, changes) {
        Object.keys(changes).forEach(key => state[key] = changes[key]);
    }
}

const actions = {
    
}

export default {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}
