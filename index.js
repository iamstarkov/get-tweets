import Twitter from 'twitter';

import Promise from 'bluebird';
import { info as log } from 'npmlog';
import keys    from './keys.json';

const last = (arr)=> arr[arr.length - 1];

const client = Promise.promisifyAll(new Twitter(keys));
const getInfo = (options)=> client.getAsync('/users/show.json', options);
const getTimeline = (options) => {
  const defaultOptions = { include_rts: true, trim_user: true, count: 200 };
  const resultOptions = Object.assign(defaultOptions, options);
  return client.getAsync('/statuses/user_timeline.json', resultOptions);
};

// Timelines
var count = 0;
var items = [];
getInfo({ screen_name: 'iamstarkov' }).then((res)=> {
  count = res[0].statuses_count;
  log(`Tweets count: ${count}`);

  const setTimeline = (res)=> {
    items = items.concat(res[0]);
    const lastOne = last(items);

    log(`${items.length} / ${lastOne.created_at}`);
    if (items.length < count && items.length < 3200) {
      getTimeline({ screen_name: 'iamstarkov', max_id: lastOne.id_str }).then(setTimeline);
    }
  }

  getTimeline({ screen_name: 'iamstarkov' }).then(setTimeline);
});
