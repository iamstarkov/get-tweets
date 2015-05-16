import Twitter from 'twitter';
import Promise from 'bluebird';

const getClient = (tokens)=> Promise.promisifyAll(new Twitter(tokens));

const usersShow = (tokens, options)=>
  new Promise((resolved, reject)=>
    getClient(tokens).getAsync('/users/show.json', options)
      .then(res => resolved(res[0]))
  );

const statusesUserTimeline = (tokens, options)=>
  new Promise((resolved, reject)=>
    getClient(tokens).getAsync('/statuses/user_timeline.json', options)
      .then(res => resolved(res[0]))
  );

export default { usersShow, statusesUserTimeline };
