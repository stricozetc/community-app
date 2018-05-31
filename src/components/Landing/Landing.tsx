

import * as React from 'react';
import './landing.css'

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



class Landing extends React.Component {
  public render():  JSX.Element {
    return (
      <div>
        <h2>Landing for Community App</h2>
        <Link to="/register" className="CA-Landing__register-btn">
            <Button variant="raised" color="primary" >
                Register
            </Button>
        </Link>

        <Link to="/login">
            <Button variant="raised" color="primary">
                Login
            </Button>
        </Link>
      </div>
    )
  }
}

export { Landing }