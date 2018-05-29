
import { Component, h } from 'preact';
import { RootViewData } from '../view-data';

/** @jsx h */

export default class RootLayout extends Component<RootViewData, any> {
    render(props?: Readonly<RootViewData & preact.Attributes & { children?: (string | number | JSX.Element)[]; ref?: (instance: any) => void; }>): JSX.Element {
        return <html lang={props.locale.lang}>
            <head></head>
            <body>
                {props.children}
            </body>
        </html>;
    }
}
