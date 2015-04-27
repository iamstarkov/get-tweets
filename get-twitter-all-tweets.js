import Promise from 'bluebird';
import tokens        from './tokens.json';
import getTimeline   from './get-twitter-timeline';

const last = (arr)=> arr[arr.length - 1];

export default(tokens, options)=> {
  var items = [];

  return new Promise((resolved, reject)=> {
    const setTimeline = (res)=> {
      var timeline = res[0];
      items = items.concat(timeline);

      if (timeline.length === options.count) {
        items.pop();
        const nextOptions = Object.assign(options, { max_id: last(timeline).id_str });
        return getTimeline(tokens, nextOptions).then(setTimeline);
      } else {
        resolved(items);
      }
    };

    return getTimeline(tokens, options).then(setTimeline);
  })
};
