import Twitter from 'twitter';
import bignum  from 'bn.js';
import { last, concat, contains, propEq, slice, findIndex } from 'ramda';

function accumulate(client, options, target, cb, tweets) {
  const isTarget = propEq('id_str', target);
  client.get('/statuses/user_timeline.json', options, (err, res) => {
    if (err) throw new err;
    if (res.length === 0) {
      return cb(new Error('Target tweet is too far a way'));
    }
    tweets = concat(tweets, res);
    if (contains(isTarget, tweets)) {
      return cb(null, slice(0, findIndex(isTarget, tweets) + 1, tweets));
    }
    accumulate(client, options, target, cb, tweets);
  });
}

export default function getTweets(tokens, screen_name, target, cb) {
  const client = new Twitter(tokens);
  const options = {
    screen_name,
    trim_user: true,
    count: 200,
    include_rts: true,
    exclude_replies: false
  };
  accumulate(client, options, target, cb, []);
};

/*
const getMaxId = (items) => (new bignum(last(items).id_str).sub(new bignum('1'))).toString();
const _options = { trim_user: true, count: 200, include_rts: true, exclude_replies: false };

const setTimeline = (client, resolve, target, info, items, missed, options, timeline)=> {
  client.get('/statuses/user_timeline.json', options, (err, res, raw)=> {
    if (err) throw new Error(`Code ${err[0].code}. ${err[0].message}`);
    setTimeline(client, resolve, target, info, [], 0, options, res);
  });

  items = items.concat(timeline);


  // if (!target && (items.length + missed === info.statuses_count)) {
    // return resolve(undefined, items, missed, info);
  // }

  if (target && items.find(i => i.id_str === target)) {
    const number = items.findIndex(i => i.id_str === target) + 1;
    return resolve(undefined, items.splice(0, number), missed, info);
  }

  if (target && (items.length + missed > 3200)) {
    return resolve(new Error(`Target tweet is too far a way`));
  }

  // missed += options.count - timeline.length;

  // client.get('/statuses/user_timeline.json', assign({}, options, { max_id: getMaxId(items) }), (err, res, raw)=> {
    // if (err) throw new Error(`Code ${err[0].code}. ${err[0].message}`);
    // setTimeline(client, resolve, target, info, items, missed, options, res);
  // });
};

export default(tokens, screen_name, target, resolve)=> {
  const client = new Twitter(tokens);
  const options = assign({ screen_name }, _options);

  setTimeline(client, resolve, target, info, [], 0, options, res);
  client.get('/statuses/user_timeline.json', options, (err, res, raw)=> {
    if (err) throw new Error(`Code ${err[0].code}. ${err[0].message}`);

  });
};
*/
