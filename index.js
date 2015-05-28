import Twitter  from 'twitter';
import bignum   from 'bignum';
import assign   from 'object-assign';

const last = (arr)=> arr[arr.length - 1];
const getMaxId = (items)=> bignum(last(items).id_str).sub('1').toString(10);
// TODO: setup options to not include account info into every tweet
const _options = { trim_user: false, count: 200, include_rts: true, exclude_replies: false };

const setTimeline = (client, resolve, info, items, missed, options, timeline)=> {
  items = items.concat(timeline);
  if (items.length + missed === info.statuses_count) {
    return resolve(items, missed, info);
  }

  missed += options.count - timeline.length;

  client.get('/statuses/user_timeline.json', assign({}, options, { max_id: getMaxId(items) }), (err, res, raw)=> {
    if (err) return resolve(err);
    setTimeline(client, resolve, info, items, missed, options, res);
  });
};

export default(tokens, screen_name, resolve)=> {
  const client = new Twitter(tokens);
  const options = assign({screen_name}, _options);

  client.get('/users/show.json', options, (err, info, raw)=> {
    if (err) return resolve(err);

    if (info.statuses_count > 3200) {
      return resolve(new Error(`@${screen_name} has over the 3200 tweets limit`));
    }

    client.get('/statuses/user_timeline.json', options, (err, res, raw)=> {
      setTimeline(client, resolve, info, [], 0, options, res);
    });
  });
};
