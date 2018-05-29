import { AppConfig } from "./config";
import { Response } from 'express';

export function getViewData<T extends RootViewData>(res: Response): T {
    if (!res.locals.viewData) {
        res.locals.viewData = {};
    }
    return res.locals.viewData as T;
}

export interface RootViewData {
    locale: Locale
    config: AppConfig
    links: any
}

export type Locale = {
    lang: string
    country: string
}
