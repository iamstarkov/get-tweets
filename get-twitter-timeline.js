import Twitter from 'twitter';
import Promise from 'bluebird';

export default (tokens, apiOptions)=> {
  const client = Promise.promisifyAll(new Twitter(tokens));
  return client.getAsync('/statuses/user_timeline.json', apiOptions);
};
