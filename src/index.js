import Promise  from 'bluebird';
import bignum   from 'bignum';
import api      from './api';
import assign   from 'object-assign';

const last = (arr)=> arr[arr.length - 1];
const getMaxId = (items)=> bignum(last(items).id_str).sub('1').toString(10);
const _options = { trim_user: false, count: 200, include_rts: true, exclude_replies: false };

const setTimeline = (tokens, info, storage, options, resolved, timeline)=> {
  storage.items = storage.items.concat(timeline);
  if (storage.items.length + storage.missed === info.statuses_count) {
    return resolved(storage);
  }
  storage.missed += options.count - timeline.length;
  return api.statusesUserTimeline(tokens, assign(options, {
    max_id: getMaxId(storage.items)
  })).then(setTimeline.bind(this, tokens, info, storage, options, resolved));
};

export default(tokens, screen_name)=> {
  const options = assign({screen_name}, _options);
  const storage = { items: [], missed: 0 };
  return api.usersShow(tokens, options).then((info)=> {
    return new Promise((resolved, reject)=> {
      return api.statusesUserTimeline(tokens, options)
        .then(setTimeline.bind(this, tokens, info, storage, options, resolved));
    });
  });
};
