# Gaggle
An informative resource for discovering and looking up collective nouns

## Hello world
Gaggle's hello world is (hopefully) very simple. Basic system dependencies are:
- Node/npm
- SASS
- Grunt CLI

After you have those installed, just do:

`$npm install`

`$grunt`

Pass a `--watch` parameter (looks like: `$grunt --watch`) to continuously compile files as you change your files.

This project was built to run solely in the browser, so no need for any server-side setup unless you want to...?

## Grunt Commands
Grunt has several tasks set up if you don't want to re-compile everything at once:

- `$grunt`: compiles all assets as described by each asset type below. Pass `--watch` to continuously compile all files as you change them.
- `$grunt css`: compiles sass to css using `assets/in/sass/index.scss` as the entry point. Pass `--watch` to continuously compile *only* your css as you change sass files.
- `$grunt svg`: compiles all svg files in `assets/in/svg` into an svg sprite in `assets/out/svg`. Pass `--watch` to continuously compile *only* your svg files.
- `$grunt js`: transpiles your react code and its dependencies into one browser-readable ES5 bundle using `assets/in/js/index.jsx` as the entry point. Pass `--watch` to continuously compile *only* your js files.

## JS
The application functionality runs off of ReactJS using a Flux-y architecture. [More here](https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture).

## Sass
The Sass files are a port of [Shoelace](https://github.com/joshdcomp/shoelace). The docs have more up-to-date information than I can give here.

## SVGs
The SVGs compile into an SVG sprite so they can be used via [this technique](https://css-tricks.com/svg-sprites-use-better-icon-fonts/).
