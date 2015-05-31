import { equal, throws } from 'assert';
import getTweets from './';

const tokens = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const check = (done)=> (err, tweets, missed, info)=> {
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

it('should return an error if account have a lot of tweets', (done)=> {
  getTweets(tokens, 'jsunderhood', (err, res)=> {
    equal(err.message, '@jsunderhood has over the 3200 tweets limit')
    done();
  });
});

it('latest: should return latest tweets incl target one', (done)=> {
  getTweets(tokens, 'jsunderhood', '602825789478969344', (err, tweets)=> {
    equal('602825789478969344', tweets[tweets.length - 1].id_str);
    done();
  });
});

it('latest: should return error if target tweet is too far a way', (done)=> {
  getTweets(tokens, 'jsunderhood', '562519903249649665', (err)=> {
    equal(err.message, 'Target tweet is too far a way');
    done();
  });
});
