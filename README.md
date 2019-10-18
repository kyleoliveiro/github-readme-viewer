# Github Readme Viewer

![Travis (.com)](https://img.shields.io/travis/com/kyleoliveiro/github-readme-viewer?style=for-the-badge) ![David](https://img.shields.io/david/kyleoliveiro/github-readme-viewer?style=for-the-badge) ![David](https://img.shields.io/david/dev/kyleoliveiro/github-readme-viewer?style=for-the-badge)

> **Note:** This application only makes unauthenticated calls to the Github API, so it is prone to aggressive [rate limiting](https://developer.github.com/v3/#rate-limiting).

## Live demo
[**https://github-readme-viewer.surge.sh**](https://github-readme-viewer.surge.sh)

## Getting started
**Requirements**
- \>= Node 10
- yarn

**To get the project running locally:**

1. Clone this repository
```bash
$ git clone git@github.com:kyleoliveiro/github-readme-viewer.git
$ cd github-readme-viewer
```

2. Install project dependencies
```bash
$ yarn
```

3. Serve the project
```bash
$ yarn serve
```

## Generating a production build
Run `yarn build` to generate a production build.
