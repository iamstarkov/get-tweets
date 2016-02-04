# get-tweets

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> Get latest tweets

## Install

    npm install --save get-tweets

## Usage

```js
import getTweets from 'get-tweets';
import tokens from 'twitter-tokens';

getTweets(tokens, 'largescalejs_ru', '424119506508980224').then(tweets => {
  console.log(tweets);
});
```

## API

### getTweets(tokens, username, sinceId)

Return a promise that resolves to tweets.

#### tokens

*Required*  
Type: `Object`

Valid [Twitter developer credentials (tokens)][how-to-get]
in the form of a set of consumer and access tokens/keys.
You can use [twitter-tokens][tokens], to simplify getting tokens.

[how-to-get]: https://iamstarkov.com/get-twitter-tokens/
[tokens]: https://www.npmjs.com/package/twitter-tokens

#### username

*Required*  
Type: `String`

Twitter username.

#### sinceId

*Required*  
Type: `String`

`id_str` of tweet since which you want to get latest tweets. Result array will not contain this tweet. If you want it to contain that tweet use _[bignum-dec][dec]_: `getMentions(tokens, bignumDec(tweet.id_str), cb);`. See [tests][tests] for details.

> Return results with an ID greater than (that is, more recent than) the specified ID. There are limits to the number of Tweets which can be accessed through the API. If the limit of Tweets has occured since the `since_id`, the `since_id` will be forced to the oldest ID available.  
> — [Twitter API `statuses/user_timeline`][user_timeline]

[tests]: https://github.com/iamstarkov/get-tweets/blob/master/test.js
[dec]: https://github.com/iamstarkov/bignum-dec
[user_timeline]: https://dev.twitter.com/rest/reference/get/statuses/user_timeline

## License

MIT © [Vladimir Starkov](https://iamstarkov.com/)

[npm-url]: https://npmjs.org/package/get-tweets
[npm-image]: https://img.shields.io/npm/v/get-tweets.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/get-tweets
[travis-image]: https://img.shields.io/travis/iamstarkov/get-tweets.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/iamstarkov/get-tweets
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/get-tweets.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/get-tweets
[depstat-image]: https://img.shields.io/david/iamstarkov/get-tweets.svg?style=flat-square
