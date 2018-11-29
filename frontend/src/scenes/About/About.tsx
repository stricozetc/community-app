import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  AppState,
} from 'store';

import {
  AuthStatus,
} from 'models';

import { CaAuthor } from 'components';

import { AboutProps, Author } from './About.model';

const authors = [{
  name: 'Artsiom Marozau',
  picture: 'https://static.cdn.epam.com/avatar/a19a0410b4158afc7dc55b3854cc473c.jpg'
}, {
  name: 'Valiantsin Haradkou',
  picture: 'https://static.cdn.epam.com/avatar/ecc2e028200c52cf82726c3b95f7cff4.jpg'
}, {
  name: 'Dzianis Pasiukou',
  picture: 'https://static.cdn.epam.com/avatar/6283b296894339e48ae4f0c3172b42dc.jpg'
}, {
  name: 'Mikalai Klepchukou',
  picture: 'https://static.cdn.epam.com/avatar/4952df3c6b8721fc834386715001d013.jpg'
}, {
  name: 'Uladzimir Pantsiukhou',
  picture: 'https://static.cdn.epam.com/avatar/5aa4789554a7e36d8dbf83bc43377e3f.jpg'
}, {
  name: 'Aleh Katsiuba',
  picture: 'https://static.cdn.epam.com/avatar/6790d49f43baeb6ece320500b1299718.jpg'
}, {
  name: 'Valiantsin Tsikhanau',
  picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg'
}, {
  name: 'Yegor Feoktistov',
  picture: 'https://static.cdn.epam.com/avatar/1501350b06962676ba4854876995db6e.jpg'
}, {
  name: 'Katsiaryna Anuchyna',
  picture: 'https://static.cdn.epam.com/avatar/cff2cc9c45b8fe2b30fd62c28b1a22a3.jpg'
}, {
  name: 'Anton Pankou',
  picture: 'https://static.cdn.epam.com/avatar/1e90406a6f7ee9f4ba26c8b40e44a60d.jpg'
}, {
  name: 'Tatsiana Shynkevich',
  picture: 'https://static.cdn.epam.com/avatar/9c630ee08f286f79c75111afbfe67e3b.jpg'
}, {
  name: 'Uladzislau Padolski',
  picture: 'https://static.cdn.epam.com/avatar/365026394cb623a3badda740e76dd6c3.jpg'
}
];

import './About.scss';

export class CaAboutPageComponent extends React.Component<AboutProps> {
  public componentWillMount(): void {
    const isAuthenticated = this.props.authStatus === AuthStatus.Authorized;

    if (!isAuthenticated) {
      this.props.history.push('/login');
    }
  }
  public render(): JSX.Element {
    return (
      <div className='ca-about'>
        {this.props.children}
        <h1 className='ca-about__title'>Developers team</h1>
        <div className='ca-about__authors-container'>
          {
            authors.map((author: Author) => <CaAuthor key={author.picture}
              author_name={author.name}
              author_picture={author.picture} />
            )
          }
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authStatus: state.auth.status
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const CaAbout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaAboutPageComponent);
