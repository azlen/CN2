#!/usr/bin/python
# -*- coding: utf-8 -*-

import cjklib


from cjklib import characterlookup
cjk = characterlookup.CharacterLookup('T', 'BIG5')

from cjklib.dictionary import CEDICT
d = CEDICT()

print d.getFor(u'东京')


"""with open('zh_word_frequency.txt', 'w') as f:
    for word in top_n:
        frequency = wordfreq.word_frequency(word, lang)
        line = '%s %f\n' % (word, frequency)

        f.write(line)
    f.close()"""