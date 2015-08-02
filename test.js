import { equal } from 'assert';
import getTweets from './';
import tokens from 'twitter-tokens';

const check = (done)=> (err, tweets, missed, info)=> {
  equal(tweets.length + missed, info.statuses_count);
  done();
};

it('all: should fetch all 37 tweets for @largescalejs_ru', (done)=> {
  getTweets(tokens, 'largescalejs_ru', check(done));
});

it('all: should fetch all 1600+ tweets for @andrestaltz', (done)=> {
  getTweets(tokens, 'andrestaltz', check(done));
});

it('all: should fetch all 1900+ tweets for @Rygu', (done)=> {
  getTweets(tokens, 'Rygu', check(done));
});

it('all: should return an error if account have a lot of tweets', (done)=> {
  getTweets(tokens, 'jsunderhood', (err, res)=> {
    equal(err.message, '@jsunderhood has over the 3200 tweets limit')
    done();
  });
});

it('latest: should return latest tweets incl target one', (done)=> {
  getTweets(tokens, 'largescaleJS_ru', '424196654758375425', (err, tweets)=> {
    equal('424196654758375425', tweets[tweets.length - 1].id_str);
    done();
  });
});
