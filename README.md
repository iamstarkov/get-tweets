# get-tweets

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Get all tweets for target username

## Install

    npm install --save get-tweets

## Usage

You will need valid [Twitter developer credentials (tokens)][tokens]
in the form of a set of consumer and access tokens/keys. Do not forgot
to adjust your permissions - most POST request require write permissions.

[tokens]: https://apps.twitter.com/

```js
var getTweets = require('get-tweets');
var tokens = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};
```

## Get all tweets

get-tweets will try to fetch all tweets from the account and will return it
or error, if account have more than 3200 tweets.

```js
getTweets(tokens, 'andrestaltz', function(err, tweets) {
  console.log(tweets);
});
```

## License

MIT © [Vladimir Starkov](https://iamstarkov.com/)

[npm-url]: https://npmjs.org/package/get-tweets
[npm-image]: https://img.shields.io/npm/v/get-tweets.svg

[travis-url]: https://travis-ci.org/iamstarkov/get-tweets
[travis-image]: https://img.shields.io/travis/iamstarkov/get-tweets.svg

[coveralls-url]: https://coveralls.io/r/iamstarkov/get-tweets
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/get-tweets.svg

[depstat-url]: https://david-dm.org/iamstarkov/get-tweets
[depstat-image]: https://david-dm.org/iamstarkov/get-tweets.svg

[depstat-dev-url]: https://david-dm.org/iamstarkov/get-tweets
[depstat-dev-image]: https://david-dm.org/iamstarkov/get-tweets/dev-status.svg
