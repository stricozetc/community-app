import "./landing.scss";

import Button from "@material-ui/core/Button";

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { AuthStatus } from "models";
import { AppState } from "store";

import { LandingProps } from "./Landing.model";

class LandingComponent extends React.Component<LandingProps> {
  public componentDidMount(): void {
    if (this.props.status === AuthStatus.AUTHORIZED) {
      this.props.history.push("/homepage");
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        <h2>Landing for Community App</h2>
        <Link to="/register" className="ca-landing__register-btn">
          <Button variant="raised" color="primary">
            Register
          </Button>
        </Link>

        <Link to="/login">
          <Button variant="raised" color="primary">
            Login
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status
});

export const Landing = connect(
  mapStateToProps,
  {}
)(LandingComponent);
