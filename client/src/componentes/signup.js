import React from 'react';
import { SingUpContainer, CheckEmailAvailabilityContainer, CheckUserNameAvailabilityContainer } from '../containers/auth';
import { Input, Button } from 'semantic-ui-react';
import InputCheck from './Utils/inputCheck';
import { Redirect } from 'react-router-dom';
class SignUpComponent extends React.Component {

    state = {
        UserName: '',
        email: '',
        password: '',
        loadingUserNameInput: false,
        loadingEmailInput: false,
        emailStatus: 'asterisk red',
        userNaneStatus: 'asterisk red',
        passwordStatus: 'asterisk red',
        isValid: false,
        loading: false,
    };

    submitHandler() {
        this.setState({ loading: true })
        this.props.mutation({
            variables: {
                username: this.state.UserName,
                email: this.state.email,
                password: this.state.password,
            }
        }).then(({ data }) => {
            this.setState({ success: true });
        }, (err) => {
            this.setState({ loading: false });
        });
    }
    userNameChangedHandler(evt, mutation) {
        var value = this.handleInputChange(evt);
        if (this.validateField(value, 'userNaneStatus', (fieldValue) => {
            var regex = /[a-zA-Z][a-zA-Z0-9-_]{3,32}$/;
            return regex.test(String(fieldValue).toLowerCase());
        })) {
            mutation({ variables: { username: value } })
                .then(pX => {
                    this.setState({
                        loadingUserNameInput: false
                    });
                    this.setState({
                        userNaneStatus: pX.data.checkUserNameAvailability ? 'checkmark green' : 'attention red'
                    })
                }, (error) => {
                    this.setState({
                        loadingUserNameInput: false
                    });
                });
        }
    }
    componentDidMount() {
        this.setState({
            UserName: '',
            email: '',
            password: '',
        })
    }

    emailChangedHandler(evt, mutation) {
        const value = this.handleInputChange(evt);
        if (this.validateField(value, 'emailStatus', (fieldValue) => {
            var regex = /[a-zA-Z0-9]+(?:(\.|_)[A-Za-z0-9!#$%&'*+/=?^`{|}~-]+)*@(?!([a-zA-Z0-9]*\.[a-zA-Z0-9]*\.[a-zA-Z0-9]*\.))(?:[A-Za-z0-9](?:[a-zA-Z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
            return fieldValue && regex.test(String(fieldValue).toLowerCase());
        })) {
            mutation({ variables: { email: value } })
                .then(pX => {
                    this.setState({
                        loadingEmailInput: false
                    });
                    this.setState({
                        emailStatus: pX.data.checkEmailAvailability ? 'checkmark green' : 'attention red'
                    })
                }, (error) => {
                    this.setState({
                        loadingEmailInput: false
                    });
                });
        }

    }

    validateField(value, statusField, callback) {
        var status = false;
        if (!value === '' || value == undefined) {
            this.setState({ [statusField]: 'asterisk red' })
            return false;
        }
        status = callback(value);
        if (status === false) {
            this.setState({ [statusField]: 'attention red' })
        }
        return status;
    }

    passwordChangedHandler(evt) {
        const value = this.handleInputChange(evt);
    }

    handleInputChange(evt) {
        var target = evt.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        this.setState({
            [name]: value
        });
        return value;
    }

    componentDidMount() {

    }

    render() {
        var formClassName = 'ui form';
        if (this.state.loading)
            formClassName += ' loading';
        if (this.state.success)
            return (<Redirect to="/signin"></Redirect>);
        return (
            <div className="ui two column centered grid">
                <div className="ui raised very padded segment column" style={{ maxWidth: '650px', minWidth: '350px' }}>
                    <div className={formClassName}>
                        <div className="field">
                            <label htmlFor="UserName">Usuário:</label>
                            <CheckUserNameAvailabilityContainer >{(mutation, { ...props }) =>
                                <InputCheck
                                    mutation={mutation}
                                    mutationProps={props}
                                    name="UserName"
                                    type="text"
                                    loading={this.state.loadingUserNameInput}
                                    callback={this.userNameChangedHandler.bind(this)}
                                    icon={this.state.userNaneStatus}
                                    value={this.state.UserName}>
                                </InputCheck>
                            }</CheckUserNameAvailabilityContainer>
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email:</label>
                            <CheckEmailAvailabilityContainer>{(mutation, { ...props }) =>
                                <InputCheck
                                    mutation={mutation}
                                    mutationProps={props}
                                    name="email"
                                    type="email"
                                    loading={this.state.loadingEmailInput}
                                    callback={this.emailChangedHandler.bind(this)}
                                    icon={this.state.emailStatus}
                                    value={this.state.email}>
                                </InputCheck>
                            }</CheckEmailAvailabilityContainer>
                        </div>
                        <div className="field">
                            <label htmlFor="password">Senha:</label>
                            <InputCheck
                                name="password"
                                type="password"
                                value={this.state.password}
                                icon={this.state.passwordStatus}
                                callback={this.handleInputChange.bind(this)}></InputCheck>
                        </div>
                        <div className="centered row">
                            <Button color="vk" active={this.state.isValid} onClick={this.submitHandler.bind(this)}>Register</Button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}


const SignUp = () => <SingUpContainer>{(mutation, { ...props }) => <SignUpComponent mutation={mutation} {...props}></SignUpComponent>}</SingUpContainer>
export default SignUp;