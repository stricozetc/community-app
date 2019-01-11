import * as React from 'react';

import { ProtectedRouteProps } from './ProtectedRoute.model';
import {
    Redirect,
    Route,
} from 'react-router-dom';

import {
    AuthStatus,
} from 'models';

export class ProtectedRoute extends React.Component<ProtectedRouteProps> {
    public render(): JSX.Element {
        const { status, path, children } = this.props;
        return (
            <Route
                exact={true}
                path={path}
                render={() => (
                    status === AuthStatus.NotAuthorized
                        ? <Redirect to='/login' />
                        : <>
                            {children}
                        </>
                )}
            />
        );
    }
}
