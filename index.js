import Twitter  from 'twitter';
import bignum   from 'bn.js';
import assign   from 'object-assign';

const last = (arr)=> arr[arr.length - 1];
const getMaxId = (items)=> (new bignum(last(items).id_str).sub(new bignum('1'))).toString();
const _options = { trim_user: true, count: 200, include_rts: true, exclude_replies: false };

const setTimeline = (client, resolve, target, info, items, missed, options, timeline)=> {
  items = items.concat(timeline);

  if (!target && (items.length + missed === info.statuses_count)) {
    return resolve(undefined, items, missed, info);
  }

  if (target && items.find(i => i.id_str === target)) {
    const number = items.findIndex(i => i.id_str === target) + 1;
    return resolve(undefined, items.splice(0, number), missed, info);
  }

  if (target && (items.length + missed > 3200)) {
    return resolve(new Error(`Target tweet is too far a way`));
  }

  missed += options.count - timeline.length;

  client.get('/statuses/user_timeline.json', assign({}, options, { max_id: getMaxId(items) }), (err, res, raw)=> {
    if (err) throw new Error(`Code ${err[0].code}. ${err[0].message}`);
    setTimeline(client, resolve, target, info, items, missed, options, res);
  });
};

export default(tokens, screen_name, ...args)=> {
  const resolve = last(args);
  const target = (args.length === 2) && args[0];
  const client = new Twitter(tokens);
  const options = assign({screen_name}, _options);

  client.get('/users/show.json', options, (err, info, raw)=> {
    if (err) throw new Error(`Code ${err[0].code}. ${err[0].message}`);

    if (!target && (info.statuses_count > 3200)) {
      return resolve(new Error(`@${screen_name} has over the 3200 tweets limit`));
    }

    client.get('/statuses/user_timeline.json', options, (err, res, raw)=> {
      if (err) throw new Error(`Code ${err[0].code}. ${err[0].message}`);
      setTimeline(client, resolve, target, info, [], 0, options, res);
    });
  });
};
