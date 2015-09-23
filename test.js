import { equal } from 'assert';
import getTweets from './';
import tokens from 'twitter-tokens';

it('should return an error if desired tweet is too far a way', (done) => {
  getTweets(tokens, 'jsunderhood', '562972738303037442', (err, res) => {
    equal(err.message, 'desired tweet is far a way from 3200 tweets limit')
    done();
  });
});

it('latest: should return latest tweets incl target one', (done)=> {
  getTweets(tokens, 'largescaleJS_ru', '424196654758375425', (err, res) => {
    equal('424196654758375425', tweets[tweets.length - 1].id_str);
    done();
  });
});
