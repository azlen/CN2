import wordfreq

lang = 'zh'
top_n = wordfreq.top_n_list(lang, 50000)


with open('zh_word_frequency.txt', 'w') as f:
    for word in top_n:
        frequency = wordfreq.word_frequency(word, lang)
        line = '%s %f\n' % (word, frequency)

        f.write(line)
    f.close()