import { equal } from 'assert';
import tokens    from './tokens.json';

import getInfo       from './get-twitter-info';
import getTimeline   from './get-twitter-timeline';
import getAllTweets  from './get-twitter-all-tweets';

it('should fetch tweets count', (done)=> {
  getInfo(tokens, { screen_name: 'largescalejs_ru' }).then((res) => {
    var info = res[0];
    equal(info.statuses_count, 37);
    done();
  });
});

it('should fetch 3 recent tweets properly', (done)=> {
  getTimeline(tokens, { screen_name: 'largescalejs_ru', count: 3 }).then((res) => {
    var timeline = res[0];
    equal(timeline.length, 3);
    equal(timeline[0].text, '@iyntx Я думаю поступить иначе http://t.co/NNKMLl9z9c… но пока времени на это нет совсем');
    equal(timeline[1].text, 'Теперь на нашем сайте есть комментарии. Вы знаете, что делать! %) http://t.co/FqHKkzVzwS');
    equal(timeline[2].text, '@iyntx проблема из-за корявого конвертора Epub &gt; PDF. Увы, лучшего не нашли. Если вы найдете — мы будем рады пулл-реквесту');
    done();
  });
});

it('should fetch all tweets', (done)=> {
  const options = { screen_name: 'largescalejs_ru', trim_user: true, count: 20 };
  getAllTweets(tokens, options).then((tweets)=> {
    equal(tweets.length, 37);
    equal(tweets[0].text, `@iyntx Я думаю поступить иначе http://t.co/NNKMLl9z9c… но пока времени на это нет совсем`);
    equal(tweets[tweets.length - 1].text, `Ура! Мы перевели и вычитали первые 5 глав книги Эдди Османи! Добро пожаловать на http://t.co/mvgNd29i9C`);
    done();
  });
});
