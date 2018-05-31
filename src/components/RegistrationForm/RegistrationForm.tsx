// import {     Button,     TextField  } from '@material-ui/core';
import {Button, FormGroup, TextField} from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux'
import { AppState } from 'store';
import { RegisterUser } from 'store/auth';
import {FrontEndValidationErrorsRegister, UserFieldsToRegister} from './../../interfaces/FrontEndValidation';
import './RegistrationForm.css';


const emailRegExp : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const erros : FrontEndValidationErrorsRegister = {
        email: {
            mustBeCorrect: 'Email should be corrent',
            required: 'Email Should be required'
        },
        password: {
            min: 'Password should have at least 6 characters',
            required: 'Password is required'
        },
        name: {
            min: 'Name should be at least 2 characters long',
            required: 'name is required'
        }
    }

    interface RegistrationFormState {
        email : string,
        name: string,
        password : string,
        passwordToRepeat : string
        isPasswordValid : boolean,
        isEmailValid : boolean,
        isNameValid : boolean,
        touched : {
            email: boolean,
            password: boolean,
            passwordToRepeat: boolean,
            name: boolean
        },
        emailErrors : string[],
        passwordErrors : string[],
        nameErrors: string[]
    }

    interface RegistrationFormProps {
        history: any,
        auth: any,
        registerUser(user: UserFieldsToRegister): void
    }

    export class RegistrationFormComponent extends React.Component <RegistrationFormProps, RegistrationFormState > {

        constructor(props : any) {
            super(props);
            this.state = {
                email: '',
                name: '',
                password: '',
                passwordToRepeat: '',
                isPasswordValid: false,
                isEmailValid: false,
                isNameValid: false,
                touched: {
                    email: false,
                    password: false,
                    passwordToRepeat: false,
                    name: false
                },
                emailErrors: [],
                passwordErrors: [],
                nameErrors: []
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

        public handleChange(event : any): void {
            const target = event.target;
            const value = target.type === 'checkbox'
                ? target.checked
                : target.value;
            const name = target.name;

            this.setState({[name]: value});
            this.checkValidation();

        }

        public handleSubmit(event : any): void {
            event.preventDefault();

            const user: UserFieldsToRegister = {
                email: this.state.email,
                name: this.state.name,
                password: this.state.password,
                password2: this.state.passwordToRepeat
            }

            this.props.registerUser(user);

        }

        public checkValidation(): void {

            let emailErrors: string[] = [];
            let passwordErrors: string[] = [];
            let nameErrors: string[] = [];

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

            if (!this.state.name) {
                nameErrors.push(erros.name.required);
            } else {
                nameErrors = this.removeElFromArrByValue(nameErrors, erros.name.required);
            }

            if (this.state.name.length < 2) {
                nameErrors.push(erros.name.min);
            } else {
                nameErrors = this.removeElFromArrByValue(nameErrors, erros.name.min);
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

            if (nameErrors.length <= 0) {
                this.setState({isNameValid: true});
            } else {
                this.setState({isNameValid: false});
            }

            if (passwordErrors.length <= 0) {
                this.setState({isPasswordValid: true});
            } else {
                this.setState({isPasswordValid: false});
            }

            this.setState({emailErrors, passwordErrors, nameErrors});

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
                    <form onSubmit={this.handleSubmit} className="CA-Registration-form__container">

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
                                    return <div className="CA-Registration-form__error" key={index}>
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
                                id="name"
                                label="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                type="text"
                                onBlur={this.handleBlur('name')}
                                error={
                                    !this.state.isNameValid && 
                                    this.state.touched.name}
                                /> 
                                {
                                    !this.state.isNameValid && 
                                    this.state.touched.name &&
                                    this.state.nameErrors.map((err, index) => {
                                        return <div className="CA-Registration-form__error" key={index}>
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

                        <FormGroup>
                            <TextField
                                style={{ marginTop: '20px'}}
                                id="passwordToRepeat"
                                label="Repeat password"
                                name="passwordToRepeat"
                                value={this.state.passwordToRepeat}
                                onChange={this.handleChange}
                                type="password"
                                onBlur={this.handleBlur('passwordToRepeat')}
                                error={this.state.touched.password &&
                                     this.state.touched.passwordToRepeat &&
                                    (this.state.password !== this.state.passwordToRepeat)}
                            /> 

                                {
                                    this.state.touched.password && 
                                    this.state.touched.passwordToRepeat && 
                                    this.state.password !== this.state.passwordToRepeat 
                                    && <div className="CA-Registration-form__error">
                                        Passwords must match!
                                    </div>
                                }
                        </FormGroup>

                        <Button
                            color="primary"
                            type="submit"
                            style={{
                            marginTop: '20px'
                        }}
                            disabled={!this.state.isEmailValid || !this.state.isPasswordValid || !this.state.isNameValid ||
                                this.state.password !== this.state.passwordToRepeat
                            }>
                            REGISTER
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
        registerUser: (user: UserFieldsToRegister) => dispatch(new RegisterUser(user))
    })

    
    const RegistrationForm = connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegistrationFormComponent);

    export { RegistrationForm } 
