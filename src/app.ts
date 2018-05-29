require('dotenv').config();

import * as express from 'express';
import config from './config';
import logger from './logger';
import * as path from 'path';
const bodyParser = require('body-parser');
import links from './links';
import initi18n from './i18n';
import catchError from './catch';
import rootMiddleware from './middlewares/root';
import defaultMiddleware from './middlewares/default';
import homeRoute from './routes/home';
import redirectRoute from './routes/redirect';
import articlesRoute from './routes/articles';
import narbutasRoute from './routes/narbutas';
import shopRoute from './routes/shop';
import actionsRoute from './routes/actions';
import cartRoute from './routes/cart';
import invoicesRoute from './routes/invoices';
import assets from './assets';
import { Response } from 'express';
import * as session from 'express-session';
import boot from './boot';
const ms = require('ms');
const cookieParser = require('cookie-parser');

// const cors = require('cors');
const isProduction = process.env.NODE_ENV === 'production';

boot().then(() => startApp());

function startApp() {

    const app = express();

    if (isProduction) {
        app.set('trust proxy', true);
    }

    app.disable('x-powered-by');
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../views'));
    app.disable('etag');

    app.locals.NODE_ENV = process.env.NODE_ENV;
    app.locals.links = links;
    app.locals.config = config;
    app.locals.assets = assets;

    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));
    app.use(cookieParser());
    // app.use(methodOverride());
    // app.use(responseTime());
    app.use(express.static(path.join(__dirname, '../public'), {
        maxAge: isProduction ? ms('10d') : 0
    }));

    app.use(redirectRoute);

    app.use(initi18n);
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {}
    }));

    app.use(rootMiddleware);

    app.use(invoicesRoute);

    app.use(defaultMiddleware);

    app.use(homeRoute);
    app.use(articlesRoute);
    app.use(shopRoute);
    app.use(actionsRoute);
    app.use(cartRoute);

    app.use(narbutasRoute);

    app.use(function (error: any, req: any, res: Response, _next: any) {
        catchError(req, res, error);
    });

    app.all('*', function (req, res) {
        var error: any = new Error('Page not found');
        error.statusCode = 404;
        catchError(req, res, error);
    });

    app.listen(process.env.PORT, () => {
        logger.warn('Listening at %s', process.env.PORT);
    });
}

process.on('unhandledRejection', function (error: Error) {
    logger.error('unhandledRejection: ' + error.message, error);
});

process.on('uncaughtException', function (error: Error) {
    logger.error('uncaughtException: ' + error.message, error);
});
