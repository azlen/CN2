import Vue from 'vue'
import { distance, angle } from './../../../assets/js/util.js'

const state = {
  //order: '手戈我白丶勹勺的人小尔亻你日疋是了门们不文辶这也他一土在月有么子女好阝那要个云会口尢尤亠京就十什水氵殳没至刀刂到儿兄言八兑讠说马心目木相想首道她来艮彳很看丁可天'.split(''),
  //learnQueue: '白,的,在,了,日,是,手,我,口,和,月,有,也,他,不,文,这,年,人,力,为,又,对,说,一,们,我们,与,京,就,者,都,尔,你,上,中,至,到,未,来,个,他们,云,会,女,要,她,二,没,没有,而,还,后,国,中国,干,于,但,很,皮,被,开,并,时,这个,从,以,将,寺,等,让,可,可以,土,地,羊,目,着,大,自,自己,去,巴,把,能,之,家,国家,多,么,什么,子,好,得,过,那,合,给,田,里,下,看,问,题,问题,因,因为,或,戶,所,样,这样,乃,及,相,心,想,由,些,这些,不是,就是,已,经,已经,它,故,做,丁,更,用,美,美国,八,只,始,开始,亲,新,现,现在,社,社会,工,作,工作,曰,取,最,甘,其,山,出,发,展,发展,可能,知,道,知道,两,向,如,果,如果,进,行,进行,门,却,该,前,区,地区,认,认为,再,当,种,成,成为,政,府,政府,候,时候,间,时间,马,吗,才,世,界,世界,公,司,公司,情,情况,长,不能,事,但是,内,占,点,济,经济,起,起来,方,地方,小,活,动,活动,组,组织,三,主,主要,走,需,需要,使,使用,历,史,历史,其中,其他,应,应该,生,生活,以及,发生,所以,第,民,人民,听,学,学生,必,须,必须,治,政治,舌,话,一些,为了,贝,则,同,同时,天,本,日本,出现,还有,这里,一样,尼,呢,国际,所有,止,此,觉,觉得,高,不会,发现,影,响,影响,象,像,决,定,决定,包,包括,怎么,化,文化,跟,还是,通,通过,不过,次,比,许,许多,不同,带,青,请,首,重,重要,一定,只是,虽,然,虽然,人们,全,全国,出来,由于,求,要求,作为,吧,因此,当时,且,而且,那么,万,便,关,系,关系,号,大学,孩子,无,研究,谁,之后,立,位,校,学校,最后,业,企业,你们,望,希望,术,技术,木,儿,见,根,据,根据,非,常,非常,东,西,东西,代,表,代表,容,内容,名,对于,岁,教,育,教育,车,交,较,刀,分,城,市,城市,特,别,特别,过去,这么,元,玉,太,提,供,提供,曾,这种,写,叫,吃,打,钱,切,一切,今,今天,参,加,参加,阿,啊,场,市场,式,方式,正,统,系统,获,获得,那些,任,何,任何,关于,单,单位,即,大家,然后,友,爱,十,具,真,续,继续,部,部分,般,一般,个人,北,北京,广,总,有关,约,结,结果,运,运动,一起,议,会议,住,另,当然,井,直,一直,中心,目前,几,回,如何,服,务,服务,站,记,记者,人口,准,备,准备,喜,欢,喜欢,处,朋友,死,环,境,环境,产,生产,示,表示,为什么,书,以后,各,外,委,员,委员会,完,完全,得到,找,提出,计,划,计划,领,导,领导,之间,告,告诉,比较,够,能够,那个,人员,建,建立,期,时期,母,每,少,省,管,理,管理,资,料,资料,达,电,电影,相关,程,过程,入,进入,选,选择,保,护,保护,受,习,学习,有些,有人,法,法律,断,不断,不要,事情,军,设,建设,战,争,战争,面,方面,纪,世纪,品,产品,四,甚,甚至,第一,规,规定,识,认识,一次,先,党,拿,闻,新闻,米,副,张,您,报,报告,机,机构,称,英,英国,路,举,举行,亦,产生,仍,国内,年代,快,或者,支,持,支持,政策,语,言,语言,原,原因,如此,存,存在,小时,并且,感,感觉,成立,无法,机会,条,电话,经过,行为,一种,传,传统,台,湾,台湾,安,安全,功,成功,故事,期间,法国,自由,解,解决,七,一点,之前,实,其实,发表,受到,基,基础,它们,建筑,接,接受,父,父亲,能力,设计,连,海,上海,专,专业,了解,作品,先生,王,县,后来,工业,帮,助,帮助,改,变,改变,整,整个,注,意,注意,标,目标,老,严,严重,物,人物,以下,增,增加,根本,独,独立,信,相信,群,众,群众,艺,艺术,表现,下来,办,办法,只要,处理,时代,民主,离,离开,结束,超,超过,那里,五,具有,变化,合作,完成,我国,方法,杀,正在,直接,负,负责,造,造成,可是,各种,真正,科,科技,行动,行政,音,乐,音乐,头,买,件,事件,以上,回来,拥有,是否,源,资源,制,女人,形,形成,放,条件,然而,除,除了,项,项目,也许,任务,利,利用,度,制度,努力,均,家庭,意见,指,居,欧,洲,欧洲,水,看见,验,经验,明,说明,达到,选举,以来,价,值,价值,作者,几乎,多少,感到,找到,母亲,赛,比赛,科学,自然,命,革命,香,港,香港,仅,不仅,主席,类,人类,儿子,基本,结构,网,网络,讲,调,查,调查,部门,难,之一,牛,开发,性,成员,投,投资,章,文章,标准,论,理论,相当,解释,例,例如,另外,她们,总统,执,执行,指出,确定,讨,讨论,队,集,团,集团,分别,医,院,医院,十分,反,反对,土地,声,声音,学院,建议,按,明白,清,清楚,简,简单,联,联系,右,若,介绍,以前,格,价格,别人,参与,同样,增长,实现,改革,段,生命,视,电视,精,神,精神,那样,农,农业,取得,字,实际,工程,才能,控制,派,笑,第二,终,终于,中央,似,似乎,位于,证,保证,共,加入,图,致,导致,当地,德,德国,义,意义,拉,斯,现象,考,考虑,围,范围,警,察,警察,送,低,分析,厂,坐,士,属,属于,引,引起,提高,数,族,民族,级,组成,肯定,证明,越,采,采用,积,面积,于是,共同,量,力量,妈,妈妈,总是,知识,网站,跑,近,远,以为,息,信息,全部,军事,农民,区域,变成,大量,易,容易,尽,尽管,开放,愿,愿意,早,汽车,男,男人,过来,重点,金,银,银行,军队,女儿,形式,怎样,显,显示,权,权利,来自,片,版,重新,仍然,作用,钟,分钟,名字,坚,坚持,施,实施,师,教师,明显,曾经,正式,现代,编,编辑,美元,评,评论,炎,谈,责任,读,阅读,倒,原来,实行,尤其,强,未来,权力,消,消息,目的,空,空间,说话,采取,专家,六,出版,刚,印,印度,反应,牙,呀,唯一,体,媒体,届,担心,最终,永,永远,电子,线,节,节目,逐渐,事实,交通,南,女性,往,所谓,既,机关,极,理解,确实,穿,统一,花,观,观点,身,身上,错,错误,青年,今年,令,减,减少,功能,哪,回到,实在,宣,布,宣布,居民,强调,态,态度,思,思想,无论,晚,晚上,最高,来源,欢迎,每年,状,状态,经常,千,长期,俄,罗,俄罗斯,保持,志,同志,同意,哪里,困难,左,左右,轻,年轻,教授,文学,有点,此外,亡,死亡,毕业,游,戏,游戏,直到,官,经历,职,职业,脸,模,规模,身体,里面,页,领域,创,创造,听到,答,回答,小说,带来,吊,意识,更加,联合,西方,产业,村,农村,失,失去,应用,照,照片,户,用户,相同,看来,营,经营,而是,至少,练,训练,步,进一步,部队,下去,加强,动物,即使,原则,双,双方,只能,刑,型,女孩,旅,旅游,有时,积极,突然,红,绝,绝对,附,附近,飞,飞机,首先,兴,高兴,不再,主任,作家,险,危险,发布,喝,妇,妇女,官员,广场,击,攻击,方向,最近,正确,每天,状况,社区,程度,稳定,老师,见到,设备,转,不知,事业,公共,创作,卖,宣传,意思,手机,承,承认,担任,数据,来到,记得,资本,通常,阶段,韩国,乡,人数,健,康,健康,童,儿童,球,全球,公里,具体,内部,分布,益,利益,室,办公室,啦,外国,委员,宗,宗教,宪法,广告,持续,搞,机场,检,检查,眼,眼睛,破,坏,破坏,申,称为,苏,苏联,英语,道路,随,雨,风,亚,公开,几个,出去,劳,劳动,各地,平,和平,商,商业,在于,地位,陆,大陆,总理,成绩,杂,杂志,武,器,武器,算,胜,胜利,设立,镇,限制,丰,富,丰富,主题,亿,份,置,位置,初,压,压力,发出,团体,多数,排,安排,广泛,拍,数量,类似,结合,调整,边,这位,部长,不错,人士,兄弟,古,克,关注,其它,医生,各国,大会,好像,州,教学,显然,模式,水平,父母,玩,现实,监督,列,系列,词,铁,铁路,黄,不想,主张,举办,体系,公民,家里,烈,强烈,复,恢复,掉,收,收入,正常,脑,电脑,相对,角,色,角色,难道,靠,不到,不可,不少,习惯,再次,制作,协议,召开,块,层,必要,文字,真实,紧,紧张,录,记录,质,质量,重大,面对,一下,流,交流,兴趣,制造,卷,回家,学者,工具,座,心里,斗,战斗,抓,文件,留,留下,等等,认真,读者,速,速度,一部分,不管,业务,中学,从事,关心,底,到底,协会,否则,国民党,败,失败,妻子,平均,批,批评,报道,本身,样子,治疗,现场,专门,之中,亚洲,值得,充,满,充满,复杂,少数,巨,巨大,干部,想到,或许,略,战略,扩大,按照,放弃,数字,案,方案,是不是,最好,本来,楼,深,特殊,特点,申请,皆,婚,结婚,综合,翻,译,翻译,背,景,背景,演,表演,规划,贸易,运用,重视,销,销售,难以,九,余,促进,医疗,及其,发行,名称,周,命令,工人,广州,待,拒绝,政权,明确,效,有效,气,街,设施,越来越,迅速,久,依,依据,允许,公布,卡,反映,官方,忙,打开,换,旧,某,林,梦,物质,犯,罪,犯罪,画,病,篇,统治,缺,缺乏,鱼,下午,不久,从来,停,停止,前往,加上,半,素,因素,大约,实际上,寻,寻找,心理,怕,谢,感谢,房,房子,普,普通,念,概念,正是,睡,竞争,联盟,行业,表达,观众,课,课程,资金,路线,进步,针,针对,需求,一边,不够,人生,光,关键,出口,去年,各个,听说,图片,对象,想要,打算,投入,指导,推,推动,措施,善,改善,敌,敌人,李,立即,类型,至今,英文,衣,衣服,队伍,上面,足,不足,中共,伟大,体育,先进,园,公园,博,博士,咱们,大型,阳,太阳,女子,成长,效果,斗争,枪,爸,爸爸,痛,苦,痛苦,统计,试,考试,著,著名,论坛,贡献,购买,距离,酒,夫,丈夫,兼,制定,危机,发挥,实验,形象,懂,材料,满足,班,的话,密,秘密,程序,脚,西班牙,观察,货,货币,身份,身边,避,避免,黑,不好,从而,优,秀,优秀,播,传播,全面,冲,冲突,刚才,发动,国务院,基地,害,害怕,当年,手段,昨天,理由,生物,食,粮食,板,老板,计算,设置,说法,费,跳,适,适合,集中,面前,不用,估计,各位,国王,养,培养,处于,大概,对方,快乐,性质,描述,早上,朝,朝鲜,构成,电视台,真是,给予,维,维持,君,装,访问,输,运输,进来,马上,龙,中间,主义,今日,刚刚,商品,回去,国外,国民,大部分,如今,威,威胁,小学,展开,岛,并非,怀,疑,怀疑,感受,或是,房间,打击,触,接触,推出,普遍,哥,歌,法院,爆,爆发,特色,雄,英雄,连续,临,面临,驻,高级,一家,不得,事务,体制,使得,卫,卫生,小姐,律师,情绪,想法,纸,报纸,日子,句,狗,的确,豆,短,纪念,维护,丽,美丽,风格,食品,鼓,鼓励,事实上,出发,耳,后面,因而,境内,多么,居住,年龄,往往,心中,批准,指挥,毛,泽,毛泽东,法规,消失,演出,征,特征,第一次,船,规范,费用,严格,争取,势,优势,伤,伤害,势力,听见,地点,地球,弄,当中,收到,明天,星,星期,机械,某些,比如,民间,热,男子,符合,自身,至于,评价,遇到,不了,为何,书记,人才,众多,别的,动作,含,包含,吸,吸引,城镇,差,应当,开展,快速,替,有限,杯,比例,演员,顾,照顾,纽约,载,记载,进去,馆,高度,上述,下面,华,中华,临时,之外,享受,作出,保障,免费,公路,南部,受伤,周围,姑娘,导演,损失,整体,标志,武装,男性,立法,联合国,良,良好,软,软件,邀请,陈,随后,一句,一旦,中华人民共和国,依然,创新,古代,团结,地图,奇,怪,奇怪,始终,尚,尚未,彻底,忘,挂,敢,机器,案件,消费,刻,立刻,自我,财,财产,适应,适当,那时,降,降低,交易,地理,实践,就要,帝,帝国,常常,平等,广播,付,影片,忘记,思考,挺,既然,来看,森,森林,竟,毕竟,石,油,石油,要是,规则,角度,证据,通知,风险,食物,乱,共有,加拿大,哭,夫人,完整,将军,小组,就业,平台,接近,时刻,最佳,有趣,树,此时,河,率,百,皇,皇帝,药,藏,虫'.split(','),
  learnQueue: '的,在,了,日,是,手,我,口,和,月,有,也,他,不'.split(','),
  history: [],
  exercises: [],
  /*characters: {

  },*/
  words: {
    
  }
}

