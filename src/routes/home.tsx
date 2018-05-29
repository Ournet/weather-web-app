import { Router, Request, Response, NextFunction } from 'express';
import { sendResponse } from '../renderer';
import RootLayout from '../components/root-layout';
import { getViewData } from '../view-data';
import { h } from 'preact';

/** @jsx h */

const route: Router = Router();

export default route;

//index
route.get('/', function (_req: Request, res: Response, _next: NextFunction) {
    sendResponse(res, <RootLayout {...getViewData(res)}>Aici</RootLayout>);
});
