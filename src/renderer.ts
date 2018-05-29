
import { render as renderToString } from 'preact-render-to-string';
import { VNode } from 'preact';
import { RootViewData } from './view-data';
import { Response } from 'express';

export function render<P extends RootViewData>(Page: VNode<P>): string {
    const html = renderToString(Page);
    return `<!DOCTYPE html><html><body>${html}</body></html>`;
}

export function sendResponse<P extends RootViewData>(res: Response, page: VNode<P>) {
    res.send(render(page));
}
