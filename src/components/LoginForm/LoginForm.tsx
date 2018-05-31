import {Button, FormGroup, TextField} from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux'
import { AppState } from 'store';
import { LoginUser } from 'store/auth';
import {FrontEndValidationErrorsLogin, UserFieldsToRegister} from './../../interfaces/FrontEndValidation';
import './LoginForm.css';

import { UserFieldsToLogin } from 'interfaces/FrontEndValidation';



const emailRegExp : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const erros : FrontEndValidationErrorsLogin = {
        email: {
            mustBeCorrect: 'Email should be corrent',
            required: 'Email Should be required'
        },
        password: {
            min: 'Password should have at least 6 characters',
            required: 'Password is required'
        }
    }

    interface RegistrationFormState {
        email : string,
        password : string,
        isPasswordValid : boolean,
        isEmailValid : boolean,
        touched : {
            email: boolean,
            password: boolean
        },
        emailErrors : string[],
        passwordErrors : string[],

    }

    interface RegistrationFormProps {
      auth: any,
      history: any,
      loginUser(user: UserFieldsToLogin): void
     
    }

    export class LoginFormComponent extends React.Component <RegistrationFormProps, RegistrationFormState > {

        constructor(props : RegistrationFormProps) {
            super(props);
            this.state = {
                email: '',
                password: '',
                isPasswordValid: false,
                isEmailValid: false,
                touched: {
                    email: false,
                    password: false
                },
                emailErrors: [],
                passwordErrors: [],
            }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.checkValidation = this.checkValidation.bind(this);
            
        }


        public componentWillReceiveProps(nextProps: RegistrationFormProps): void {
            if(nextProps.auth.isAuthenticated) {
              this.props.history.push('/dashboard');
            }
        }

        public componentDidMount(): void {
            if(this.props.auth.isAuthenticated) {
             this.props.history.push('/dashboard');
            }
         }

        public handleChange(event : any): void {
            const target = event.target;
            const value = target.type === 'checkbox'
                ? target.checked
                : target.value;
            const name = target.name;

            this.setState({[name]: value});

        }

        public handleSubmit(event : any): void {
            event.preventDefault();

            const user: UserFieldsToLogin = {
                email: this.state.email,
                password: this.state.password,
            }
           
            this.props.loginUser(user);
        }

        public checkValidation(): void {

            let emailErrors: string[] = [];
            let passwordErrors: string[] = [];

            if (!this.state.email) {
                emailErrors.push(erros.email.required);
            } else {
                emailErrors = this.removeElFromArrByValue(emailErrors, erros.email.required);
            }

            if (!this.validateEmail(this.state.email)) {
                emailErrors.push(erros.email.mustBeCorrect);
            } else {
                emailErrors = this.removeElFromArrByValue(emailErrors, erros.email.mustBeCorrect);
            }

            if (!this.state.password) {
                passwordErrors.push(erros.password.required);
            } else {
                passwordErrors = this.removeElFromArrByValue(passwordErrors, erros.password.required);
            }

            if (this.state.password.length < 6) {
                passwordErrors.push(erros.password.min);
            } else {
                passwordErrors = this.removeElFromArrByValue(passwordErrors, erros.password.min);
            }

            if (emailErrors.length <= 0) {
                this.setState({isEmailValid: true});
            } else {
                this.setState({isEmailValid: false});
            }

            if (passwordErrors.length <= 0) {
                this.setState({isPasswordValid: true});
            } else {
                this.setState({isPasswordValid: false});
            }

            this.setState({emailErrors, passwordErrors});

        }

        public handleBlur = (field : string) => (evt : any) => {
            this.setState({
                touched: {
                    ...this.state.touched,
                    [field]: true
                }
            });
            this.checkValidation();
        }

        public render(): JSX.Element {return(
                <div>
                    <form onSubmit={this.handleSubmit} className="CA-Login-form__container">

                        <FormGroup>
                            <TextField
                                id="email"
                                label="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                type="email"
                                onBlur={this.handleBlur('email')}
                                error={!this.state.isEmailValid && this.state.touched.email}/> {!this.state.isEmailValid && this.state.touched.email && this
                                .state
                                .emailErrors
                                .map((err, index) => {
                                    return <div className="CA-Login-form__error" key={index}>
                                        {err}
                                    </div>
                                })
                                }
                        </FormGroup>


                        <FormGroup>
                            <TextField
                                style={{
                                marginTop: '20px'
                            }}
                                id="password"
                                label="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                                onBlur={this.handleBlur('password')}
                                error={
                                    !this.state.isPasswordValid && 
                                    this.state.touched.password}
                                /> 
                                {
                                    !this.state.isPasswordValid && 
                                    this.state.touched.password &&
                                    this.state.passwordErrors.map((err, index) => {
                                        return <div className="CA-Registration-form__error" key={index}>
                                            {err}
                                        </div>
                                    })
                                }
                        </FormGroup>


                        <Button
                            color="primary"
                            type="submit"
                            style={{
                            marginTop: '20px'
                        }}
                            disabled={!this.state.isEmailValid || !this.state.isPasswordValid}>
                            LOGIN
                        </Button>
                    </form>

                </div>
            )}

        private validateEmail(email : string): boolean {
            return emailRegExp.test(email);
        }

        private removeElFromArrByValue(arr : string[], value : string): string[] {
            const index = arr.indexOf(value);
            if (index) {
                arr.splice(index, 1);
            }

            return arr;
        }
    }


    const mapStateToProps = (state: AppState) => ({
        auth: state.auth
    })
    
    const mapDispatchToProps = (dispatch: any) => ({
        loginUser: (user: UserFieldsToRegister) => dispatch(new LoginUser(user))
    })

    
    const LoginForm = connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginFormComponent);

    export { LoginForm } 
