# Reddux

A Reddit content reader. Built with React, Redux and Semantic-UI.
See a [live demo](https://reddux.herokuapp.com/).

## OAuth

You'll need to register a developer app with Reddit. [Read about that here](https://github.com/reddit/reddit/wiki/OAuth2#getting-started).
Choose 'web app' for your app type.

 Using the template at `config/env_template`, save your credentials in `.env`.

#### Scope explanations

As a user, the app will ask for access to your reddit account.
Here are the features that use account permissions, by their OAuth scope:

* `read`: get the most popular subreddits
* `mysubreddits`: fetch a list of your subscriptions
* `subscribe`: manage your subscriptions


## Installations

#### Application dependencies

`npm install`

#### Style framework info

This app is using the [Semantic-UI](http://semantic-ui.com/) framework for
consistent styling.

* Globally install [gulp](https://github.com/gulpjs/gulp)
  * `npm install -g gulp`
* Build the source:
  * `npm run build:styles`

There may be an interactive postinstall script, that asks how you want to
customize your build of `semantic-ui`. Just choose the default choices all the
through. If there's a problem, make sure to set the source and output
directories as per the file `semantic.json`, at the project root.

Component definitions & preset themes are committed to source control.
This GitHub [issue](https://github.com/Semantic-Org/Semantic-UI/issues/3620)
recommends it.

##### Semantic-UI docs

Read these to know more:

* [Getting Started](http://semantic-ui.com/introduction/getting-started.html)
* [Theming](http://semantic-ui.com/usage/theming.html)
* [React integration](http://react.semantic-ui.com/)

## Starting, building

### Development

* Bundle application & serve it in-memory:
  * `npm start`
* Visit [http://localhost:8080](http://localhost:8080).

### Production

To locally test a production build:

* Remove all build files
  * `npm run clean`
* Install production dependencies
  * `npm install --production`
* Build style framework, bundle application & output to `public/build`
  * `npm run heroku-postbuild`
* Start app:
  * `NODE_ENV=production npm start`
