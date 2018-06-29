import * as React from 'react';
import { connect } from 'react-redux';

import { AuthStatus } from 'models';
import { AppState, LogoutUser } from 'store';

import { BattleRegistration } from '../BattleRegistration';
import { StatisticProps } from './Statistic.model';

import { CaNavbar } from './../Navbar';

import { CaLogo } from './../Logo/Logo';

import Button from '@material-ui/core/Button';
import './Statistic.scss';

class CaStatisticPageComponent extends React.Component<StatisticProps> {
    public componentDidMount(): void {
        if (this.props.status === AuthStatus.NOT_AUTHORIZED) {
            this.props.history.push('/login');
        }
    }

    public logoutUser(): void {
        this.props.logoutUser();
        this.props.history.push('/');
    }

    public render(): JSX.Element {
        return (
            <div className="ca-statistic">
                <div className="ca-statistic__container-for-nav">
                    <CaNavbar
                        modificators={['ca-navbar--margin-left']}
                        linksToRender={[
                            {
                                text: 'Battles',
                                to: '/battles',
                                activeClassName: 'ca-navbar__nav-item--active'
                            },
                            {
                                text: 'Statistics',
                                to: '/statistics',
                                activeClassName: 'ca-navbar__nav-item--active'
                            }
                        ]}
                    >
                        <CaLogo
                            text="battlenet"
                            modificators={[
                                'ca-logo--orange',
                                'ca-logo--uppercase',
                                'ca-logo--big-font',
                                'ca-logo--font-weight-600'
                            ]}
                        />
                        <div className="ca-navbar__logout-btn-container">
                            <Button
                                variant="contained"
                                onClick={() => this.logoutUser()}
                            >
                                Logout
                            </Button>
                        </div>
                    </CaNavbar>
                </div>
                <div className="ca-container">
                    <BattleRegistration />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    status: state.auth.status
});

const mapDispatchToProps = (dispatch: any) => ({
    logoutUser: () => dispatch(new LogoutUser())
});

export const CaStatisticPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(CaStatisticPageComponent);
