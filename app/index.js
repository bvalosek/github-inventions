const express = require('express');
const consolidate = require('consolidate');
const path = require('path');
const Github = require('github-api');

require('dotenv').load({ silent: true });

const need = ['TOKEN', 'NAME', 'EMPLOYER', 'ROOT', 'USER', 'WEBSITE'];
need.forEach(v => {
  if (!process.env[v]) {
    throw new Error(`must set ${v}`);
  }
});

const github = new Github({
  token: process.env.TOKEN,
  auth: 'oauth'
});

const opts = {
  visbility: 'public',
  sort: 'created'
};

// express app
const app = express();
app.set('views', path.join(__dirname, './views'));
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');

// serve index
app.get(process.env.ROOT, (req, res) => {

  github.getUser().repos(opts, (err, repos) => {

    if (err) {
      return res.status(404).send('problem getting repos');
    }

    res.render('index', {
      year: new Date().getFullYear(),
      date: new Date().toString(),
      repos: repos,
      website: process.env.WEBSITE,
      user: process.env.USER,
      root: process.env.ROOT,
      name: process.env.NAME,
      employer: process.env.EMPLOYER,
      version: require('../package.json').version
    });

  });
});

app.get('/', (req, res) => res.redirect(process.env.ROOT));

// boot
const port = process.env.PORT || 8000;
app.listen(port, err => {
  if (!err) {
    console.log('listening on', port);
  }
});

