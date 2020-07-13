# BBC ID Finder

Test library for the bookmarklet code. Will attempt to extract a BBC id from BBC pages

## Page support

* Castaway
* iBroadcast 2
* iSite
* Optimo
* all the other ones...

## install

```bash
yarn add @bbc/bbc-id-finder
```

## Usage

(this is not really published!)

```javascript
import getId '@bbc/bbc-id-finder';

const { type, value } = await getId('hostname', 'pathname', 'html' bbcpage)
```

## Development

## install dependencies

```bash
yarn install
```

## test

```bash
yarn test
```
