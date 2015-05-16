import Promise from 'bluebird';
import bignum        from 'bignum';
import tokens        from './tokens.json';
import api           from './api';

const last = (arr)=> arr[arr.length - 1];
const getMaxId = (items)=> bignum(last(items).id_str).sub('1').toString(10);
const _options = { trim_user: false, count: 200, include_rts: true, exclude_replies: false };
const assign = Object.assign.bind(Object);

export default(tokens, screen_name)=> {
  const options = assign({screen_name}, _options);
  var storage = { items: [], missed: 0 };
  return api.usersShow(tokens, options).then((info)=> {
    console.log(`## @${info.screen_name}, ${info.statuses_count}`);
    return new Promise((resolved, reject)=> {
      const setTimeline = (timeline)=> {
        storage.items = storage.items.concat(timeline);
        if (storage.items.length + storage.missed === info.statuses_count) {
          return resolved(storage);
        }
        console.log(`${storage.items.length + storage.missed}`);
        storage.missed += options.count - timeline.length;
        return api.statusesUserTimeline(tokens, assign(options, { max_id: getMaxId(storage.items) })).then(setTimeline);
      };
      return api.statusesUserTimeline(tokens, options).then(setTimeline);
    });
  });
};
