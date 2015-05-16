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

it('should fetch all 1600+ tweets for @andrestaltz', (done)=> {
  getInfo(tokens, { screen_name: 'andrestaltz' }).then((res) => {
    var info = res[0];
    const options = { screen_name: 'andrestaltz', trim_user: true, count: 200, include_rts: 1, exclude_replies: 0 };
    getAllTweets(tokens, options).then((tweets)=> {
      equal(tweets.list.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});

it('should fetch all 1900+ tweets for @Rygu', (done)=> {
  getInfo(tokens, { screen_name: 'Rygu' }).then((res) => {
    var info = res[0];
    const options = { screen_name: 'Rygu', trim_user: false, count: 200, include_rts: true, exclude_replies: false, contributor_details: true };
    getAllTweets(tokens, options).then((tweets)=> {
      equal(tweets.list.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});

it('should fetch all 2400+ tweets for @jsunderhood', (done)=> {
  getInfo(tokens, { screen_name: 'jsunderhood' }).then((res) => {
    var info = res[0];
    const options = { screen_name: 'jsunderhood', trim_user: true, count: 200, include_rts: 1, exclude_replies: 0 };
    getAllTweets(tokens, options).then((tweets)=> {
      equal(tweets.list.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});
