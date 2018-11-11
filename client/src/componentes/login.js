import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react';
import SignInContainer from '../containers/auth/singin';
import InputCheck from "./Utils/inputCheck";
import { Link } from "react-router-dom";

class Login extends Component {

    state = {
        userName: 'nero',
        password: '',
        isLoggedIn: false,
        loading: true
    };

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleState = this.handleState.bind(this);
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    handleInputChange(evt) {
        var target = evt.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleState(value) {
        this.setState(value);
    }

    getNetworkErrors = error => error.networkError.response.json().then(e => e.errors.map(e => e.message).join(','))

    handleOnClickEntrar() {
        this.setState({
            loading: true
        });
        this.props.mutation({
            variables: {
                userName: this.state.userName,
                password: this.state.password
            }
        }).then(({ data }) => {
            console.log(data)
            localStorage.setItem('token', data.signin);
            this.handleState({
                isLoggedIn: true
            });

        }, (error) => {
            if (error.networkError)
                console.log(error.networkError.result.errors);
            this.setState({
                loading: false
            });
        });
    }

    checkPasswordCallback(evt) {
        this.handleInputChange(evt);
    }

    userNameCallback(evt) {
        this.handleInputChange(evt);
    }

    render() {
        const { isLoggedIn, loading } = this.state;
        var formClassName = 'ui form';
        if (loading)
            formClassName += ' loading';
        if (isLoggedIn)
            return (<Redirect to={"/messages"} />)
        return (
            <div className="ui two column centered grid">
                <div className="ui raised very padded segment column " style={{ maxWidth: '650px', minWidth: '350px' }}>
                    <div className={formClassName}>
                        <div className="field">
                            <label htmlFor="userName">Usuario / Email</label>
                            <InputCheck name="userName" value={this.state.userName} callback={this.userNameCallback.bind(this)}></InputCheck>
                        </div>
                        <div className="field">
                            <label htmlFor="password">Senha</label>
                            <InputCheck name="password" type="password" value={this.state.password} callback={this.checkPasswordCallback.bind(this)}></InputCheck>
                        </div>
                        <div className="ui two column centered grid">
                            <div className="column">
                                <div className="row ui large buttons">
                                    <Button color="vk" onClick={this.handleOnClickEntrar.bind(this)}>Entrar</Button>
                                    <div className="or"></div>
                                    <Link className="ui right labeled icon button simple" to="/signup">
                                        <i className="signup icon"></i>Cadastrar
                            </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const SignIn = () => <SignInContainer>{(mutation, { ...props }) => <Login mutation={mutation} {...props}></Login>}</SignInContainer>

export default SignIn;