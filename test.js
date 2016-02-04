/* eslint-env mocha */

import { equal } from 'assert';
import { last } from 'ramda';
import getTweets from './index';
import tokens from 'twitter-tokens';
import dec from 'bignum-dec';

it('getTweets', done => {
  getTweets(tokens, 'largescalejs_ru', '424119506508980224').then(res => {
    equal(res.length, 36);
    done();
  });
});

it('getTweets including since_id', done => {
  getTweets(tokens, 'largescalejs_ru', dec('424119506508980224')).then(res => {
    equal(res.length, 37);
    equal(last(res).id_str, '424119506508980224');
    done();
  });
});
