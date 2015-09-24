import { equal } from 'assert';
import { last } from 'ramda';
import getTweets from './index';
import tokens from 'twitter-tokens';

it('should return an error if target tweet is too far a way', (done) => {
  getTweets(tokens, 'jsunderhood', '562972738303037442', (err, res) => {
    equal(err.message, 'Target tweet is too far a way')
    done();
  });
});

it('latest: should return latest tweets incl target one', (done) => {
  getTweets(tokens, 'largescalejs_ru', '424196654758375425', (err, res) => {
    equal('424196654758375425', last(res).id_str);
    done();
  });
});
