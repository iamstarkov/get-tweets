import Twitter from 'twitter';
import Promise from 'bluebird';

export default (tokens, options)=> {
  const client = Promise.promisifyAll(new Twitter(tokens));
  return new Promise((resolved, reject)=> {
    client.getAsync('/statuses/user_timeline.json', options).then((res)=> {
      resolved(res[0]);
    });
  });
};
