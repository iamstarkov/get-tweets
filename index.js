import tokens        from './tokens.json';
import getAllTweets   from './get-twitter-all-tweets';

const options = { screen_name: 'largescalejs_ru', trim_user: true, count: 20 };

getAllTweets(tokens, options).then((tweets)=> {
  console.log(`
    count: ${tweets.length}
    first: ${tweets[0].text}
    last:  ${tweets[tweets.length - 1].text}
  `);
});
