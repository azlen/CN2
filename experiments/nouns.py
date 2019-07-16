from nltk.corpus import wordnet as wn
from wordfreq import top_n_list, zipf_frequency
from subprocess import check_output
import os
import json

print("GATHERING NOUNS FROM WORDNET")
allnouns = {x.name().split('.', 1)[0] for x in wn.all_synsets('n')}

print("COMPILING TOP_N LIST")
words = top_n_list('en', 25000)

allnouns = list(filter(lambda x: x in allnouns, words))

ipavowels = "iyɨʉɯuɪʏɨ̞ʉ̞ɯ̞ʊeøɘɵɤoe̞ø̞əɤ̞o̞ɛœɜɞʌɔæɐaɶäɒ̈ɑɒ"

phonmap = {}

ipacache = {}
if os.path.isfile('_ipacache.json'):
    with open('_ipacache.json', 'r') as f:
        ipacache = json.load(f)

blacklist = []
with open('blacklist.json', 'r') as f:
    blacklist = json.load(f)

with open('whitelist.json', 'r') as f:
    whitelist = json.load(f)
    for word in whitelist:
        if word not in allnouns:
            allnouns.append(word)

penalizedWords = []
with open('penalized.json', 'r') as f:
    penalizedWords = json.load(f)

def getIPA(lang, text):
    if lang not in ipacache:
        ipacache[lang] = {}
    
    if text in ipacache[lang]:
        return ipacache[lang][text]
    else:
        ipa = check_output(['espeak', '-q', '--ipa', '-v', lang, text]).decode('utf-8').strip()
        ipacache[lang][text] = ipa
        return ipa

for noun in allnouns:
    if noun in blacklist:
        continue
    
    ipa = getIPA('en-us', noun)
    ipa = ipa.replace("ˈ", '')
    ipa = ipa.replace("ˌ", '')
    ipa = ipa.replace("ː", '')
    
    #nounFreq = zipf_frequency(noun, 'en')

    for i in range(min(len(ipa), 3)):
        s = ipa[:i+1]

        freqNew = zipf_frequency(noun, 'en')

        if i+1 < len(ipa):
            if ipa[i] in ipavowels and ipa[i+1] in ipavowels:
                freqNew /= 2
            
            if ipa[i:i+2] in ['tʃ', 'dʒ', 'ks']:
                freqNew /= 2

        otherPOS = list(set([x[1] for x in filter(lambda x: x[0]==noun and x[1]!='n',[x.name().split('.') for x in wn.synsets(noun)])]))
        
        if len(otherPOS) > 0:
            freqNew /= 1.1**len(otherPOS)
        
        if noun in penalizedWords:
            freqNew /= 2

        if noun == 'a':
            print(freqNew)

        if s in phonmap:
            freqOld = phonmap[s][1]
            
            if freqNew > freqOld:
                phonmap[s] = (noun, freqNew)
                #print(s, noun)
        else:
            phonmap[s] = (noun, freqNew)
            #print(s, noun)


#for s in phonmap:
#    phonmap[s] = phonmap[s][0]

# print('\n'.join(sorted([x[1] for x in list(phonmap.items())])))

