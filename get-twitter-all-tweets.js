import Promise from 'bluebird';
import tokens        from './tokens.json';

import api           from './api';

import getTimeline   from './get-twitter-timeline';
import bignum        from 'bignum';

const last = (arr)=> arr[arr.length - 1];
const getMaxId = (items)=> bignum(last(items).id_str).sub('1').toString(10);
const _options = { trim_user: false, count: 200, include_rts: true, exclude_replies: false };

export default(tokens, screen_name)=> {
  const options = Object.assign({screen_name}, _options);
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
        return getTimeline(tokens, Object.assign(options, { max_id: getMaxId(storage.items) })).then(setTimeline);
      };

      return getTimeline(tokens, options).then(setTimeline);
    });
  });
};
