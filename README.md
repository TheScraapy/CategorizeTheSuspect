# CategorizeTheSuspect

<p align="center">
  <a href="https://vuejs.org">
    <img src="https://flat.badgen.net/badge/vue.js/2.5.2/green" alt="Vue.js version">
  </a>
  <a href="https://firebase.google.com">
    <img src="https://flat.badgen.net/badge/firebase/7.6.2/orange" alt="Firebase version">
  </a>
  <a href="https://buefy.com">
    <img src="https://flat.badgen.net/badge/buefy/0.8.9/purple" alt="Buefy version">
  </a>
  <a href="https://github.com/axios/axios">
    <img src="https://flat.badgen.net/badge/axios/0.19.1" alt="Axios version">
  </a>
</p>

A website to guess biometric characteristics of a suspect for use in forensics using [Kairos](https://kairos.com).

## Achitecture

This project is meant to be hosted on [Firebase](https://firebase.google.com) using firebase hosting & firebase authentification.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out [webpack](http://vuejs-templates.github.io/webpack/) and [vue-loader](http://vuejs.github.io/vue-loader) documentations.

## Firebase setup

``` bash
# install firebase-cli
npm i -g firebase-tools

# login into your firebase account
firebase login

# deploy to firebase
firebase deploy

For a detailed explanation on how things work, check out [firebase](https://firebase.google.com/docs/hosting/deploying).