phoneticVariations = {
    'tʃ': {'tʃ': 1.0},
    'dʒ': {'dʒ': 1.0},
    'eɪ': {'eɪ': 1.0, 'ej': 0.8, 'ejj': 0.7, 'ɛj': 0.6, 'e': 0.5},
    'ɔɪ': {'ɔɪ': 1.0, 'oɪ': 0.7, 'uj': 0.5, 'ujj': 0.5},

    'ks': {'ks': 1.0},
    'ju': {'ju': 1.0, 'u': 0.5},
    #'oɪ': {'oɪ': 1.0, 'ɔɪ': 0.7, 'uj': 0.5, 'ujj': 0.5},

    'ɛ': {'ɛ': 1.0, 'e': 0.5},

    'ɐ': {'ɐ': 1.0, 'ɛ': 0.2},
    'ɑ': {'ɑ': 1.0, 'a': 0.25},
    'æ': {'æ': 1.0, 'a': 0.5, 'ɛ': 0.2},
    'b': {'b': 1.0, 'β': 0.8},
    'd': {'d': 1.0, 'ð': 0.7},
    'ð': {'ð': 1.0, 'd': 0.7},
    'ɔ': {'ɔ': 1.0, 'o': 0.5, 'œ': 0.3},
    'o': {'o': 1.0, 'ɔ': 0.5, 'œ': 0.3},
    
    'ɪ': {'ɪ': 1.0, 'i': 0.5, 'j':0.3, 'jj': 0.1},
    'i': {'i': 1.0, 'ɪ': 0.5, 'j': 0.4, 'jj': 0.3},
    'ɹ': {'ɹ': 1.0, 'ɾ': 0.8, 'ʁ': 0.3, 'r': 0.25},
    'ʌ': {'ʌ': 1.0, 'u': 0.4},
    'u': {'u': 1.0, 'w': 0.6, 'ʌ': 0.4},
    'j': {'j': 1.0, 'jj': 0.9},
    'h': {'h': 1.0, 'x': 0.7},
    'x': {'x': 1.0, 'h': 0.7},

    'v': {'v': 1.0, 'f': 0.5},
    'f': {'f': 1.0, 'v': 0.5},

    'ɣ': {'ɣ': 1.0, 'g': 0.7},
    'g': {'g': 1.0, 'ɣ': 0.7},
}

phoneticLookup = {}

def addItem(word, ipa, score):
    data = (word, score)
    if ipa in phoneticLookup:
        phoneticLookup[ipa].append(data)
        #phoneticLookup[ipa] = sorted(phoneticLookup[ipa], key=lambda x: x[2])
    else:
        phoneticLookup[ipa] = [data]

def getPhoneticVariations(ipa):
    ipa = ','.join(list(ipa))
    for key in phoneticVariations:
        if len(key) > 1:
            ipa = ipa.replace(','.join(list(key)), key)
    ipa = ipa.split(',')

    results = [(1, [])]

    for phoneme in ipa:
        new_results = []
        opts = {}
        if phoneme in phoneticVariations:
            opts = phoneticVariations[phoneme]
        else:
            opts[phoneme] = 1.0
        
        for alt in opts:
            new_results += list(map(lambda a: (a[0]*opts[alt], a[1] + [alt]), results))
        
        results = new_results
        new_results = []
    
    return results


print('BUILDING PHONETIC LOOKUP TABLE')
for ipa in phonmap:
    word, freq = phonmap[ipa]

    variations = getPhoneticVariations(ipa)

    for score, ipa_variation in variations:
        addItem(word, ''.join(ipa_variation),  score / freq )

print('SORTING PHONETIC LOOKUP TABLE')
for key in phoneticLookup:
    phoneticLookup[key] = sorted(phoneticLookup[key], key=lambda x: x[1])

print(phoneticLookup)

def recursive(ipa):
    options = []
    for i in range(1, len(ipa)):
        segment = ipa[:i+1]
        if segment in phoneticLookup:
            word, score = phoneticLookup[segment][0]
            #data = (emoji, word)
            if len(ipa[i+1:]) > 0:
                options += list(map(lambda x: [word] + x, recursive(ipa[i+1:])))
            else:
                #options = options + [[ipa[:i]]]
                options += [[word]]
    return options

def wordToMnemonic(word, language):
    ipa = getIPA(language, word)

    ipa = ipa.replace("ˈ", '')
    ipa = ipa.replace("ˌ", '')
    ipa = ipa.replace("ː", '')

    results = sorted(recursive(ipa), key=lambda x: len(x))

    if len(results) > 0:
        return results[0]
    else:
        return None

with open('output_es.txt', 'w') as f:
    for word in top_n_list('es', 250):
        data = wordToMnemonic(word, 'es-la')
        if data != None:
            #mnemonicEmojis, mnemonicWords = list(zip(*data)) 
            f.write('%s: %s\n' % (word, ', '.join(data)))
            #f.write('\n'.join(list(map(lambda x: ''.join(x), mnemonics))))
        else:
            f.write('%s (NONE)\n' % (word))

with open('_ipacache.json', 'w') as f:
    json.dump(ipacache, f)