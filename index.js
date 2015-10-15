import Twitter from 'twitter';
import assign  from 'object-assign';
import bignum  from 'bn.js';
import { last, concat, propEq, slice, findIndex, isEmpty } from 'ramda';

const options = {
  trim_user: true,
  count: 200,
  include_rts: true,
  exclude_replies: false
};

function bignumDec(i) {
  return (new bignum(i).sub(new bignum('1'))).toString();
}

function getNextTweetsOptions(options, tweets) {
  if (isEmpty(tweets)) return options;
  return assign({}, options, { max_id: bignumDec(last(tweets).id_str) });
}

function accumulate(get, options, lastTweetToGet, tweets, cb) {
  const isTarget = propEq('id_str', lastTweetToGet);
  const findTargetIndex = findIndex(isTarget);
  const nextTweetsOptions = getNextTweetsOptions(options, tweets);
  get(nextTweetsOptions, (err, res) => {
    if (err) throw err;
    if (isEmpty(res)) {
      return cb(new Error('Target tweet is too far away'));
    }
    const accumulatedTweets = concat(tweets, res);
    if (findTargetIndex(accumulatedTweets) !== -1) {
      return cb(null, slice(0, findTargetIndex(accumulatedTweets) + 1, accumulatedTweets));
    }
    return accumulate(get, nextTweetsOptions, lastTweetToGet, accumulatedTweets, cb);
  });
}

export default function getTweets(tokens, username, lastTweetToGet, cb) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, '/statuses/user_timeline.json');
  const optionsWithScreenName = assign({}, { screen_name: username }, options);
  return accumulate(get, optionsWithScreenName, lastTweetToGet, [], cb);
};
