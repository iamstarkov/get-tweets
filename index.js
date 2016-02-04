import Twitter from 'twit';
import dec from 'bignum-dec';
import { merge, pipe, prop, last, concat, isEmpty } from 'ramda';

const defaults = {
  count: 200,
  trim_user: true,
  include_rts: true,
  exclude_replies: false,
};

const getNextOptions = (options, tweets) =>
  (isEmpty(tweets))
    ? options
    : merge(options, { max_id: pipe(last, prop('id_str'), dec)(tweets) });

function accumulate(get, options, tweets) {
  const nextOptions = getNextOptions(options, tweets);
  return get(nextOptions).then(res => {
    const accumulatedTweets = concat(tweets, res);
    return (isEmpty(res))
      ? accumulatedTweets
      : accumulate(get, nextOptions, accumulatedTweets);
  });
}

export default function getTweets(tokens, username, sinceId) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'statuses/user_timeline');
  const options = merge(defaults, { screen_name: username, since_id: sinceId });
  return accumulate(get, options, []);
};
