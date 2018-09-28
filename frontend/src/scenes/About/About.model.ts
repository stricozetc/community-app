import { History } from 'history';
import { match } from 'react-router';

import {
    AuthStatus
} from 'models';

export interface Author {
    name: string;
    picture: string;
}

export interface AboutProps {
    children?: JSX.Element;
    history: History;
    match: match<string>;
    authStatus: AuthStatus;
}
