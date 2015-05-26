import Twitter  from 'twitter';
import bignum   from 'bignum';
import assign   from 'object-assign';

const last = (arr)=> arr[arr.length - 1];
const getMaxId = (items)=> bignum(last(items).id_str).sub('1').toString(10);
const _options = { trim_user: false, count: 200, include_rts: true, exclude_replies: false };

const setTimeline = (client, resolve, info, storage, options, timeline)=> {
  console.log('timeline handler', storage.items.length);
  storage.items = storage.items.concat(timeline);
  console.log({ items: storage.items.length, missed: storage.missed, count: info.statuses_count})
  if (storage.items.length + storage.missed === info.statuses_count) {
    resolve(storage.items, storage.missed);
  }

  storage.missed += options.count - timeline.length;

  client.get('/statuses/user_timeline.json', assign({}, options, { max_id: getMaxId(storage.items) }), (err, res, raw)=> {
    if (err) throw error;
    setTimeline(client, resolve, info, storage, options, res);
  });
};


export default(tokens, screen_name, resolve)=> {
  console.log('inst');
  const client = new Twitter(tokens);
  const options = assign({screen_name}, _options);
  const storage = { items: [], missed: 0 };

  client.get('/users/show.json', options, (err, info, raw)=> {
    if (err) throw error;
    console.log('show');
    client.get('/statuses/user_timeline.json', options, (err, res, raw)=> {
      console.log('first timeline');
      setTimeline(client, resolve, info, storage, options, res);
    });
  });
};
