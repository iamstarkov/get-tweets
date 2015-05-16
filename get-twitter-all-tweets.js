import Promise from 'bluebird';
import tokens        from './tokens.json';
import getInfo       from './get-twitter-info';
import getTimeline   from './get-twitter-timeline';
import bignum        from 'bignum';

const last = (arr)=> arr[arr.length - 1];

export default(tokens, options)=> {
  var items = [];
  var missed = 0;
  return getInfo(tokens, options)
    .then((info)=> {
      console.log(`## @${info.screen_name}, ${info.statuses_count}`);
      return new Promise((resolved, reject)=> {
        const setTimeline = (timeline)=> {
          items = items.concat(timeline);

          if (items.length + missed !== info.statuses_count) {
            console.log(`${items.length + missed}`);
            missed += options.count - timeline.length;
            return getTimeline(tokens, Object.assign(options, {
              max_id: bignum(last(items).id_str).sub('1').toString(10)
            })).then(setTimeline);
          }

          resolved({ missed: missed, list: items });
        };

        return getTimeline(tokens, options).then(setTimeline);
      });
    });
};
