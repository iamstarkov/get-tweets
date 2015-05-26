import { equal, throws } from 'assert';
import getTweets from './src/';

const tokens = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const check = (done)=> (tweets, missed, info)=> {
  equal(tweets.length + missed, info.statuses_count);
  done();
};

it('should fetch all 37 tweets for @largescalejs_ru', (done)=> {
  getTweets(tokens, 'largescalejs_ru', check(done));
});

it('should fetch all 1600+ tweets for @andrestaltz', (done)=> {
  getTweets(tokens, 'andrestaltz', check(done));
});

it('should fetch all 1900+ tweets for @Rygu', (done)=> {
  getTweets(tokens, 'Rygu', check(done));
});

it.skip('should throw an explanation error', ()=> {
  throws(()=> {
    getTweets(tokens, 'jsunderhood');
  }, /@{screen_name} has over the 3200 tweets limit/);
});
