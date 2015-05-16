import { equal } from 'assert';
import api       from './api';
import getTweets from './index';

const tokens = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

it('should fetch tweets count', (done)=> {
  api.usersShow(tokens, { screen_name: 'largescalejs_ru' }).then((info)=> {
    equal(info.statuses_count, 37);
    done();
  });
});

it('should fetch all 37 tweets for @largescalejs_ru', (done)=> {
  api.usersShow(tokens, { screen_name: 'largescalejs_ru' }).then((info)=> {
    getTweets(tokens, 'largescalejs_ru').then((tweets)=> {
      equal(tweets.items.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});

it('should fetch all 1600+ tweets for @andrestaltz', (done)=> {
  api.usersShow(tokens, { screen_name: 'andrestaltz' }).then((info)=> {
    getTweets(tokens, 'andrestaltz').then((tweets)=> {
      equal(tweets.items.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});

it('should fetch all 1900+ tweets for @Rygu', (done)=> {
  api.usersShow(tokens, { screen_name: 'Rygu' }).then((info)=> {
    getTweets(tokens, 'Rygu').then((tweets)=> {
      equal(tweets.items.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});

it('should fetch all 2400+ tweets for @jsunderhood', (done)=> {
  api.usersShow(tokens, { screen_name: 'jsunderhood' }).then((info)=> {
    getTweets(tokens, 'jsunderhood').then((tweets)=> {
      equal(tweets.items.length + tweets.missed, info.statuses_count);
      done();
    });
  });
});
