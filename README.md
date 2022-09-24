# My Talismans for Monster Hunter Rise Sunbreak

[![Latest Release](https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/badges/release.svg)](https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/releases)
[![pipeline status](https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/badges/main/pipeline.svg)](https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/commits/main)
[![coverage](https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/badges/main/coverage.svg?job=test-jest)](https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/tree/main)

This repository generates [Talismans Manager](https://sparda-of-nosgoth.gitlab.io/my-talismans-for-monster-hunter-rise-sunbreak).

## Usage
A tool for Monster Hunter Rise, and his expansion Sunbreak, you can use it to :

- manage your talismans, and mark them has favorite or to melt.
- export talisman for use it into others app.
- import talismans  from other Monster Hunter tools.

For now, the application is only in French, English will be available later.

## Installation
### Install [Quasar CLI](https://quasar.dev/start/quasar-cli)
```bash
yarn global add @quasar/cli
```

Under Windows, modify user's `PATH` environment variable to add Yarn global install location.

### Install the dependencies
```bash
yarn install
```

### Start the app in development mode
```bash
yarn dev
```

### Tests
```bash
yarn test:unit
```
```bash
yarn test:unit:ui # use Majestic UI
```
```bash
yarn test:unit:coverage # generate coverage report
```

### Lint the files
```bash
yarn lint
```
```bash
yarn lint:fix # to fix lint errors
```

### Build the app for production
```bash
yarn build
```
```bash
yarn build:debug # for debugging purpose
```

## Sources
- [Material Icons](https://fonts.google.com/icons)

## Support
If you encounter a bug, or had a problem with the tool, do not hesitate to send a mail, or open an [issue](https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/issues), to discuss or solve it.

## Contributing
If you want to contribute to this project, please feel free to open an [issue](https://gitlab.com/sparda-of-nosgoth/my-talismans-for-monster-hunter-rise-sunbreak/-/issues) or directly submit a merge request.

## Licence
[MIT](./LICENCE)
