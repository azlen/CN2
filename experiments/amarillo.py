import wordfreq

wordlist = wordfreq.top_n_list('en', 10000)

wordlist = list(filter(lambda x: len(x) <= 5, wordlist))

freq = [13, 3, 3, 6, 18, 3, 4, 3, 12, 2, 2, 5, 3, 8, 11, 3, 2, 9, 6, 9, 6, 3, 3, 2, 3, 2]
alphabet = 'abcdefghijklmnopqrstuvwxyz'

bananacount = dict(zip(alphabet, freq))

phondict = {}

for word in wordlist:
    rarity = wordfreq.word_frequency(word, 'en')
    for i in range(1, len(word)):
        biphon = word[i-1:i+1]
        if biphon[0] in alphabet and biphon[1] in alphabet:
            if biphon in phondict:
                phondict[biphon] += rarity
            else:
                phondict[biphon] = rarity

items = list(phondict.items())
items.sort(key=lambda x: x[1], reverse=True)

groups = [
    [['z'], bananacount['z'], 0],
    [['q'], bananacount['q'], 0],
    [['x'], bananacount['x'], 0],
    [['v'], bananacount['v'], 0],
    [['j'], bananacount['j'], 0],
]

remaining = list(alphabet)
remaining.remove('z')
remaining.remove('q')
remaining.remove('x')
remaining.remove('v')
remaining.remove('j')

while len(remaining) > 0:
    groups.sort(key=lambda x: x[1])

    letters, bananasum, biphonfreq = groups[0]
    choices = list(filter(lambda x: len(set(letters) & set(x)) > 0 and len(set(remaining) & set(x)) > 0, dict(items).keys()))
    
    newletter = list(set(choices[0]) - set(letters))[0]
    letters.append(newletter)
    groups[0][1] += bananacount[newletter]

    remaining.remove(newletter)

print(groups)