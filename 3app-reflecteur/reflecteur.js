var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { queryString } = require('./routers/query-string');
const { formData } = require('./routers/form-data');
const {getHeaders} = require('./routers/headers');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/s", express.static(path.join(__dirname, 'static')));

app.get("/query_string", queryString);
app.post('/form_data', formData) ; 

app.use("/headers", getHeaders);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatValue(value) {
  if (value === undefined || value === null) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value, null, 2);
}

function renderSection(title, value, emptyMessage) {
  const hasContent =
    value !== undefined &&
    value !== null &&
    value !== '' &&
    (!(typeof value === 'object') || Object.keys(value).length > 0);

  const content = hasContent ? formatValue(value) : emptyMessage;

  return `
    <section>
      <h2>${escapeHtml(title)}</h2>
      <pre>${escapeHtml(content)}</pre>
    </section>
  `;
}

app.all('/', (req, res) => {
  const rawQueryString = req.originalUrl.includes('?')
    ? req.originalUrl.split('?').slice(1).join('?')
    : '';

  const hasBody =
    req.body !== undefined &&
    req.body !== null &&
    (!(typeof req.body === 'object') || Object.keys(req.body).length > 0);

  const bodyContent = hasBody ? req.body : '';

  res.type('html').send(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reflecteur HTTP</title>
      </head>
      <body>
        <h1>Informations de la requete</h1>
        ${renderSection('Chaine de requete', rawQueryString, 'Aucune chaine de requete')}
        ${renderSection('Corps de la requete', bodyContent, 'Aucun corps de requete')}
        ${renderSection('En-tetes HTTP', req.headers, 'Aucun en-tete HTTP')}
        ${renderSection('Cookies', req.cookies, 'Aucun cookie')}
      </body>
    </html>
  `);
});

app.use('/*', (req, res) => {
  res.status(404).send("Not Found");
});

module.exports = app;
