import * as React from 'react';

import './Navbar.scss';

import { NavLink } from 'react-router-dom';

import { NavbarProps } from './Navbar.model';

import { Link } from './Navbar.model';

export const CaNavbar = (props: NavbarProps) => {
  return (
    <div
      className={
        props.modificators
          ? ['ca-navbar', ...props.modificators].join(' ')
          : 'ca-navbar'
      }
    >
      <ul className="ca-navbar__items-container">
        {props.children}
        {props.linksToRender &&
          props.linksToRender.map((link: Link, index: number) => {
            return (
              <NavLink
                key={index}
                to={link.to}
                activeClassName={link.activeClassName}
                className="ca-navbar__nav-item"
              >
                {link.text}
              </NavLink>
            );
          })}
      </ul>
    </div>
  );
};
