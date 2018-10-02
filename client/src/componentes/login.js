import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import SignInContainer from "../containers/auth/singin";

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
        this.handleOnClickEntrar = this.handleOnClickEntrar.bind(this);
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
                username: this.state.userName,
                password: this.state.password
            }
        }).then(({ data }) => {
            console.log(data)
            localStorage.setItem('token', data.signin);
            this.handleState({
                isLoggedIn: true
            });

        }, (error) => {
            console.log('Nero');
            if (error.networkError)
                console.log(error.networkError.result.errors);
        });
    }

    render() {
        
        //const { from } = this.props.location.state || { from: { pathname: "/messages" } };
        const { isLoggedIn } = this.state;
        if (isLoggedIn) {
            return (<Redirect to={"/messages"} />)
        }
        if (this.state.loading)
            return (<div>Loading...</div>)
        return (
            <div>
                <div>
                    <input name="userName" value={this.state.userName} onChange={this.handleInputChange}></input>
                </div>
                <div>
                    <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}></input>
                </div>
                <button onClick={this.handleOnClickEntrar}>Entrar</button>
            </div>
        )
    }
}

const SignIn = () => <SignInContainer>{(mutation, { ...props }) => <Login mutation={mutation} {...props}></Login>}</SignInContainer>

export default SignIn;