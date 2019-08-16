# Hangman

## Support

[![Buy Me A Coffee](docs/img/buymeacoffee.png)](https://www.buymeacoffee.com/HEazcCDFS)

## Description

A simple hangman application built with [vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/), [electron-store](https://github.com/sindresorhus/electron-store), [vue-i18n](https://kazupon.github.io/vue-i18n/) and [chota CSS framework](https://jenil.github.io/chota/)

## Quickstart

### Install

```shell
$ npm install
```

### Run in dev

```shell
$ npm run electron:serve
```

### Build Linux (AppImage)

```shell
$ npm run electron:build
```

### Build Windows (exe) on Linux platform

/!\ you need to install [Docker](https://docs.docker.com/install/) first

```shell
$ chmod +x run_wine.sh
$ ./run_wine.sh
$ npm install
$ npm run electron:build-win
```

If you are on another platform than Linux, check the [docs](https://github.com/electron-userland/electron-builder)