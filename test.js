import { equal } from 'assert';
import tokens    from './tokens.json';

import api           from './api';
import getAllTweets  from './get-twitter-all-tweets';

it('should fetch tweets count', (done)=> {
  api.usersShow(tokens, { screen_name: 'largescalejs_ru' }).then((info)=> {
    equal(info.statuses_count, 37);
    done();
  });
});

it('should fetch all 37 tweets for @largescalejs_ru', (done)=> {
  api.usersShow(tokens, { screen_name: 'largescalejs_ru' }).then((info)=> {
    getAllTweets(tokens, 'largescalejs_ru').then((tweets)=> {
      equal(tweets.items.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});

it('should fetch all 1600+ tweets for @andrestaltz', (done)=> {
  api.usersShow(tokens, { screen_name: 'andrestaltz' }).then((info)=> {
    getAllTweets(tokens, 'andrestaltz').then((tweets)=> {
      equal(tweets.items.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});

it('should fetch all 1900+ tweets for @Rygu', (done)=> {
  api.usersShow(tokens, { screen_name: 'Rygu' }).then((info)=> {
    getAllTweets(tokens, 'Rygu').then((tweets)=> {
      equal(tweets.items.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});

it('should fetch all 2400+ tweets for @jsunderhood', (done)=> {
  api.usersShow(tokens, { screen_name: 'jsunderhood' }).then((info)=> {
    getAllTweets(tokens, 'jsunderhood').then((tweets)=> {
      equal(tweets.items.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});
