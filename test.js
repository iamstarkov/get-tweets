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

it('should fetch all tweets in small account < 200 tweets', (done)=> {
  const options = { screen_name: 'largescalejs_ru', trim_user: true, count: 200, include_rts: 1, exclude_replies: 0 };
  getAllTweets(tokens, options).then((tweets)=> {
    equal(tweets.list.length + tweets.missed, 37);
    done();
  });
});

it('should fetch all 1601 tweets for @andrestaltz', (done)=> {
  const options = { screen_name: 'andrestaltz', trim_user: true, count: 200, include_rts: 1, exclude_replies: 0 };
  getAllTweets(tokens, options).then((tweets)=> {
    equal(tweets.list.length + tweets.missed, 1601);
    done();
  });
});

it('should fetch all 1946 tweets for @Rygu', (done)=> {
  const options = {
    screen_name: 'Rygu',
    trim_user: false,
    count: 200,
    include_rts: true,
    exclude_replies: false,
    contributor_details: true
  };
  getAllTweets(tokens, options).then((tweets)=> {
    equal(tweets.list.length + tweets.missed, 1946);
    equal(tweets.missed, 15);
    done();
  });
});

it('should fetch all 2397 tweets for @jsunderhood', (done)=> {
  const options = { screen_name: 'jsunderhood', trim_user: true, count: 200, include_rts: 1, exclude_replies: 0 };
  getAllTweets(tokens, options).then((tweets)=> {
    equal(tweets.list.length + tweets.missed, 2397);
    done();
  });
});

it('should fetch all 758 tweets for @jhusain', (done)=> {
  const options = { screen_name: 'jhusain', trim_user: true, count: 200, include_rts: 1, exclude_replies: 0 };
  getAllTweets(tokens, options).then((tweets)=> {
    equal(tweets.list.length + tweets.missed, 758);
    done();
  });
});
