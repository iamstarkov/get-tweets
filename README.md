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

getTweets(tokens, 'jsunderhood', '602825789478969344', (err, tweets) => {
  console.log(tweets);
});
```

## API

### getTweets(tokens, username, target, cb)

#### tokens

*Required*  
Type: `Object`

Valid [Twitter developer credentials (tokens)][creds]
in the form of a set of consumer and access tokens/keys.
You can use [twitter-tokens][tokens], to simplify getting tokens.

[creds]: https://apps.twitter.com/
[tokens]: https://www.npmjs.com/package/twitter-tokens

#### username

*Required*  
Type: `String`

Twitter username.

#### target

*Required*  
Type: `String`

Target tweet which, will indicate that you get enough latest tweets.
This tweet will be included into response.

#### cb(err, tweets)

*Required*  
Type: `Function`

Callback for you.

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