const getters = {
  nextExercise() {

  },
  /*nextCharacter() {
    return state.order.shift();
  },*/
}

const mutations = {
  storeWordData(state, processedWordArray) {
    processedWordArray.forEach(wordData => {
      state.words[wordData.hanzi] = wordData;
    })
  },
  storeCharacterData(state, processedCharacterArray) {
    processedCharacterArray.forEach(characterData => {
      state.characters[characterData.character] = characterData;
    })
  },
  setExercises(state, exercises) {
    exercises.forEach(x => state.exercises.push(x));
  }
}

function processWord(wordData) {
  let processed = {};

  processed.hanzi = wordData.hanzi;
  processed.characters = wordData.characters.map(processCharacter);
  processed.pinyin = wordData.pinyinAccent;
  processed.sentences = wordData.sentences;
  processed.definition = wordData.definition;
  processed.audioFile = wordData.audioFile;

  processed.tone = wordData.pinyinNumber.map(x => Number(x.slice(-1)));

  processed.characters.forEach((x,i) => x.tone = processed.tone[i]);

  return processed
}

function processCharacter(characterData) {
  let processed = {};
  
  processed.character = characterData.character;
  //processed.pinyin = characterData.pinyinAccent;
  //processed.definition = characterData.definition;
  processed.sentences = characterData.sentences;

 // processed.tone = characterData.pinyinNumber.slice(-1);
  
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
  downloadCharacterData({ commit }, { words, type, callback }) {
    console.log("DOWNLOAD DATA");

    let parameters = { 
      'words': [].concat(words).join(','),
      'type': type || 'simplified'
    }
    console.log(type);
    Vue.http.get('http://192.168.0.19:3001', { params: parameters }).then(response => {
      console.log("RESPONSE");
      let processedWords = response.body.map(processWord);
      commit('storeWordData', processedWords);

     /* let processedCharacters = response.body.map(processCharacter);

      commit('storeCharacterData', processedCharacters);*/

      if(callback != undefined) callback();
    }, response => {
      // error callback
    });
  },
  
  initExercises({ state, commit, dispatch }, { type, callback }) {
    let words = state.learnQueue.slice(0, 10);
    console.log(JSON.stringify(words));
    console.log("INIT EXERCISES");
    dispatch('downloadCharacterData', {
      'type': type,
      'words': words,
      'callback': () => {
        commit('setExercises', words);

        console.log(JSON.stringify(state.words))

        if (callback) callback(state.exercises);
      }
    })
    /*if (state.exercises.length === 0) {

    }
    state.learnQueue.slice(0, 2);*/
  }
}

export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
